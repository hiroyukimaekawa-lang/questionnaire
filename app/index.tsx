import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { NPSSelector } from '../components/NPSSelector';
import { RadioGroup } from '../components/RadioGroup';
import { SubmitButton } from '../components/SubmitButton';
import { CONFIG } from '../constants/config';
import { useSurveyForm } from '../hooks/useSurveyForm';

function RequiredTitle({ title }: { title: string }) {
  return (
    <Text className="font-noto text-base font-bold text-[#1f1f1f]">
      {title}
      <Text className="text-[#e45454]"> ※必須</Text>
    </Text>
  );
}

export default function SurveyScreen() {
  const { form, errors, submitting, setScore, setPurpose, setLanguage, submit } =
    useSurveyForm();

  const onSubmit = async () => {
    const result = await submit();

    if (!result.success) {
      if ('error' in result) {
        Alert.alert('送信に失敗しました', '時間をおいて再度お試しください。');
      }
      return;
    }

    const pathname = result.isHighScore ? '/thanks-high' : '/thanks-low';
    router.replace({ pathname, params: { submittedAt: result.submittedAt } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header />
      <ScrollView
        className="flex-1 bg-[#f5f5f5]"
        contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}
      >
        <View className="w-full max-w-[760px]">
          <HeroBanner />
        </View>

        <View className="w-full max-w-[760px] px-5 pt-5">
          <View className="mb-5 w-full max-w-[220px] self-end rounded-md border border-[#d9d9d9] bg-white px-2">
            <Text className="pt-2 font-noto text-xs text-[#8a8a8a]">Language</Text>
            <Picker
              selectedValue={form.language}
              onValueChange={(value) => setLanguage(String(value))}
              style={{ width: '100%', marginTop: -6 }}
            >
              {CONFIG.languages.map((language) => (
                <Picker.Item key={language} label={language} value={language} />
              ))}
            </Picker>
          </View>

          <View className="mb-7 gap-2">
            <Text className="font-noto text-[15px] text-[#2b2b2b]">
              DMM店をご利用いただき誠にありがとうございます✨
            </Text>
            <Text className="font-noto text-[15px] text-[#2b2b2b]">
              サービス向上のために、アンケートにご協力お願い致します
            </Text>
          </View>

          <View className="mb-8 gap-3">
            <RequiredTitle title="当店の総合満足度を教えてください" />
            <NPSSelector value={form.score} onChange={setScore} />
            {errors.score ? (
              <Text className="font-noto text-sm text-[#e45454]">{errors.score}</Text>
            ) : null}
          </View>

          <View className="mb-8 gap-3">
            <RequiredTitle title="ご利用目的を教えてください" />
            <RadioGroup
              value={form.purpose}
              options={CONFIG.purposeOptions}
              onChange={setPurpose}
            />
            {errors.purpose ? (
              <Text className="font-noto text-sm text-[#e45454]">{errors.purpose}</Text>
            ) : null}
          </View>

          <SubmitButton
            title="アンケートを回答する"
            onPress={onSubmit}
            disabled={submitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
