import React, { createContext, useState, ReactNode, useContext } from "react";

// 1. Define the context type
interface FontSizeContextType {
  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;
}

// 2. Create the context
const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

// 3. Create a Provider component
export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<number>(16);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 30));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 10));

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFont, decreaseFont }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// 4. Create a custom hook to use the context easily
export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};