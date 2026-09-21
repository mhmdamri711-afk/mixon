import React, { useState, useEffect, useRef } from 'react';
import { Material, ReactionResult } from '../types';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Sparkles, 
  Atom, 
  MessageSquare,
  FlaskConical
} from 'lucide-react';
import { labSound } from '../utils/sound';

export interface MixonAITutorContext {
  materialA?: Material | null;
  materialB?: Material | null;
  currentResult?: ReactionResult | null;
  temperature?: number;
  pressure?: number;
  simulationPhase?: string;
  discoveryCount?: number;
  topic?: string;
}

interface MixonAITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: MixonAITutorContext;
  lang: AppLanguage;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

// Helper to detect language directly from message text
export const detectMessageLanguage = (text: string, currentFallback: AppLanguage): AppLanguage => {
  if (!text || !text.trim()) return currentFallback;
  const hasArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);
  if (hasArabic) return 'ar';
  if (hasLatin) return 'en';
  return currentFallback;
};

export const isArabicString = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
};

export const MixonAITutorModal: React.FC<MixonAITutorModalProps> = ({
  isOpen,
  onClose,
  context,
  lang,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Independent active conversation language that automatically adapts to user input
  const [conversationLang, setConversationLang] = useState<AppLanguage>(lang);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[conversationLang] || TRANSLATIONS[lang];

  // Sync initial conversation language when opening or if language changes before chatting
  useEffect(() => {
    if (messages.length <= 1) {
      setConversationLang(lang);
    }
  }, [lang, isOpen]);

  // Set initial welcome greeting when opened
  useEffect(() => {
    if (isOpen && (messages?.length || 0) === 0) {
      let welcomeMsg = '';
      if (context.currentResult) {
        welcomeMsg = lang === 'ar'
          ? `مرحبًا! أنا معلمة ميكسون العلمية الذكية. لقد قمت بمحاكاة **${context.currentResult.outputName}** (${context.currentResult.outputFormula}). هل ترغب في معرفة سبب حدوث هذا التفاعل وكيف ترتبت الروابط الذرية؟`
          : `Hello! I am your MIXON Science Mentor. You just observed the synthesis of **${context.currentResult.outputName}** (${context.currentResult.outputFormula}). Would you like to explore why this reaction occurred and how atomic bonds restructured?`;
      } else if (context.materialA && context.materialB) {
        welcomeMsg = lang === 'ar'
          ? `أهلاً بك! لقد وضعت في المختبر **${context.materialA.nameAr || context.materialA.name}** مع **${context.materialB.nameAr || context.materialB.name}**. اسألني عن توافق المادتين أو طاقة التفاعل قبل التشغيل!`
          : `Hello! You have staged **${context.materialA.name}** and **${context.materialB.name}** in the mixing chamber. Ask me about their chemical compatibility, expected bond changes, or thermodynamic properties!`;
      } else if (context.materialA) {
        welcomeMsg = lang === 'ar'
          ? `أهلاً بك! أنت تفحص حاليًا مادة **${context.materialA.nameAr || context.materialA.name}** (${context.materialA.symbol}). كيف يمكنني مساعدتك في فهم بنيتها البلورية، أو إلكترونات التكافؤ، أو سلوكها الكيميائي؟`
          : `Welcome! You are currently inspecting **${context.materialA.name}** (${context.materialA.symbol}). How can I assist you with its crystal lattice, valence orbitals, or reaction behavior?`;
      } else {
        welcomeMsg = lang === 'ar'
          ? `أهلاً بك في مختبر MIXON الرقمي! أنا معلمتك العلمية الذكية. اسألني أي سؤال عن المواد، التفاعلات، الخصائص الذرية، أو كيفية استكشاف واكتشاف المركبات الجديدة.`
          : `Welcome to the MIXON Digital Matter Laboratory! I am your interactive AI Science Tutor. Ask me any scientific question about materials, crystal structures, reactions, or how to discover new compounds!`;
      }

      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: welcomeMsg,
          timestamp: Date.now()
        }
      ]);
    }
  }, [isOpen, context.materialA?.id, context.materialB?.id, context.currentResult?.id, lang]);

  // If an initialPrompt was provided (e.g. from "TEACH ME" button), send it automatically
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    labSound.playClick();

    // Dynamically detect user's language based on latest input
    const targetLang = detectMessageLanguage(query, conversationLang);
    setConversationLang(targetLang);

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language: targetLang,
          history: messages
            .filter(m => m.id !== 'welcome')
            .map(m => ({
              role: m.sender === 'ai' ? 'model' : 'user',
              text: m.text
            })),
          context: {
            materialA: context.materialA,
            materialB: context.materialB,
            currentResult: context.currentResult,
            temperature: context.temperature,
            pressure: context.pressure,
            simulationPhase: context.simulationPhase,
            discoveryCount: context.discoveryCount
          }
        })
      });

      let aiReply = '';
      if (res.ok) {
        const data = await res.json().catch(() => null);
        aiReply = data?.reply || '';
        if (data?.detectedLanguage) {
          setConversationLang(data.detectedLanguage);
        }
      }
      if (!aiReply) {
        aiReply = targetLang === 'ar'
          ? 'عذرًا، حدث خطأ أثناء معالجة السؤال. يرجى المحاولة مرة أخرى.'
          : 'Sorry, could not process that inquiry. Please try again.';
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = targetLang === 'ar' 
        ? 'حدث خطأ في الاتصال بالخادم التعليمي. يرجى إعادة المحاولة.'
        : 'Network communication error. Please try again.';

      setMessages(prev => [...prev, {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: errorMsg,
        timestamp: Date.now()
      }]);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl h-[620px] rounded-2xl bg-[#020617] border border-sky-500/40 shadow-[0_0_50px_rgba(14,165,233,0.25)] flex flex-col overflow-hidden text-sky-100"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        
        {/* Futuristic Modal Header - Pure Text Chat */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sky-900/60 bg-sky-950/40">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500 text-black font-black shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <Bot className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#020617] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">
                  {t.aiTutorTitle}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  {lang === 'ar' ? 'محادثة نصية' : 'Text Chat'}
                </span>
              </div>
              <p className="text-[10px] font-mono text-sky-400">
                {t.aiTutorSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Chat */}
            <button
              onClick={() => {
                labSound.playClick();
                setMessages([]);
              }}
              className="p-2 rounded-lg bg-sky-950/40 border border-sky-900/50 hover:border-sky-500/50 text-sky-400 hover:text-white transition cursor-pointer"
              title={t.clearChat}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-sky-950/40 border border-sky-900/50 hover:border-red-500/50 text-sky-400 hover:text-red-400 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Staged Context Bar (if material or result is loaded) */}
        {(context.currentResult || context.materialA || context.materialB) && (
          <div className="px-4 py-2 bg-sky-950/50 border-b border-sky-900/40 flex items-center justify-between text-[11px] font-mono text-sky-300">
            <div className="flex items-center gap-2 truncate">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span className="text-sky-500">{lang === 'ar' ? 'السياق العلمي:' : 'Lab Context:'}</span>
              {context.currentResult ? (
                <span className="text-amber-300 font-bold truncate">
                  {context.currentResult.outputName} ({context.currentResult.outputFormula})
                </span>
              ) : (
                <span className="text-sky-200 truncate">
                  {context.materialA?.name} {context.materialB ? `+ ${context.materialB.name}` : ''}
                </span>
              )}
            </div>
            {context.simulationPhase && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-900/40 text-sky-400 border border-sky-800">
                {context.simulationPhase}
              </span>
            )}
          </div>
        )}

        {/* Chat Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 font-sans">
          {messages.map((m) => {
            const isAI = m.sender === 'ai';
            const isMsgArabic = isArabicString(m.text);
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
                dir={isMsgArabic ? 'rtl' : 'ltr'}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-lg bg-sky-500 text-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-start ${
                    isAI
                      ? 'bg-sky-950/40 border border-sky-800/60 text-sky-100 shadow-sm'
                      : 'bg-sky-500 text-black font-semibold shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div 
              className="flex gap-3 justify-start items-center"
              dir={conversationLang === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>{conversationLang === 'ar' ? 'جاري تحليل الخصائص الذرية وإعداد الشرح العلمي...' : 'Analyzing atomic properties & generating insights...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 border-t border-sky-900/50 bg-[#020617] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          {(TRANSLATIONS[conversationLang]?.suggestedQuestions || t?.suggestedQuestions || []).map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sq)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800 text-[11px] font-mono text-sky-300 hover:text-white whitespace-nowrap transition cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-sky-900/60 bg-sky-950/30 flex items-center gap-2" dir={conversationLang === 'ar' ? 'rtl' : 'ltr'}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={conversationLang === 'ar' ? 'اطرح أي سؤال علمي حول هذه المادة أو التفاعل...' : 'Ask any scientific question about this material or reaction...'}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-sky-950/60 border border-sky-900/70 focus:border-sky-400 text-xs sm:text-sm text-sky-100 placeholder-sky-600 outline-none transition text-start"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer"
          >
            <span>{conversationLang === 'ar' ? 'إرسال' : 'Send'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
