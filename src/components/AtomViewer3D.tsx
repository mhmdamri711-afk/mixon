import React from 'react';
import { Material } from '../types';
import { InteractiveMoleculeViewer3D } from './InteractiveMoleculeViewer3D';

interface AtomViewer3DProps {
  material: Material;
  height?: string | number;
}

export const AtomViewer3D: React.FC<AtomViewer3DProps> = ({ material, height = 360 }) => {
  return (
    <InteractiveMoleculeViewer3D
      material={material}
      height={height}
      initialMode="material"
      showControls={true}
      showDetailsBar={true}
      interactive={true}
    />
  );
};
