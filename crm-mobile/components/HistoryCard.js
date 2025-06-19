
import React from 'react';
import { View, Text } from 'dripsy';

export default function HistoryCard({ log }) {
  return (
    <View
      sx={{
        bg: '#FFFFFF',
        borderRadius: 19,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        p: 6,
        mb: 15,
        mb: 15,
        mx: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Top: Day, Date and Status */}
      <View sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
        <Text sx={{ fontSize: 15, fontWeight: 'bold', color: '#1F2937' }}>
          {log.day}, {log.date}
        </Text>
        <Text
          sx={{
            fontSize: 14,
            fontWeight: '500',
            color: log.status === 'Late' ? '#DC2626' : '#16A34A',
          }}
        >
          {log.status === 'Late' ? `${log.lateDuration} Late` : 'On Time'}
        </Text>
      </View>

      {/* Shift Info */}
      <Text sx={{ fontSize: 13, color: '#6B7280', mb: 3 }}>🕒 Shift: {log.shift}</Text>

      {/* Clock In & Clock Out */}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <View>
          <Text sx={{ fontSize: 12, color: '#9CA3AF' }}>Clock In</Text>
          <Text sx={{ fontSize: 14, fontWeight: '500', color: '#111827', mt: 1 }}>
            {log.clockIn}
          </Text>
        </View>
        <View>
          <Text sx={{ fontSize: 12, color: '#9CA3AF' }}>Clock Out</Text>
          <Text sx={{ fontSize: 14, fontWeight: '500', color: '#111827', mt: 1 }}>
            {log.clockOut}
          </Text>
        </View>
      </View>

      {/* Hours Summary */}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
          pt: 2,
        }}
      >
        <Text sx={{ fontSize: 13, color: '#374151' }}>
          ⏱ Effective Hours: <Text sx={{ fontWeight: '500' }}>{log.effectiveHours}</Text>
        </Text>
        <Text sx={{ fontSize: 13, color: '#374151' }}>
          🧾 Gross Hours: <Text sx={{ fontWeight: '500' }}>{log.grossHours}</Text>
        </Text>
      </View>
    </View>
  );
}
