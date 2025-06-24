

import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'dripsy';
import { Dimensions, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mockAttendanceLogs } from '../utils/mockData';
import HistoryCard from '../components/HistoryCard';

export default function HistoryScreen() {
  const screenHeight = Dimensions.get('window').height;
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Format date to compare
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Filter records
  const filteredLogs = selectedDate
    ? mockAttendanceLogs.filter(
      (log) => log.date === formatDate(selectedDate)
    )
    : mockAttendanceLogs;


  return (
    <View sx={{ flex: 1, bg: 'white' }}>
      <ScrollView
        sx={{
          flex: 1,
          px: 3,
          pt: screenHeight * 0.06,
          pb: 80, // Enough space for the bottom icon
        }}
      >
        {/* Page Header */}
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

        {/* Filtered Cards */}
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <HistoryCard key={index} log={log} />
          ))
        ) : (
          <Text sx={{ textAlign: 'center', mt: 40, color: '#9CA3AF' }}>
            No records found for this date.
          </Text>
        )}
      </ScrollView>

      {/* Fixed Bottom Calendar Icon */}
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

      {/* Date Picker */}
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


