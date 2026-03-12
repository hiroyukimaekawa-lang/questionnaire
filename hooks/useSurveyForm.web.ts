import { useMemo, useState } from 'react';

import { CONFIG } from '@/constants/config';
import type { SurveyFormErrors, SurveyFormState } from '@/types/survey';

const GAS_WEBAPP_URL = 'https://script.google.com/a/macros/crestix-inc.com/s/AKfycbxLFXYSiYX19Xn7PS8RZ72AcRXgxackIhS2HzOlvploIvg1eMPZtD2xQxoVtyMfPBEh/exec';

const INITIAL_STATE: SurveyFormState = {
  score: null,
  purpose: null,
  language: CONFIG.languages[0],
  staffName: null,
};

export function useSurveyForm(initialStaff?: string) {
  const [form, setForm] = useState<SurveyFormState>({
    ...INITIAL_STATE,
    staffName: initialStaff ?? null,
  });
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
    if (!form.score) nextErrors.score = '満足度を選択してください';
    if (!form.purpose) nextErrors.purpose = 'ご利用目的を選択してください';
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

      // GASへ fire-and-forget でPOST（失敗してもアンケート送信は成功扱い）
      if (GAS_WEBAPP_URL) {
        fetch(GAS_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            score: form.score,
            purpose: form.purpose,
            language: form.language,
            submittedAt,
            isHighScore: isHighScoreResult,
            staffName: form.staffName,
          }),
        }).catch(() => { });
      }

      return {
        success: true,
        isHighScore: isHighScoreResult,
        submittedAt,
      } as const;
    } finally {
      setSubmitting(false);
    }
  };

  return { form, errors, submitting, isHighScore, setScore, setPurpose, setLanguage, submit };
}