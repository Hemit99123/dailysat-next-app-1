import { DesmosCalculator } from "./types/sat-platform/desmos";

declare global {
    interface Window {
      Desmos: {
        GraphingCalculator: (element: HTMLElement) => DesmosCalculator;
      };
    }
  }
  
export {};  