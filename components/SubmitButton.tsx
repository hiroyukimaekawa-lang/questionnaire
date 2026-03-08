import { ActivityIndicator, Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SubmitButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-[80%] self-center rounded-full py-4 ${disabled ? 'bg-[#636363]' : 'bg-[#1a1a1a]'}`}
    >
      {disabled ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-center font-noto text-base font-bold text-white">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
