
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Platform, Alert, ActivityIndicator } from 'react-native';
import { ScrollView, Pressable, Text, TextInput } from 'dripsy';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { apiEndpoints } from '../apiconfig/apiconfig';

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
  const [worker, setWorker] = useState({ worker_id: 'CW-0000', site: 'Tunnel A' });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  // ✅ Decode JWT token on mount and extract email
  useEffect(() => {
    const getEmailFromToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('Decoded token:', decoded);
          if (decoded?.sub) {
            setEmail(decoded.sub);
            console.log('Decoded email:', decoded.sub);
          }
        } catch (e) {
          console.warn('Error decoding token:', e);
        }
      }
    };
    getEmailFromToken();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const payload = {
        leave_type: selectedType,
        from_date: fromDate.toISOString().split('T')[0],
        to_date: toDate.toISOString().split('T')[0],
        reason,
        worker_id: worker.worker_id,
        site: worker.site,
      };

      const res = await axios.post(apiEndpoints.applyLeave, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('✅ Success', res.data.message, [
        {
          text: 'OK',
          onPress: () => {
            // Second alert after pressing OK on the first one
            Alert.alert('⏳ Please Wait', 'Your leave request is pending approval.');
          },
        },
      ]);
      setReason('');
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Error', err?.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View sx={{ flex: 1, bg: 'white' }}>
      <View sx={{ height: screenHeight * 0.6, justifyContent: 'center', alignItems: 'center' }}>
        <Text sx={{ fontSize: 26, fontWeight: 'bold', color: '#1D4ED8', pt: 40, pl: 70 }}>
          📝 Apply Leave
        </Text>
      </View>

      <ScrollView sx={{ px: 20, pt: 50, pb: 10 }} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ✅ Email Field */}
        <View sx={{ bg: '#F3F4F6', borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', p: 16, mb: 20 }}>
          <Text sx={{ fontSize: 16, fontWeight: '600', mb: 6, color: '#1F2937' }}>
            📧 Email: <Text sx={{ fontWeight: 'bold' }}>{email}</Text>
          </Text>
          <Text sx={{ fontSize: 16, fontWeight: '600', mb: 6, color: '#1F2937' }}>
            🆔 Worker ID: <Text sx={{ fontWeight: 'bold' }}>{worker.worker_id}</Text>
          </Text>
          <Text sx={{ fontSize: 16, mb: 20, fontWeight: '600', color: '#1F2937' }}>
            🏗️ Site: <Text sx={{ fontWeight: 'bold' }}>{worker.site}</Text>
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
                sx={{ ml: 8, color: selectedType === item.label ? 'white' : '#2563EB', fontSize: 14, fontWeight: '500' }}
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

        {/* Reason Input */}
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

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          sx={{
            bg: '#2563EB',
            py: 14,
            borderRadius: 10,
            alignItems: 'center',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>✅ Submit Leave</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}
