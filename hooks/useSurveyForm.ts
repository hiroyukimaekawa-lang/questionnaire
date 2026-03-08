import { useMemo, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { CONFIG } from '@/constants/config';
import type { SurveyAnswer, SurveyFormErrors, SurveyFormState } from '@/types/survey';

const INITIAL_STATE: SurveyFormState = {
  score: null,
  purpose: null,
  language: CONFIG.languages[0],
};

export function useSurveyForm() {
  const [form, setForm] = useState<SurveyFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<SurveyFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isHighScore = useMemo(
    () => (form.score ?? 0) >= CONFIG.highScoreThreshold,
    [form.score],
  );

  const setScore = (score: number) => {
    setForm((prev) => ({ ...prev, score }));
    setErrors((prev) => ({ ...prev, score: undefined }));
  };

  const setPurpose = (purpose: string) => {
    setForm((prev) => ({ ...prev, purpose }));
    setErrors((prev) => ({ ...prev, purpose: undefined }));
  };

  const setLanguage = (language: string) => {
    setForm((prev) => ({ ...prev, language }));
  };

  const validate = () => {
    const nextErrors: SurveyFormErrors = {};

    if (!form.score) {
      nextErrors.score = '満足度を選択してください';
    }

    if (!form.purpose) {
      nextErrors.purpose = 'ご利用目的を選択してください';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async () => {
    if (!validate() || !form.score || !form.purpose) {
      return { success: false } as const;
    }

    setSubmitting(true);

    try {
      const payload: SurveyAnswer = {
        score: form.score,
        purpose: form.purpose,
        language: form.language,
        submittedAt: firestore.Timestamp.now(),
        isHighScore: form.score >= CONFIG.highScoreThreshold,
      };

      await firestore().collection('surveys').add(payload);

      return {
        success: true,
        isHighScore: payload.isHighScore,
        submittedAt: payload.submittedAt.toDate().toISOString(),
      } as const;
    } catch (error) {
      return { success: false, error } as const;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    errors,
    submitting,
    isHighScore,
    setScore,
    setPurpose,
    setLanguage,
    submit,
  };
}
