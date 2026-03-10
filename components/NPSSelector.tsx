import { Platform, Pressable, ScrollView, Text, View } from 'react-native';

type Props = {
  value: number | null;
  onChange: (score: number) => void;
};

const scoreOptions = Array.from({ length: 10 }, (_, idx) => idx + 1);

export function NPSSelector({ value, onChange }: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      >
        {scoreOptions.map((score) => {
          const selected = value === score;
          return (
            <Pressable
              key={score}
              onPress={() => onChange(score)}
              className={`mr-2 h-10 w-10 items-center justify-center rounded-full border ${
                selected
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
                className={`font-noto text-sm font-bold ${
                  selected ? 'text-white' : 'text-[#4a7a95]'
                }`}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="font-noto text-xs text-[#6b6b6b]">満足していない</Text>
        <Text className="font-noto text-base text-[#8b8b8b]">←   →</Text>
        <Text className="font-noto text-xs text-[#6b6b6b]">満足した</Text>
      </View>
    </View>
  );
}
