import { Pressable, Text, View } from 'react-native';

type Props = {
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
};

export function RadioGroup({ value, options, onChange }: Props) {
  return (
    <View className="gap-3">
      {options.map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            className="flex-row items-center"
          >
            <View className="h-5 w-5 items-center justify-center rounded-full border border-[#7c8a93]">
              {selected ? <View className="h-2.5 w-2.5 rounded-full bg-[#4a7a95]" /> : null}
            </View>
            <Text className="ml-3 font-noto text-[15px] text-[#2b2b2b]">{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
