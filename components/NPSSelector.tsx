import { Platform, Pressable, Text, View } from 'react-native';

type Props = {
  value: number | null;
  onChange: (score: number) => void;
};

const scoreOptions = Array.from({ length: 10 }, (_, idx) => idx + 1);

export function NPSSelector({ value, onChange }: Props) {
  return (
    <View>
      <View className="flex-row justify-between w-full">
        {scoreOptions.map((score) => {
          const selected = value === score;
          return (
            <Pressable
              key={score}
              onPress={() => onChange(score)}
              className={`h-[28px] w-[28px] sm:h-9 sm:w-9 items-center justify-center rounded-full border ${selected
                ? 'border-[#4a7a95] bg-[#4a7a95]'
                : 'border-[#b0c4d0] bg-white'
                }`}
              style={
                selected
                  ? Platform.OS === 'ios'
                    ? {
                      shadowColor: '#4a7a95',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.3,
                      shadowRadius: 5,
                    }
                    : { elevation: 4 }
                  : undefined
              }
            >
              <Text
                className={`font-noto text-[11px] sm:text-sm font-bold ${selected ? 'text-white' : 'text-[#4a7a95]'
                  }`}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center px-1">
        <Text className="font-noto text-xs text-[#8b8b8b]">←</Text>
        <View className="mx-1 h-[1px] flex-1 bg-[#8b8b8b]" />
        <Text className="font-noto text-xs text-[#8b8b8b]">→</Text>
      </View>

      <View className="mt-1 flex-row items-center justify-between px-1">
        <Text className="font-noto text-[12px] text-[#556977]">満足していない</Text>
        <Text className="font-noto text-[12px] text-[#556977]">満足した</Text>
      </View>
    </View>
  );
}
