import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { ScrollView, Pressable, Text, TextInput } from 'dripsy';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ApplyLeaveScreen() {
  const screenHeight = Dimensions.get('window').height;

  const leaveTypes = [
    { label: 'Sick Leave', icon: 'medkit-outline' },
    { label: 'Personal Leave', icon: 'person-outline' },
    { label: 'Injury Leave', icon: 'bandage-outline' },
    { label: 'Village Visit', icon: 'home-outline' },
    { label: 'Festival Leave', icon: 'sparkles-outline' },
  ];
  
  const [selectedType, setSelectedType] = useState(leaveTypes[0].label);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleSubmit = () => {
    alert(`Leave applied for ${selectedType}\nFrom: ${fromDate.toDateString()} \nTo: ${toDate.toDateString()}`);
  };

  return (
    <View sx={{ flex: 1, bg: 'white' }}>
      {/* Centered Title */}
      <View
        sx={{
          height: screenHeight * 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: 26, fontWeight: 'bold', color: '#1D4ED8',pt: 40,pl:70}}>
          📝 Apply Leave
        </Text>
      </View>

      {/* Main Form Section */}
      <ScrollView
        sx={{ px: 20, pt: 50, pb: 10 }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        {/* Worker Info */}
        <View sx={{
          bg: '#F3F4F6',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          p: 16,
          mb: 20,
        }}>
          <Text sx={{ fontSize: 16, fontWeight: '600', mb: 6, color: '#1F2937' }}>
            👷 Name: <Text sx={{ fontWeight: 'bold' }}>Rajesh Yadav</Text>
          </Text>
          <Text sx={{ fontSize: 16, fontWeight: '600', mb: 6, color: '#1F2937' }}>
            🆔 Worker ID: <Text sx={{ fontWeight: 'bold' }}>CW-1932</Text>
          </Text>
          <Text sx={{ fontSize: 16,mb: 20, fontWeight: '600', color: '#1F2937' }}>
            🏗️ Site: <Text sx={{ fontWeight: 'bold' }}>Tunnel Project A</Text>
          </Text>
        </View>

        {/* Leave Type */}
        <Text sx={{ fontSize: 16, fontWeight: 'bold', mb: 20, color: '#111827' }}>🗂️ Leave Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} sx={{ mb: 28 }}>
          {leaveTypes.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={() => setSelectedType(item.label)}
              sx={{
                bg: selectedType === item.label ? '#2563EB' : '#E5E7EB',
                px: 16,
                py: 10,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                mr: 12,
              }}
            >
              <Ionicons
                name={item.icon}
                size={18}
                color={selectedType === item.label ? 'white' : '#2563EB'}
              />
              <Text
                sx={{
                  ml: 8,
                  color: selectedType === item.label ? 'white' : '#2563EB',
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Dates */}
        <Text sx={{ fontSize: 16, fontWeight: 'bold', mb: 12, color: '#111827' }}>📅 Select Dates</Text>

        <Pressable onPress={() => setShowFromPicker(true)} sx={{ mb: 16 }}>
          <Text sx={{ fontSize: 15, color: '#374151' }}>
            📍 From: <Text sx={{ fontWeight: '500' }}>{fromDate.toDateString()}</Text>
          </Text>
        </Pressable>
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            minimumDate={new Date()}
            onChange={(e, date) => {
              setShowFromPicker(false);
              if (date) {
                setFromDate(date);
                if (toDate < date) setToDate(date);
              }
            }}
          />
        )}

        <Pressable onPress={() => setShowToPicker(true)} sx={{ mb: 28 }}>
          <Text sx={{ fontSize: 15, color: '#374151' }}>
            📍 To: <Text sx={{ fontWeight: '500' }}>{toDate.toDateString()}</Text>
          </Text>
        </Pressable>
        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            minimumDate={fromDate}
            onChange={(e, date) => {
              setShowToPicker(false);
              if (date) setToDate(date);
            }}
          />
        )}

        {/* Reason */}
        <Text sx={{ fontSize: 16, fontWeight: 'bold', mb: 10, color: '#111827' }}>🗣️ Reason (Optional)</Text>
        <TextInput
          placeholder="Example: Fever, family issue..."
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
          sx={{
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 10,
            padding: 12,
            textAlignVertical: 'top',
            fontSize: 14,
            backgroundColor: '#F9FAFB',
            mb: 32,
          }}
        />

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit}
          sx={{
            bg: '#2563EB',
            py: 14,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            ✅ Submit Leave
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
