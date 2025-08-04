import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Text, View } from 'dripsy';

// 📏 Responsive padding
const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 900;

// 🧪 Static dummy workers data
const staticWorkers = [
    {
        id: 1,
        name: 'Raju Pawar',
        role: 'Mason',
        status: 'Present',
        checkIn: '09:10 AM',
        checkOut: '06:05 PM',
    },
    {
        id: 2,
        name: 'Salman Shaikh',
        role: 'Labour',
        status: 'Absent',
        checkIn: null,
        checkOut: null,
    },
    {
        id: 3,
        name: 'Sandeep Kumar',
        role: 'Welder',
        status: 'Present',
        checkIn: '10:05 AM',
        checkOut: '05:55 PM',
    },
    {
        id: 4,
        name: 'Sandeep Kumar',
        role: 'Welder',
        status: 'Present',
        checkIn: '10:05 AM',
        checkOut: '05:55 PM',
    },
    {
        id: 5,
        name: 'Sandeep Kumar',
        role: 'Welder',
        status: 'Present',
        checkIn: '10:05 AM',
        checkOut: '05:55 PM',
    },
    {
        id: 6,
        name: 'Sandeep Kumar',
        role: 'Welder',
        status: 'Present',
        checkIn: '10:05 AM',
        checkOut: '05:55 PM',
    },
    {
        id: 7,
        name: 'Sandeep Kumar',
        role: 'Welder',
        status: 'Present',
        checkIn: '10:05 AM',
        checkOut: '05:55 PM',
    },
];

export default function SiteTeamScreen() {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        // ✅ Static setup for now
        setWorkers(staticWorkers);

        // 🧠 FUTURE: Replace with API call
        /*
        fetch('https://your-api.com/supervisor/workers')
          .then(res => res.json())
          .then(data => setWorkers(data))
          .catch(err => console.error(err));
        */
    }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: isSmallScreen ? 12 : 20 }}>
            <Text
                sx={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#1D4ED8',
                    mb: 20,
                    textAlign: 'center',
                }}
            >
                👷 Site Team Attendance
            </Text>

            {workers.map((worker) => (
                <View
                    key={worker.id}
                    sx={{
                        bg: 'white',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        p: 9, // ✅ Increased from 3 to 4 (better padding ~16px)
                        mb: 4,
                        shadowColor: '#000',
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >

                    <Text sx={{ fontSize: 17, fontWeight: 'bold', mb: 1 }}>
                        {worker.name} — {worker.role}
                    </Text>

                    <Text
                        sx={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: worker.status === 'Present' ? '#10B981' : '#EF4444',
                            mb: 2,
                        }}
                    >
                        {worker.status === 'Present' ? '✅ Present' : '❌ Absent'}
                    </Text>

                    <View sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text sx={{ fontSize: 12, color: '#6B7280' }}>Clock In</Text>
                            <Text sx={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                                {worker.checkIn || '--'}
                            </Text>
                        </View>
                        <View>
                            <Text sx={{ fontSize: 12, color: '#6B7280' }}>Clock Out</Text>
                            <Text sx={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                                {worker.checkOut || '--'}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
