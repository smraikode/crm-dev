
import React from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Box, Text, Image } from 'dripsy';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { apiEndpoints } from '../apiconfig/apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockProfile } from '../utils/mockData';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handlePress = async (label) => {
    if (label === 'Logout') {
      try {
        const res = await axios.post(apiEndpoints.logout);
        await AsyncStorage.removeItem('token');

        Alert.alert('✅ Logout Successful', res.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          },
        ]);
      } catch (err) {
        console.error('❌ Logout Error:', err.response?.data || err.message);
        Alert.alert('Logout failed', err.response?.data?.detail || err.message);
      }
    } else {
      Alert.alert(`${label} clicked`);
    }
  };

  const menuOptions = [
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
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <Box sx={{ flex: 1, bg: 'white', pt: 60, px: 20 }}>
        
        {/* Profile Header */}
        <Box sx={{ alignItems: 'center', mb: 24 }}>
          <Image
            source={{ uri: mockProfile.image }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#ccc',
              marginBottom: 10,
            }}
          />
          <Text sx={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>
            {mockProfile.name}
          </Text>
        </Box>

        {/* Company Info */}
        <Box sx={{ alignItems: 'center', mb: 30 }}>
          <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="business-outline" size={18} color="#6B7280" />
            <Text sx={{ ml: 8, fontSize: 16, fontWeight: '500', color: '#374151' }}>
              {mockProfile.company}
            </Text>
          </Box>
          <Text sx={{ fontSize: 14, color: '#6B7280', mt: 2 }}>
            {mockProfile.site}
          </Text>
        </Box>

        {/* Divider */}
        <Box sx={{ height: 1, bg: '#E5E7EB', mb: 4 }} />

        {/* Settings List */}
        {menuOptions.map(({ icon, label, sub, action, iconColor, textColor }, i) => (
          <TouchableOpacity key={i} onPress={() => handlePress(action)}>
            <Box sx={{ flexDirection: 'row', alignItems: 'flex-start', py: 14 }}>
              <Icon name={icon} size={22} color={iconColor || '#4B5563'} />
              <Box sx={{ ml: 12, flex: 1 }}>
                <Text sx={{ fontSize: 16, fontWeight: '500', color: textColor || '#1F2937' }}>
                  {label}
                </Text>
                {sub && (
                  <Text sx={{ fontSize: 14, color: '#6B7280', mt: 2 }}>
                    {sub}
                  </Text>
                )}
              </Box>
            </Box>
            <Box sx={{ height: 1, bg: '#F3F4F6' }} />
          </TouchableOpacity>
        ))}
      </Box>
    </ScrollView>
  );
}
