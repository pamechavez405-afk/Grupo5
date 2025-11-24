
export interface Step {
  paso: string;
  descripcion: string;
}

export interface AnalysisResult {
  tipo: string;
  esValido: boolean;
  pasos: Step[];
  resultado: string;
  explicacionMetodo: string;
}

export interface PracticeExample {
  problema: string;
  resultado: string;
  tipo: string;
}

export interface MathContextResult {
  title: string;
  content: string;
}

export enum FactoringCase {
  AUTO_DETECT = "Autodetectar",
  COMMON_FACTOR = "Factor Común",
  DIFFERENCE_OF_SQUARES = "Diferencia de Cuadrados",
  PERFECT_SQUARE_TRINOMIAL = "Trinomio Cuadrado Perfecto",
  TRINOMIAL_X2_BX_C = "Trinomio de la forma x² + bx + c",
}

export type Language = 'es' | 'en';

export const FactoringCaseTranslations: Record<FactoringCase, { es: string; en: string }> = {
  [FactoringCase.AUTO_DETECT]: { es: "Autodetectar", en: "Auto-detect" },
  [FactoringCase.COMMON_FACTOR]: { es: "Factor Común", en: "Common Factor" },
  [FactoringCase.DIFFERENCE_OF_SQUARES]: { es: "Diferencia de Cuadrados", en: "Difference of Squares" },
  [FactoringCase.PERFECT_SQUARE_TRINOMIAL]: { es: "Trinomio Cuadrado Perfecto", en: "Perfect Square Trinomial" },
  [FactoringCase.TRINOMIAL_X2_BX_C]: { es: "Trinomio de la forma x² + bx + c", en: "Trinomial x² + bx + c" },
};