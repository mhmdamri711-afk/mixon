import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { queryScientificKnowledgeEngine, ChatHistoryItem, LabContext } from "./src/server/scientificEngine";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily to prevent startup crashes if key is not yet set
let genAiClient: GoogleGenAI | null = null;
function getGenAiClient(): GoogleGenAI | null {
  if (!genAiClient && process.env.GEMINI_API_KEY) {
    try {
      genAiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI client:", e);
    }
  }
  return genAiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: Date.now()
  });
});

// Scientific Rating System Endpoints
import { globalRatingEngine, validateRating } from "./src/server/ratingService";

app.get("/api/ratings", (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
  const stats = globalRatingEngine.getStats(userId);
  res.json(stats);
});

app.post("/api/ratings", (req, res) => {
  const { rating, userId } = req.body || {};

  if (!userId || typeof userId !== "string" || !userId.trim()) {
    return res.status(400).json({
      error: "Missing or invalid client/user identifier."
    });
  }

  const validation = validateRating(rating);
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error
    });
  }

  const result = globalRatingEngine.submitRating(userId, rating);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  return res.json(result.state);
});

// Helper to automatically detect language from user input
function detectLanguageFromText(text: string, fallbackLang: string = "en"): "ar" | "en" {
  if (!text || !text.trim()) {
    return fallbackLang === "ar" ? "ar" : "en";
  }
  const hasArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);

  if (hasArabic) {
    return "ar";
  }
  if (hasLatin) {
    return "en";
  }
  return fallbackLang === "ar" ? "ar" : "en";
}

