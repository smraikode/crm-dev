// import React, { useEffect, useState } from 'react';
// import { ScrollView, ActivityIndicator } from 'react-native';
// import { Box, Text } from 'dripsy';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { apiEndpoints } from '../apiconfig/apiconfig';

// export default function MyTimelineUserScreen() {
//   const [timeline, setTimeline] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchTimeline = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(apiEndpoints.myTimelineUser, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTimeline(res.data);
//     } catch (err) {
//       console.error('Error fetching timeline:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTimeline();
//   }, []);

//   // 📆 Format timestamp into readable date-time string
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp || timestamp === 'N/A') return 'N/A';
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-IN', {
//       dateStyle: 'medium',
//       timeStyle: 'medium',
//       hour12: true,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Box sx={{ mb: 24 }}>
//         <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>
//           📊 My Attendance Timeline
//         </Text>
//         <Text sx={{ fontSize: 14, color: 'gray' }}>
//           Summary of your site attendance
//         </Text>
//       </Box>

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : timeline ? (
//         <Box
//           sx={{
//             borderWidth: 1,
//             borderColor: '#e0e0e0',
//             backgroundColor: 'white',
//             padding: 16,
//             borderRadius: 12,
//           }}
//         >
//           <Text sx={{ fontWeight: 'bold', mb: 2 }}>📧 Email:</Text>
//           <Text sx={{ mb: 3 }}>{timeline.email}</Text>

//           <Text sx={{ fontWeight: 'bold', mb: 2 }}>🕐 Clock In Time:</Text>
//           <Text sx={{ mb: 3 }}>{formatTimestamp(timeline.clock_in_time)}</Text>

//           <Text sx={{ fontWeight: 'bold', mb: 2 }}>🔁 Last Updated:</Text>
//           <Text sx={{ mb: 3 }}>{formatTimestamp(timeline.last_update_time)}</Text>

//           <Text sx={{ fontWeight: 'bold', mb: 2 }}>🏁 Clock Out Time:</Text>
//           <Text>{formatTimestamp(timeline.clock_out_time)}</Text>
//         </Box>
//       ) : (
//         <Text>No timeline data found.</Text>
//       )}
//     </ScrollView>
//   );
// }





import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Box, Text } from 'dripsy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiEndpoints } from '../apiconfig/apiconfig';

export default function MyTimelineUserScreen() {
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTimeline(); }, []);

  const fetchTimeline = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(apiEndpoints.myTimelineUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTimelineData(res.data);
    } catch (err) {
      console.error('Error fetching timeline:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Box sx={{ mb: 24 }}>
        <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF',mt:20 ,ml:15}}>
          📊 My Attendance Timeline
        </Text>
        <Text sx={{ fontSize: 14, color: 'gray',mt:-10,ml:15 }}>
          Email, Clock In, Updates & Clock Out
        </Text>
      </Box>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : timelineData ? (
        <Box sx={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 12, overflow: 'hidden' }}>
          {/* Table Header */}
          <Box sx={{ flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
            {['📧 Email', '🕐 Clock In', '🔁 Updated', '🏁 Clock Out'].map((col, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: 1,
                  borderRightWidth: idx < 3 ? 1 : 0,
                  borderColor: '#ccc',
                  padding: 10,
                }}
              >
                <Text sx={{ fontWeight: 'bold', textAlign: 'center' }}>{col}</Text>
              </Box>
            ))}
          </Box>

          {/* Table Rows */}
          {[...timelineData.timeline]
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // ascending sort
            .map((item, index) => (
              <Box
                key={index}
                sx={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: '#ccc',
                }}
              >
                {/* Email Column */}
                <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                  <Text sx={{ textAlign: 'center' }}>
                    {item.status === 'clockin' ? timelineData.email : ''}
                  </Text>
                </Box>

                {/* Clock In Column */}
                <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                  <Text sx={{ textAlign: 'center' }}>
                    {item.status === 'clockin' ? formatTimestamp(item.timestamp) : ''}
                  </Text>
                </Box>

                {/* Updated Column */}
                <Box sx={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                  <Text sx={{ textAlign: 'center' }}>
                    {item.status === 'update' ? formatTimestamp(item.timestamp) : ''}
                  </Text>
                </Box>

                {/* Clock Out Column */}
                <Box sx={{ flex: 1, padding: 10 }}>
                  <Text sx={{ textAlign: 'center' }}>
                    {(item.status === 'clockout' || item.status === 'auto-clockout')
                      ? formatTimestamp(item.timestamp)
                      : ''}
                  </Text>
                </Box>
              </Box>
            ))}
        </Box>
      ) : (
        <Text sx={{ color: 'red', mt: 3 }}>No timeline data found.</Text>
      )}
    </ScrollView>
  );
}
