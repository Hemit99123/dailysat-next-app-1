declare global {
    interface Window {
      Desmos: {
        GraphingCalculator: (element: HTMLElement) => any;
      };
    }
  }
  
  export {};
  