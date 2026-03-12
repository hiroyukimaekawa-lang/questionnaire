import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export function useSyncToSheets() {
    const [syncing, setSyncing] = useState(false);

    const sync = async () => {
        setSyncing(true);
        try {
            const querySnapshot = await firestore().collection('surveys').get();
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                submittedAt: doc.data().submittedAt?.toDate().toISOString(),
            }));

            // NOTE: This URL would be the deployed GAS Web App URL
            const GAS_WEBAPP_URL = 'YOUR_GAS_WEBAPP_URL';

            if (GAS_WEBAPP_URL === 'YOUR_GAS_WEBAPP_URL') {
                console.warn('GAS_WEBAPP_URL is not set');
                return;
            }

            await fetch(GAS_WEBAPP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

        } catch (error) {
            console.error('Failed to sync with sheets:', error);
        } finally {
            setSyncing(false);
        }
    };

    return { sync, syncing };
}
