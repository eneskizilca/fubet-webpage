'use client';
import React, { createContext, useContext, useState } from 'react';

interface SuggestEventHoverContextType {
  isSuggestEventHovered: boolean;
  setIsSuggestEventHovered: (v: boolean) => void;
}

const SuggestEventHoverContext = createContext<SuggestEventHoverContextType>({
  isSuggestEventHovered: false,
  setIsSuggestEventHovered: () => {},
});

export const SuggestEventHoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuggestEventHovered, setIsSuggestEventHovered] = useState(false);
  return (
    <SuggestEventHoverContext.Provider value={{ isSuggestEventHovered, setIsSuggestEventHovered }}>
      {children}
    </SuggestEventHoverContext.Provider>
  );
};

export const useSuggestEventHover = () => useContext(SuggestEventHoverContext); 