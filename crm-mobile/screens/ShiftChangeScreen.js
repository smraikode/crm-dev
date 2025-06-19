// import React, { useState } from 'react';
// import { ScrollView, Pressable, Platform } from 'react-native';
// import { Box, Text, Button } from 'dripsy';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function ShiftChangeScreen() {
//   const today = new Date();
//   const [startDate, setStartDate] = useState(today);
//   const [endDate, setEndDate] = useState(today);
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);

//   const getDaysDiff = () => {
//     const diffTime = Math.abs(endDate - startDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   };

//   const formatDate = (date) => date.toISOString().split('T')[0];

//   return (
//     <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//       <Box sx={{ flex: 1, bg: 'white', pt: 60, px: 20 }}>
//         {/* Header */}
//         <Text sx={{ fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', mb: 20 }}>
//           Shift Change
//         </Text>

//         {/* Start and End Date */}
//         <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 12 }}>
//           <Pressable onPress={() => setShowStartPicker(true)}>
//             <Text sx={{ color: '#6B7280', fontSize: 14 }}>Start Date</Text>
//             <Text sx={{ fontSize: 16, fontWeight: 'bold' }}>{formatDate(startDate)}</Text>
//           </Pressable>

//           <Pressable onPress={() => setShowEndPicker(true)}>
//             <Text sx={{ color: '#6B7280', fontSize: 14 }}>End Date</Text>
//             <Text sx={{ fontSize: 16, fontWeight: 'bold' }}>{formatDate(endDate)}</Text>
//           </Pressable>
//         </Box>

//         {/* Day Count */}
//         <Box sx={{ mb: 20 }}>
//           <Text sx={{ textAlign: 'center', fontSize: 16, fontWeight: '500', color: '#1F2937' }}>
//             Selected Days: {getDaysDiff()}
//           </Text>
//         </Box>

//         {/* Calendar Picker */}
//         {showStartPicker && (
//           <DateTimePicker
//             value={startDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, date) => {
//               if (date) setStartDate(date);
//               setShowStartPicker(false);
//             }}
//           />
//         )}

//         {showEndPicker && (
//           <DateTimePicker
//             value={endDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, date) => {
//               if (date) setEndDate(date);
//               setShowEndPicker(false);
//             }}
//           />
//         )}

//         {/* Button */}
//         <Box sx={{ mt: 30 }}>
//           <Button
//             onPress={() => alert(`Selected Date: ${formatDate(startDate)} to ${formatDate(endDate)}`)}
//             sx={{ bg: '#2563EB', borderRadius: 8, py: 12 }}
//           >
//             <Text sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
//               Selected Date: {formatDate(startDate)} → {formatDate(endDate)}
//             </Text>
//           </Button>
//         </Box>
//       </Box>
//     </ScrollView>
//   );
// }
