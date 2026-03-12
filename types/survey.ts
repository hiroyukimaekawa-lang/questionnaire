import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface SurveyAnswer {
  score: number;
  purpose: string;
  language: string;
  submittedAt: FirebaseFirestoreTypes.Timestamp;
  isHighScore: boolean;
  staffName: string | null;
}

export interface SurveyFormState {
  score: number | null;
  purpose: string | null;
  language: string;
  staffName: string | null;
}

export interface SurveyFormErrors {
  score?: string;
  purpose?: string;
}
