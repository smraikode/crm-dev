import React from 'react';
import { View, ScrollView, Text } from 'dripsy';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockNotifications = [
  {
    id: 1,
    title: '✅ Attendance Marked',
    message: 'Your attendance for today has been successfully recorded.',
    icon: 'checkmark-done-circle-outline',
    time: 'Today, 9:15 AM',
  },
  {
    id: 2,
    title: '💰 Salary Credited',
    message: 'Your June salary has been credited to your bank account.',
    icon: 'cash-outline',
    time: 'Yesterday, 6:45 PM',
  },
  {
    id: 3,
    title: '📢 Site Announcement',
    message: 'Work on Tunnel Site A will resume at 9:00 AM tomorrow.',
    icon: 'megaphone-outline',
    time: '2 days ago',
  },
  {
    id: 4,
    title: '📅 Leave Approved',
    message: 'Your leave from 20th to 22nd June has been approved.',
    icon: 'calendar-clear-outline',
    time: '3 days ago',
  },
];

export default function NotificationScreen() {
  return (
    <View sx={{ flex: 1, bg: 'white', px: 3, pt: 50 }}>
      <Text sx={{ fontSize: 24, fontWeight: 'bold', mb: 20, textAlign: 'center', color: '#1F2937' }}>
        🔔 Notifications
      </Text>
      <ScrollView sx={{ pb: 40 }}>
        {mockNotifications.map((item) => (
          <View
            key={item.id}
            sx={{
              bg: '#F9FAFB',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              p: 16,
              mb: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              sx={{
                width: 46,
                height: 46,
                bg: '#EFF6FF',
                borderRadius: 999,
                justifyContent: 'center',
                alignItems: 'center',
                mr: 14,
              }}
            >
              <Ionicons name={item.icon} size={24} color="#2563EB" />
            </View>
            <View sx={{ flex: 1 }}>
              <Text sx={{ fontWeight: 'bold', fontSize: 16, color: '#111827' }}>{item.title}</Text>
              <Text sx={{ fontSize: 14, color: '#4B5563', mt: 1 }}>{item.message}</Text>
              <Text sx={{ fontSize: 12, color: '#9CA3AF', mt: 1 }}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
