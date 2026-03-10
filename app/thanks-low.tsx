import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

import { Header } from '../components/Header';

function formatSubmittedAt(input?: string | string[]) {
  const value = Array.isArray(input) ? input[0] : input;
  const date = value ? new Date(value) : new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hour}:${minute}`;
}

export default function ThanksLowScreen() {
  const params = useLocalSearchParams<{ submittedAt?: string | string[] }>();
  const submittedAtLabel = formatSubmittedAt(params.submittedAt);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <StatusBar style="dark" backgroundColor="#f5f5f5" />
      <Header />
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-[760px] items-center">
        <Text className="text-center font-noto text-[22px] font-bold text-[#1f1f1f]">
          ご回答いただきありがとうございました
        </Text>
        <Text className="mt-6 text-center font-noto text-[15px] text-[#343434]">
          アンケートにご協力いただきありがとうございました。
        </Text>
        <Text className="mt-1 text-center font-noto text-[15px] text-[#343434]">
          またのご利用お待ちしております。
        </Text>

        <Text className="mt-8 font-noto text-[13px] text-[#8d8d8d]">
          回答完了日時：{submittedAtLabel}
        </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
