import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Box, Text } from 'dripsy';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function AttendanceToday() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <Box sx={{ flex: 1, bg: 'white', pt: 60, px: 20 }}>

                {/* Header */}
                <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 28 }}>
                    <Text sx={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
                        Attendance - Today
                    </Text>
                    <Box sx={{ flexDirection: 'row' }}>

                        <Pressable sx={{ mr: 16 }}>
                            <Icon name="refresh" size={23} color="#6B7280" />
                        </Pressable>

                        {/* <Pressable onPress={() => navigation.navigate('ShiftChange')}>
                            <Icon name="swap-horizontal" size={22} color="#2563EB" />
                        </Pressable> */}

                        <Pressable >
                            <Icon name="swap-horizontal" size={23} color="#6B7280" />
                        </Pressable>



                        <Pressable>
                            <Icon name="ellipsis-vertical" size={23} color="#6B7280" />
                        </Pressable>
                    </Box>
                </Box>

                {/* Date & Shift */}
                <Box sx={{ mb: 24 }}>
                    <Text sx={{ fontSize: 16, color: '#6B7280', mb: 2 }}>📅 19 Jun, Thursday</Text>
                    <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="time-outline" size={18} color="#4B5563" />
                        <Text sx={{ fontSize: 16, fontWeight: '500', color: '#111827', ml: 8 }}>
                            GENERAL (10:00 AM - 07:00 PM)
                        </Text>
                    </Box>
                </Box>

                {/* Clock In/Out */}
                <Box
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bg: '#F3F4F6',
                        borderRadius: 10,
                        px: 16,
                        py: 12,
                        mb: 20,
                    }}
                >
                    <Box>
                        <Text sx={{ color: '#6B7280', fontSize: 14 }}>Clock In</Text>
                        <Text sx={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>10:05 AM</Text>
                    </Box>
                    <Box>
                        <Text sx={{ color: '#6B7280', fontSize: 14 }}>Clock Out</Text>
                        <Text sx={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>06:45 PM</Text>
                    </Box>
                </Box>

                {/* Effective vs Gross Hours */}
                <Box
                    sx={{
                        bg: '#F9FAFB',
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        borderRadius: 12,
                        px: 16,
                        py: 20,
                        mb: 28,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Box sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Box>
                            <Text sx={{ fontSize: 14, color: '#6B7280' }}>Effective Hours</Text>
                            <Text sx={{ fontSize: 18, fontWeight: 'bold', color: '#10B981' }}>● 8h 30m</Text>
                        </Box>
                        <Box>
                            <Text sx={{ fontSize: 14, color: '#6B7280' }}>Gross Hours</Text>
                            <Text sx={{ fontSize: 18, fontWeight: 'bold', color: '#3B82F6' }}>● 8h 40m</Text>
                        </Box>
                    </Box>
                </Box>

                {/* Time Logs */}
                <Box>
                    <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#111827', mb: 16 }}>
                        🕒 Time Logs
                    </Text>

                    {[1].map((log, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#E5E7EB',
                                pb: 16,
                                mb: 16,
                            }}
                        >
                            <Text sx={{ fontSize: 15, fontWeight: '600', color: '#374151', mb: 10 }}>
                                📍 Site Name {index + 1}
                            </Text>

                            <Box sx={{ flexDirection: 'row', alignItems: 'center', mb: 8 }}>
                                <Icon name="log-in-outline" size={18} color="#10B981" />
                                <Text sx={{ ml: 10, fontSize: 15, color: '#111827' }}>Clock In: 10:05 AM</Text>
                            </Box>

                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="log-out-outline" size={18} color="#EF4444" />
                                <Text sx={{ ml: 10, fontSize: 15, color: '#111827' }}>Clock Out: 06:45 PM</Text>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </ScrollView>
    );
}
