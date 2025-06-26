
// import React, { useEffect, useState } from 'react';
// import { ScrollView, ActivityIndicator, Pressable } from 'react-native';
// import { Box, Text } from 'dripsy';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { apiEndpoints } from '../apiconfig/apiconfig';
// import DateTimePicker from '@react-native-community/datetimepicker';


// export default function MyTimelineUserScreen() {
//   const [timelineData, setTimelineData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   useEffect(() => {
//     fetchTimeline(selectedDate);
//   }, [selectedDate]);

//   const fetchTimeline = async (dateObj) => {
//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

//       const res = await axios.get(`${apiEndpoints.myTimelineUser}?date=${formattedDate}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setTimelineData(res.data);
//     } catch (err) {
//       setTimelineData(null);
//       console.error('Error fetching timeline:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTimestamp = (ts) => {
//     if (!ts) return '';
//     const d = new Date(ts);
//     return d.toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Box sx={{ mb: 16 }}>
//         <Text sx={{  fontSize: 24, fontWeight: 'bold', color: '#007AFF', textAlign: 'center', mt: 20 }}>
//           📊 Attendance Timeline
//         </Text>
//       </Box>

//       {/* 📅 Date Picker */}
//       <Box sx={{ alignItems: 'flex-end', mb: 12 }}>
//         <Pressable onPress={() => setShowPicker(true)}>
//           <Text sx={{ fontSize: 12, color: '#007AFF', fontWeight: 'bold' }}>
//             📅 {selectedDate.toDateString()}
//           </Text>
//         </Pressable>
//         {showPicker && (
//           <DateTimePicker
//             value={selectedDate}
//             mode="date"
//             display="default"
//             maximumDate={new Date()} // prevent future date
//             onChange={(event, date) => {
//               setShowPicker(false);
//               if (date) setSelectedDate(date);
//             }}
//           />
//         )}
//       </Box>

//       {/* 📥 Email Header */}
//       {timelineData && timelineData.email && (
//         <Box sx={{ mb: 12, backgroundColor: '#e6f0ff', padding: 10, borderRadius: 8 }}>
//           <Text sx={{ fontWeight: 'bold', fontSize: 16 }}>👤 {timelineData.email}</Text>
//         </Box>
//       )}

//       {/* 🕐 Data Table */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : timelineData && timelineData.timeline && timelineData.timeline.length > 0 ? (
//         <Box sx={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}>
//           {/* Table Header */}
//           <Box sx={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
//             {['Clock In', 'Updated', 'Clock Out'].map((col, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   flex: 1,
//                   padding: 10,
//                   borderRightWidth: i < 2 ? 1 : 0,
//                   borderColor: '#ccc'
//                 }}
//               >
//                 <Text sx={{ textAlign: 'center', fontWeight: 'bold' }}>{col}</Text>
//               </Box>
//             ))}
//           </Box>

//          {/* Table Rows */}
//           {[...timelineData.timeline]
//             .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
//             .map((item, index) => {
//               const isClockIn = item.status === 'clockin';
//               const isUpdate = item.status === 'update';
//               const isClockOut = ['clockout', 'auto-clockout'].includes(item.status);

//               return (
//                 <Box
//                   key={index}
//                   sx={{
//                     flexDirection: 'row',
//                     borderTopWidth: 1,
//                     borderColor: '#eee',
//                     backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
//                   }}
//                 >
//                   {/* Clock In Cell */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       padding: 10,
//                       borderRightWidth: 1,
//                       borderColor: '#ccc',
//                       backgroundColor: isClockIn ? '#d9fdd3' : 'transparent'
//                     }}
//                   >
//                     <Text sx={{ textAlign: 'center' }}>
//                       {isClockIn ? formatTimestamp(item.timestamp) : ''}
//                     </Text>
//                   </Box>

//                   {/* Update Cell */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       padding: 10,
//                       borderRightWidth: 1,
//                       borderColor: '#ccc'
//                     }}
//                   >
//                     <Text sx={{ textAlign: 'center' }}>
//                       {isUpdate ? formatTimestamp(item.timestamp) : ''}
//                     </Text>
//                   </Box>

//                   {/* Clock Out Cell */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       padding: 10,
//                       backgroundColor: isClockOut ? '#ffe0e0' : 'transparent'
//                     }}
//                   >
//                     <Text sx={{ textAlign: 'center' }}>
//                       {isClockOut ? formatTimestamp(item.timestamp) : ''}
//                     </Text>
//                   </Box>
//                 </Box>
//               );
//             })}
//         </Box>
//       ) : (
//         <Text sx={{ textAlign: 'center', color: 'red', mt: 16 }}>
//           ❌ No data available for selected date.
//         </Text>
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
      const formattedDate = dateObj.toISOString().split('T')[0];

      const res = await axios.get(`${apiEndpoints.myTimelineUser}?date=${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = res.data;
      const timeline = data?.timeline || [];
      const enhancedTimeline = [...timeline];

      // Check if last clockin has no clockout
      const lastClockInIndex = timeline
        .map((e, i) => (e.status === 'clockin' ? i : -1))
        .filter((i) => i !== -1)
        .pop();

      const hasValidClockOutAfter = (fromIndex) =>
        timeline.slice(fromIndex + 1).some((e) =>
          ['clockout', 'auto-clockout'].includes(e.status)
        );

      if (lastClockInIndex !== undefined && !hasValidClockOutAfter(lastClockInIndex)) {
        const lastClockInTime = timeline[lastClockInIndex].timestamp;
        const fakeClockOutTime = new Date(new Date(lastClockInTime).getTime() + 5 * 60 * 1000); // 5 min later
        enhancedTimeline.push({
          status: 'auto-clockout',
          timestamp: fakeClockOutTime.toISOString()
        });
      }

      setTimelineData({
        ...data,
        timeline: enhancedTimeline
      });
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
        <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF', textAlign: 'center', mt: 20 }}>
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
            maximumDate={new Date()}
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
      </Box>

      {/* 📥 Email Header */}
      {timelineData?.email && (
        <Box sx={{ mb: 12, backgroundColor: '#e6f0ff', padding: 10, borderRadius: 8 }}>
          <Text sx={{ fontWeight: 'bold', fontSize: 16 }}>👤 {timelineData.email}</Text>
        </Box>
      )}

      {/* 🕐 Data Table */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : timelineData?.timeline?.length > 0 ? (
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

          {/* Timeline Rows */}
          {[...timelineData.timeline]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Descending by time
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
                      borderColor: '#ccc',
                      backgroundColor: isUpdate ? '#fff8c6' : 'transparent'
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
                      {isClockOut
                        ? `${formatTimestamp(item.timestamp)}${
                            item.status === 'auto-clockout' ? ' ⚠️' : ''
                          }`
                        : ''}
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
