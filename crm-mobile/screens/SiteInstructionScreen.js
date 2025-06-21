import React from 'react';
import { ScrollView, View, Text } from 'dripsy';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockInstructions = [
    {
        id: 1,
        title: '⏰ Shift Time Changed',
        message: 'Morning shift now starts at 7:30 AM instead of 8:00 AM from tomorrow.',
        date: 'June 19, 2025',
        icon: 'time-outline',
    },
    {
        id: 2,
        title: '🧯 Safety Gear Reminder',
        message: 'All workers must wear safety helmets and reflective jackets at all times.',
        date: 'June 18, 2025',
        icon: 'warning-outline',
    },
    {
        id: 3,
        title: '🌧️ Weather Alert',
        message: 'Rain expected after 3:00 PM today. Outdoor tasks to be wrapped up early.',
        date: 'June 17, 2025',
        icon: 'cloudy-outline',
    },
    {
        id: 4,
        title: '🚨 Site Entry Restriction',
        message: 'Main gate will remain closed from 1:00 PM to 2:00 PM for vehicle unloading. Use Gate 2.',
        date: 'June 16, 2025',
        icon: 'exit-outline',
    },
    {
        id: 5,
        title: '🧹 Clean-Up Drive',
        message: 'All sections must complete tool cleanup by 5:00 PM today. Safety inspection tomorrow morning.',
        date: 'June 16, 2025',
        icon: 'broom-outline',
    },
    {
        id: 6,
        title: '🧰 Toolbox Talk',
        message: 'Daily safety briefing will be held at 8:00 AM sharp near the site office. Mandatory for all workers.',
        date: 'June 16, 2025',
        icon: 'chatbox-ellipses-outline',
    },
    {
        id: 7,
        title: '🪜 Scaffold Inspection',
        message: 'All scaffolds on Block B must be re-checked by 3:00 PM for height compliance and tagging.',
        date: 'June 16, 2025',
        icon: 'hammer-outline',
    },
];

export default function SiteInstructionScreen() {
    return (
        <ScrollView
            sx={{
                flex: 1,
                bg: 'white',
                px: 3,
                pt: 50,
                pb: 30,
            }}
        >
            <Text
                sx={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1F2937',
                    mb: 24,
                    textAlign: 'center',
                }}
            >
                📣 Site Instructions
            </Text>

            {mockInstructions.map((notice) => (
                <View
                    key={notice.id}
                    sx={{
                        bg: '#F9FAFB',
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        p: 16,
                        mb: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 1,
                    }}
                >
                    <View sx={{ flexDirection: 'row', alignItems: 'center', mb: 10 }}>
                        <Ionicons name={notice.icon} size={20} color="#2563EB" />
                        <Text sx={{ fontSize: 16, fontWeight: '600', ml: 10, color: '#111827' }}>
                            {notice.title}
                        </Text>
                    </View>
                    <Text sx={{ fontSize: 14, color: '#374151', mb: 8 }}>{notice.message}</Text>
                    <Text sx={{ fontSize: 12, color: '#9CA3AF', textAlign: 'right' }}>{notice.date}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
