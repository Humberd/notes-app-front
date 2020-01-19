export type ValidationResult = {
  [key: string]: {
    messageTK: string;
    params?: {
      [key: string]: any
    }
  }
} | null;
