import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, Image, useDripsyTheme } from 'dripsy';
import Icon from 'react-native-vector-icons/Ionicons';
import { mockProfile } from '../utils/mockData';

export default function ProfileScreen() {
  const { theme } = useDripsyTheme();

  const handlePress = (label) => {
    console.log(`${label} pressed`);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <Box sx={{ flex: 1, bg: 'white', pt: 60, px: 20 }}>
        {/* Profile Header */}
        <Box sx={{ alignItems: 'center', mb: 24 }}>
          <Image
            source={{ uri: mockProfile.image }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: '#ccc',
              marginBottom: 12,
            }}
          />
          <Text sx={{ fontSize: 18, fontWeight: 'bold', color: '#6D28D9' }}>
            {mockProfile.name}
          </Text>
        </Box>

        {/* Company Info */}
        <Box sx={{ alignItems: 'flex-start', mb: 24 }}>
          <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="business-outline" size={20} color="#374151" />
            <Text sx={{ ml: 8, fontSize: 16, fontWeight: '500', color: 'text' }}>
              {mockProfile.company}
            </Text>
          </Box>
          <Text sx={{ fontSize: 14, color: 'text', mt: 2 }}>{mockProfile.site}</Text>
        </Box>

        <Box sx={{ height: 1, bg: '#E5E7EB', mb: 4 }} />

        {/* Menu Options */}
        {[
          {
            icon: 'language-outline',
            label: 'Language',
            sub: mockProfile.language,
            action: 'Language',
          },
          {
            icon: 'key-outline',
            label: 'Secure Your App',
            sub: 'Disabled',
            action: 'Secure',
          },
          {
            icon: 'chatbubble-ellipses-outline',
            label: 'Send Feedback',
            sub: 'Give your valuable feedback',
            action: 'Feedback',
          },
          {
            icon: 'color-palette-outline',
            label: 'Theme',
            sub: 'Automatic',
            action: 'Theme',
          },
          {
            icon: 'log-out-outline',
            label: 'Logout',
            sub: mockProfile.site,
            action: 'Logout',
            iconColor: '#DC2626',
            textColor: '#DC2626',
          },
        ].map(({ icon, label, sub, action, iconColor, textColor }, i) => (
          <TouchableOpacity key={i} onPress={() => handlePress(action)}>
            <Box sx={{ py: 16, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Icon name={icon} size={22} color={iconColor || '#4B5563'} />
              <Box sx={{ ml: 12 }}>
                <Text sx={{ fontSize: 16, fontWeight: '500', color: textColor || '#1F2937' }}>
                  {label}
                </Text>
                {sub && (
                  <Text sx={{ fontSize: 14, color: '#6B7280', mt: 2 }}>{sub}</Text>
                )}
              </Box>
            </Box>
            <Box sx={{ height: 1, bg: '#F3F4F6' }} />
          </TouchableOpacity>
        ))}

        {/* Footer Version */}
        <Box sx={{ alignItems: 'center', mt: 24 }}>
          <Text sx={{ color: 'gray', fontSize: 13 }}>© myapp.com</Text>
          <Text sx={{ color: 'gray', fontSize: 13, mt: 2 }}>v1.0.0 • Build 12345</Text>
        </Box>
      </Box>
    </ScrollView>
  );
}
