import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from 'dripsy';

// 🧪 Static instruction data (replace with API later)
const staticInstructions = [
  {
    id: 1,
    title: 'Safety Drill Reminder',
    content: 'Conduct safety drill at 3 PM today. Ensure all workers participate.',
    issuedBy: 'Supervisor A',
    date: '2025-06-18',
    time: '10:00 AM',
  },
  {
    id: 2,
    title: 'Material Delivery',
    content: 'New cement and rods arriving at Gate B at 11 AM. Be ready to unload.',
    issuedBy: 'Site Manager',
    date: '2025-06-18',
    time: '09:15 AM',
  },
  {
    id: 3,
    title: 'Welding Area Restricted',
    content: 'Entry restricted near welding zone from 2 PM - 4 PM due to testing.',
    issuedBy: 'Safety Officer',
    date: '2025-06-17',
    time: '04:45 PM',
  },
];

export default function InstructionDetailScreen() {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // ✅ Static load for now
    setInstructions(staticInstructions);

    // 🔄 FUTURE: Replace with API call
    /*
    fetch('https://your-api.com/supervisor/instructions')
      .then((res) => res.json())
      .then((data) => setInstructions(data))
      .catch((err) => console.error('❌ Failed to load instructions', err));
    */
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 7 }}>
      <Text
        sx={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#1D4ED8',
          textAlign: 'center',
          mb: 10,
        }}
      >
        📝 Site Instructions
      </Text>

      {instructions.map((item) => (
        <View
          key={item.id}
          sx={{
            bg: 'white',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            p: 4,
            mb: 6,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text sx={{ fontSize: 17, fontWeight: 'bold', mb: 1, color: '#111827' }}>
            📌 {item.title}
          </Text>

          <Text sx={{ fontSize: 14, color: '#374151', mb: 2 }}>
            {item.content}
          </Text>

          <View sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text sx={{ fontSize: 12, color: '#6B7280' }}>👤 {item.issuedBy}</Text>
            <Text sx={{ fontSize: 12, color: '#6B7280' }}>
              📅 {item.date} | 🕒 {item.time}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
