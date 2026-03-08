import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export function HeroBanner() {
  return (
    <LinearGradient
      colors={['#b8cfd8', '#6e8f9e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="h-[200px] w-full items-center justify-center"
    >
      <Text className="font-noto text-sm tracking-[3px] text-white/90">
        Questionnaire
      </Text>
      <Text className="mt-1 font-noto text-4xl font-bold text-white">アンケート</Text>
      <View className="mt-3 h-[2px] w-8 bg-white" />
    </LinearGradient>
  );
}
