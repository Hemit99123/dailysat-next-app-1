import { DesmosCalculator } from "./types/desmos";


declare global {
    interface Window {
      Desmos: {
        GraphingCalculator: (element: HTMLElement) => DesmosCalculator;
      };
    }
  }
  
  export {};
  