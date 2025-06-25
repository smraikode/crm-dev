
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'dripsy';
import { Dimensions, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoints } from '../apiconfig/apiconfig';
import HistoryCard from '../components/HistoryCard';

export default function HistoryScreen() {
  const screenHeight = Dimensions.get('window').height;
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetchTimeline();
  }, [selectedDate]);

  const fetchTimeline = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let url = apiEndpoints.attendanceHistory;

      if (selectedDate) {
        const isoDate = selectedDate.toISOString().split('T')[0];
        url += `?date=${isoDate}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.timeline || [];

      const grouped = {};
      data.forEach((entry) => {
        const dateKey = new Date(entry.timestamp).toDateString();
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(entry);
      });

      const logs = Object.entries(grouped).map(([date, records]) => {
        const sorted = records.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        const clockIn = sorted[0]?.timestamp || null;
        const clockOut = sorted[sorted.length - 1]?.timestamp || null;

        const shiftStart = new Date(date + ' 11:00:00');
        const shiftEnd = new Date(date + ' 15:00:00');

        const clockInDate = clockIn ? new Date(clockIn) : null;
        const clockOutDate = clockOut ? new Date(clockOut) : null;

        let status = 'On Time';
        let lateDuration = '';
        let earlyLogout = '';

        // Late logic
        if (clockInDate && clockInDate >= shiftStart) {
          const diffMs = clockInDate - shiftStart;
          const mins = Math.floor(diffMs / 60000);
          const secs = Math.floor((diffMs % 60000) / 1000);
          lateDuration = `${mins} mins ${secs} sec`;
          status = 'Late';
        }

        // Early logout logic
        if (clockOutDate && clockOutDate < shiftEnd) {
          const diffMs = shiftEnd - clockOutDate;
          const mins = Math.floor(diffMs / 60000);
          const secs = Math.floor((diffMs % 60000) / 1000);
          earlyLogout = `${mins} mins ${secs} sec early logout`;
        }

        const effectiveMs =
          clockInDate && clockOutDate ? clockOutDate - clockInDate : 0;
        const effectiveHours = (effectiveMs / (1000 * 60 * 60)).toFixed(2);

        return {
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          date: new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          clockIn: clockInDate
            ? clockInDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '-',
          clockOut: clockOutDate
            ? clockOutDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '-',
          status,
          lateDuration,
          earlyLogout,
          shift: '11:00 AM - 3:00 PM',
          effectiveHours: clockInDate && clockOutDate ? `${effectiveHours} hrs` : '0 hrs',
          grossHours: '4 hrs',
        };
      });

      setTimeline(logs);
    } catch (err) {
      console.error('❌ Error loading history:', err.message);
    }
  };

  return (
    <View sx={{ flex: 1, bg: 'white' }}>
      <ScrollView
        sx={{
          flex: 1,
          px: 3,
          pt: screenHeight * 0.06,
          pb: 80,
        }}
      >
        <Text
          sx={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#111827',
            mb: 20,
            mt: 10,
            textAlign: 'center',
          }}
        >
          🗕️ Attendance History
        </Text>

        {timeline.length > 0 ? (
          timeline.map((log, index) => <HistoryCard key={index} log={log} />)
        ) : (
          <Text sx={{ textAlign: 'center', mt: 40, color: '#9CA3AF' }}>
            No records found for this date.
          </Text>
        )}
      </ScrollView>

      <Pressable
        onPress={() => setShowPicker(true)}
        sx={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          bg: '#2563EB',
          p: 12,
          borderRadius: 30,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Ionicons name="calendar" size={24} color="white" />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}
    </View>
  );
}
