

// import React, { useEffect, useState } from 'react';
// import { ScrollView, ActivityIndicator } from 'react-native';
// import { Box, Text } from 'dripsy';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { apiEndpoints } from '../apiconfig/apiconfig';

// export default function MyTimelineUserScreen() {
//   const [timelineData, setTimelineData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { fetchTimeline(); }, []);

//   const fetchTimeline = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(apiEndpoints.myTimelineUser, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTimelineData(res.data);
//     } catch (err) {
//       console.error('Error fetching timeline:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTimestamp = (ts) => {
//     if (!ts) return '';
//     const d = new Date(ts);
//     return d.toLocaleString('en-IN', {
//       year: 'numeric', month: 'short', day: 'numeric',
//       hour: '2-digit', minute: '2-digit', hour12: true
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Box sx={{ mb: 24 }}>
//         <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF',mt:20 ,ml:15}}>
//           📊 My Attendance Timeline
//         </Text>
//         <Text sx={{ fontSize: 14, color: 'gray',mt:-10,ml:15 }}>
//           Email, Clock In, Updates & Clock Out
//         </Text>
//       </Box>

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : timelineData ? (
//         <Box sx={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 12, overflow: 'hidden' }}>
//           {/* Table Header */}
//           <Box sx={{ flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
//             {['📧 Email', '🕐 Clock In', '🔁 Updated', '🏁 Clock Out'].map((col, idx) => (
//               <Box
//                 key={idx}
//                 sx={{
//                   flex: 1,
//                   borderRightWidth: idx < 3 ? 1 : 0,
//                   borderColor: '#ccc',
//                   padding: 10,
//                 }}
//               >
//                 <Text sx={{ fontWeight: 'bold', textAlign: 'center' }}>{col}</Text>
//               </Box>
//             ))}
//           </Box>

//           {/* Table Rows */}
//           {[...timelineData.timeline]
//             .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // ascending sort
//             .map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   flexDirection: 'row',
//                   borderTopWidth: 1,
//                   borderColor: '#ccc',
//                 }}
//               >
//                 {/* Email Column */}
//                 <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
//                   <Text sx={{ textAlign: 'center' }}>
//                     {item.status === 'clockin' ? timelineData.email : ''}
//                   </Text>
//                 </Box>

//                 {/* Clock In Column */}
//                 <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
//                   <Text sx={{ textAlign: 'center' }}>
//                     {item.status === 'clockin' ? formatTimestamp(item.timestamp) : ''}
//                   </Text>
//                 </Box>

//                 {/* Updated Column */}
//                 <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
//                   <Text sx={{ textAlign: 'center' }}>
//                     {item.status === 'update' ? formatTimestamp(item.timestamp) : ''}
//                   </Text>
//                 </Box>

//                 {/* Clock Out Column */}
//                 <Box sx={{ flex: 1, padding: 10 }}>
//                   <Text sx={{ textAlign: 'center' }}>
//                     {(item.status === 'clockout' || item.status === 'auto-clockout')
//                       ? formatTimestamp(item.timestamp)
//                       : ''}
//                   </Text>
//                 </Box>
//               </Box>
//             ))}
//         </Box>
//       ) : (
//         <Text sx={{ color: 'red', mt: 3 }}>No timeline data found.</Text>
//       )}
//     </ScrollView>
//   );
// }


import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { Box, Text } from 'dripsy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiEndpoints } from '../apiconfig/apiconfig';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function MyTimelineUserScreen() {
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchTimeline(selectedDate);
  }, [selectedDate]);

  const fetchTimeline = async (dateObj) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

      const res = await axios.get(`${apiEndpoints.myTimelineUser}?date=${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTimelineData(res.data);
    } catch (err) {
      setTimelineData(null);
      console.error('Error fetching timeline:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Box sx={{ mb: 16 }}>
        <Text sx={{  fontSize: 24, fontWeight: 'bold', color: '#007AFF', textAlign: 'center', mt: 20 }}>
          📊 Attendance Timeline
        </Text>
      </Box>

      {/* 📅 Date Picker */}
      <Box sx={{ alignItems: 'flex-end', mb: 12 }}>
        <Pressable onPress={() => setShowPicker(true)}>
          <Text sx={{ fontSize: 12, color: '#007AFF', fontWeight: 'bold' }}>
            📅 {selectedDate.toDateString()}
          </Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={new Date()} // prevent future date
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
      </Box>

      {/* 📥 Email Header */}
      {timelineData && timelineData.email && (
        <Box sx={{ mb: 12, backgroundColor: '#e6f0ff', padding: 10, borderRadius: 8 }}>
          <Text sx={{ fontWeight: 'bold', fontSize: 16 }}>👤 {timelineData.email}</Text>
        </Box>
      )}

      {/* 🕐 Data Table */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : timelineData && timelineData.timeline && timelineData.timeline.length > 0 ? (
        <Box sx={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}>
          {/* Table Header */}
          <Box sx={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
            {['Clock In', 'Updated', 'Clock Out'].map((col, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  padding: 10,
                  borderRightWidth: i < 2 ? 1 : 0,
                  borderColor: '#ccc'
                }}
              >
                <Text sx={{ textAlign: 'center', fontWeight: 'bold' }}>{col}</Text>
              </Box>
            ))}
          </Box>

         {/* Table Rows */}
          {[...timelineData.timeline]
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((item, index) => {
              const isClockIn = item.status === 'clockin';
              const isUpdate = item.status === 'update';
              const isClockOut = ['clockout', 'auto-clockout'].includes(item.status);

              return (
                <Box
                  key={index}
                  sx={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#eee',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
                  }}
                >
                  {/* Clock In Cell */}
                  <Box
                    sx={{
                      flex: 1,
                      padding: 10,
                      borderRightWidth: 1,
                      borderColor: '#ccc',
                      backgroundColor: isClockIn ? '#d9fdd3' : 'transparent'
                    }}
                  >
                    <Text sx={{ textAlign: 'center' }}>
                      {isClockIn ? formatTimestamp(item.timestamp) : ''}
                    </Text>
                  </Box>

                  {/* Update Cell */}
                  <Box
                    sx={{
                      flex: 1,
                      padding: 10,
                      borderRightWidth: 1,
                      borderColor: '#ccc'
                    }}
                  >
                    <Text sx={{ textAlign: 'center' }}>
                      {isUpdate ? formatTimestamp(item.timestamp) : ''}
                    </Text>
                  </Box>

                  {/* Clock Out Cell */}
                  <Box
                    sx={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: isClockOut ? '#ffe0e0' : 'transparent'
                    }}
                  >
                    <Text sx={{ textAlign: 'center' }}>
                      {isClockOut ? formatTimestamp(item.timestamp) : ''}
                    </Text>
                  </Box>
                </Box>
              );
            })}
        </Box>
      ) : (
        <Text sx={{ textAlign: 'center', color: 'red', mt: 16 }}>
          ❌ No data available for selected date.
        </Text>
      )}
    </ScrollView>
  );
}