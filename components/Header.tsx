import { Text, View } from 'react-native';

import { CONFIG } from '../constants/config';

export function Header() {
  return (
    <View className="border-b border-[#e4e4e4] bg-white px-4 py-3">
      <Text className="text-center font-noto text-base font-bold text-[#1a1a1a]">
        {CONFIG.storeName}
      </Text>
    </View>
  );
}
