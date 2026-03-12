import firestore from '@react-native-firebase/firestore';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

import { Header } from '../../components/Header';

interface StaffStat {
    name: string;
    count: number;
}

export default function AdminScreen() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StaffStat[]>([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('surveys')
            .onSnapshot((querySnapshot) => {
                const counts: Record<string, number> = {};

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const staffName = data.staffName || '未割り当て';
                    counts[staffName] = (counts[staffName] || 0) + 1;
                });

                const sortedStats = Object.entries(counts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count);

                setStats(sortedStats);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    const totalCount = stats.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ title: '管理者ダッシュボード' }} />
            <Header />
            <View className="flex-1 bg-[#f5f5f5] p-5">
                <View className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                    <Text className="mb-1 text-sm text-gray-500">総回収数</Text>
                    <Text className="text-3xl font-bold text-[#1f1f1f]">{totalCount} <Text className="text-lg font-normal">件</Text></Text>
                </View>

                <Text className="mb-4 text-lg font-bold text-[#1f1f1f]">担当者別回収状況</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    <FlatList
                        data={stats}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View className="mb-3 flex-row items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                                <View className="flex-1">
                                    <Text className="text-base font-bold text-[#2b2b2b]">{item.name}</Text>
                                    <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                        <View
                                            className="h-full bg-blue-500"
                                            style={{ width: `${(item.count / (totalCount || 1)) * 100}%` }}
                                        />
                                    </View>
                                </View>
                                <View className="ml-4 items-end">
                                    <Text className="text-lg font-bold text-[#1f1f1f]">{item.count}</Text>
                                    <Text className="text-xs text-gray-500">件</Text>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
