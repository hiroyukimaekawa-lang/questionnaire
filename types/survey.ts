import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface SurveyAnswer {
  score: number;
  purpose: string;
  language: string;
  submittedAt: FirebaseFirestoreTypes.Timestamp;
  isHighScore: boolean;
}

export interface SurveyFormState {
  score: number | null;
  purpose: string | null;
  language: string;
}

export interface SurveyFormErrors {
  score?: string;
  purpose?: string;
}
