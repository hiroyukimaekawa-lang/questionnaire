import { useMemo, useState } from 'react';

import { CONFIG } from '@/constants/config';
import type { SurveyFormErrors, SurveyFormState } from '@/types/survey';

const INITIAL_STATE: SurveyFormState = {
  score: null,
  purpose: null,
  language: CONFIG.languages[0],
};

/**
 * Web 用: @react-native-firebase は Web 非対応のため Firestore には保存しません。
 * フォームの動作確認・完了フロー用。永続化が必要な場合は Firebase JS SDK の導入を検討してください。
 */
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
      const isHighScoreResult = form.score >= CONFIG.highScoreThreshold;
      const submittedAt = new Date().toISOString();

      return {
        success: true,
        isHighScore: isHighScoreResult,
        submittedAt,
      } as const;
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