// MIXON AI TUTOR Endpoint
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const {
      question = "",
      language = "en",
      history = [],
      context = {}
    } = req.body || {};

    // Determine target language based directly on user's query
    const effectiveLang = detectLanguageFromText(question, language);
    const isArabic = effectiveLang === "ar";
    const targetLangName = isArabic ? "Arabic (العربية)" : "English";
    const ctx: LabContext = context || {};
    const chatHistory: ChatHistoryItem[] = Array.isArray(history) ? history : [];

    // System Prompt for MIXON AI Tutor
    const systemInstruction = `You are the MIXON Scientific AI Assistant inside MIXON — An Interactive Digital Matter Laboratory.

CRITICAL DIRECTIVES:
1. ANSWER DIRECTLY: Immediately and directly answer the user's scientific question. NEVER start with a generic greeting, welcome message ("Welcome to the MIXON Laboratory", "أهلاً بك في مختبر ميكسون"), or boilerplate introductions. Provide the answer directly.
2. LANGUAGE RULE:
   - If the user writes in Arabic, answer entirely in natural, fluent Arabic.
   - If the user writes in English, answer entirely in English.
   - Continue using the user's current language. If they switch languages, switch immediately.
3. CASUAL AND DIALECTAL RECOGNITION:
   - Deeply understand casual expressions, colloquialisms, and abbreviations in Arabic and English (e.g., "وش الحديد؟", "ايش هو iron؟", "احكيلي عن Fe", "ليش يصدي الحديد؟", "قارن بين الحديد والنحاس", "وش الفرق", "طيب والنحاس؟", "tell me about Fe", "what's iron?", "why does it rust?").
4. CONVERSATIONAL MEMORY & CONTEXT:
   - Maintain multi-turn awareness using previous conversation history. If the user asks a follow-up ("طيب والنحاس؟" or "Why does it rust?"), understand the active entity from context.
5. COMPARISONS:
   - If asked to compare two elements or materials (e.g. Iron vs Copper), provide a structured, substantive comparison covering atomic properties, conductivity, magnetism, reactivity, corrosion behavior, and key applications.
6. UNIVERSAL SCIENTIFIC KNOWLEDGE:
   - Do NOT restrict knowledge to Copper or the materials currently displayed. You understand any chemical element, compound, molecule, or physics concept (Iron, Gold, Oxygen, Sodium, Carbon, Titanium, Water, etc.).
7. LABORATORY INTEGRATION:
   - When the user asks about an ongoing experiment or simulation in MIXON, reference the current chamber slots (Slot A / Slot B), reaction results, temperature, or pressure.
8. SCIENTIFIC ACCURACY & SAFETY:
   - Ground all explanations in verifiable physics and chemistry. Never hallucinate reactions. All laboratory interactions are digital simulations for educational exploration.
9. STRICT QUERY RELEVANCE:
   - Always prioritize and answer the user's specific question directly.
   - If the user asks about Water, answer about Water. If they ask about Copper, answer about Copper. If they ask about Gold, answer about Gold.
   - NEVER deflect to Iron or chamber materials unless the user explicitly asks about the current chamber or Slot A/B.
   - If the user enters a greeting ("hello", "hi", "مرحبا"), greet them and invite a scientific question.
   - If the user types a single character or gibberish ("a", "asdf"), state that you did not understand and invite a scientific inquiry. NEVER answer with Iron.`;

    const contextSummary = `
CURRENT LAB CONTEXT:
- Active Communication Language: ${targetLangName}
- Selected Material A: ${ctx.materialA ? `${ctx.materialA.name} (${ctx.materialA.symbol}, State: ${ctx.materialA.state}, Category: ${ctx.materialA.category}, Rarity: ${ctx.materialA.rarity || 'Common'})` : "None"}
- Selected Material B: ${ctx.materialB ? `${ctx.materialB.name} (${ctx.materialB.symbol}, State: ${ctx.materialB.state}, Category: ${ctx.materialB.category}, Rarity: ${ctx.materialB.rarity || 'Common'})` : "None"}
- Last Reaction Result: ${ctx.currentResult ? `${ctx.currentResult.outputName} (${ctx.currentResult.outputFormula}, Type: ${ctx.currentResult.reactionType}, Energy: ${ctx.currentResult.energyChange}, Has Occurred: ${ctx.currentResult.hasOccurred !== false}, ${ctx.currentResult.noReactionReason ? `Inactivity Reason: ${ctx.currentResult.noReactionReason}` : ''})` : "None"}
- Chamber Temperature: ${ctx.temperature != null ? `${ctx.temperature} °C` : "25 °C"}
- Chamber Pressure: ${ctx.pressure != null ? `${ctx.pressure} atm` : "1 atm"}
- Simulation Phase: ${ctx.simulationPhase || "idle"}
- Total User Discoveries: ${ctx.discoveryCount || 0}
`;

    try {
      const ai = getGenAiClient();

      if (ai) {
        // Build multi-turn contents format
        const contents: any[] = [];

        // Include recent conversation turns for context
        for (const item of chatHistory.slice(-6)) {
          contents.push({
            role: item.role === 'model' || item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.text }]
          });
        }

        // Append current prompt with lab context, strictly prioritizing user's question
        contents.push({
          role: 'user',
          parts: [{ text: `User Question (${targetLangName}): ${question}\n\n[Reference Lab Context]: ${contextSummary}` }]
        });

        const geminiPromise = ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 1024
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini API call timed out after 8s")), 8000)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);

        const replyText = response.text || "";
        if (replyText.trim()) {
          return res.json({ reply: replyText, detectedLanguage: effectiveLang });
        }
      }
    } catch (err: any) {
      console.error("Gemini API call failed or error occurred:", err?.message || err);
    }

    // Dynamic Scientific Intelligence Engine (handles open-ended questions, materials, comparisons, reactions)
    const fallbackReply = queryScientificKnowledgeEngine(question, chatHistory, ctx, isArabic);
    return res.json({ reply: fallbackReply, detectedLanguage: effectiveLang });
  } catch (globalErr: any) {
    console.error("Critical error in /api/tutor/chat:", globalErr);
    const fallbackLang = detectLanguageFromText(req.body?.question || "", req.body?.language || "en");
    const fallback = (fallbackLang === "ar")
      ? "يسرني إجابتك عن أي سؤال علمي حول العناصر والتفاعلات والمواد في مختبر MIXON."
      : "I am ready to answer any scientific question about elements, reactions, and materials in MIXON.";
    return res.json({ reply: fallback, detectedLanguage: fallbackLang });
  }
});

// Start Server with Vite Middleware in Dev or Static Serving in Prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MIXON Lab Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
