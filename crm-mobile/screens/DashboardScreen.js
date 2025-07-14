// import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, Pressable, Image, ScrollView } from 'dripsy';
// import { Dimensions } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { Calendar } from 'react-native-calendars';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// export default function DashboardScreen() {
//   const navigation = useNavigation();
//   const screenWidth = Dimensions.get('window').width;
//   const insets = useSafeAreaInsets(); // ✅ Safe area insets

//   const [userRole, setUserRole] = useState('');
//   const shifts = ['General (9:30AM - 6PM)', 'Morning (6AM - 3PM)', 'Night (9PM - 6AM)'];
//   const [selectedShift, setSelectedShift] = useState(shifts[0]);

//   const iconSize = Math.floor(screenWidth / 6);
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const getRoleFromToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//           const decoded = jwtDecode(token);
//           setUserRole(decoded?.role || '');
//         }
//       } catch (err) {
//         console.error('❌ Failed to decode token:', err.message);
//       }
//     };
//     getRoleFromToken();
//   }, []);

//   const menuItems = [
//     { title: 'Attendance', screen: 'Attendance', icon: 'calendar-outline' },
//     { title: 'History', screen: 'History', icon: 'time-outline' },
//     { title: 'Reports', screen: 'Reports', icon: 'document-text-outline' },
//     { title: 'Payroll', screen: 'Payroll', icon: 'cash-outline' },
//     { title: 'Notification', screen: 'Notification', icon: 'notifications-outline' },
//     { title: 'Profile', screen: 'Profile', icon: 'person-circle-outline' },
//   ];

//   const quickActions = [
//     { title: 'Apply Leave', icon: 'paper-plane-outline', screen: 'ApplyLeave' },
//     { title: 'Site Instructions', icon: 'newspaper-outline', screen: 'SiteInstruction' },
//     ...(userRole === 'admin'
//       ? [{ title: 'Supervisor Panel', icon: 'person-outline', screen: 'SupervisorHandling' }]
//       : []),
//     { title: 'My Timeline', icon: 'briefcase-outline', screen: 'MyTimeline' },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <View sx={{ flex: 1 }}>
//         {/* Header */}
//         <View sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 22, mb: 12 }}>
//           <Image
//             source={require('../assets/logo.png')}
//             style={{ width: 50, height: 50, position: 'absolute', left: 20 }}
//             resizeMode="contain"
//           />
//           <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>Dashboard</Text>
//         </View>

//         {/* Quick Actions */}
//         <View sx={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', px: 3, mb: 12 }}>
//           {quickActions.map((item, index) => (
//             <Pressable
//               key={index}
//               onPress={() => item.screen && navigation.navigate(item.screen)}
//               sx={{ alignItems: 'center', justifyContent: 'center', width: 60 }}
//             >
//               <Ionicons name={item.icon} size={20} color="#007AFF" />
//               <Text sx={{ fontSize: 9, color: '#007AFF', mt: 1, textAlign: 'center' }}>{item.title}</Text>
//             </Pressable>
//           ))}
//         </View>

//         <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
//           {/* Shift Info */}
//           <Pressable onPress={() => navigation.navigate('ShiftChanges')}>
//             <View
//               sx={{
//                 bg: '#E0F7FA',
//                 borderRadius: 12,
//                 p: 'md',
//                 mb: 'md',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <View>
//                 <Text sx={{ fontSize: 15, fontWeight: 'bold', color: '#00796B' }}>
//                   🕐 Shift: {selectedShift}
//                 </Text>
//                 <Text sx={{ fontSize: 12, color: '#4B5563', mt: 1 }}>Tap to mark attendance</Text>
//               </View>
//             </View>
//           </Pressable>

//           {/* Site Info */}
//           <View
//             sx={{
//               bg: '#E6F0FF',
//               borderRadius: 12,
//               p: 'md',
//               mb: 'md',
//             }}
//           >
//             <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#1D4ED8' }}>📍 Current Site</Text>
//             <Text sx={{ fontSize: 14, color: '#333', mt: 1 }}>Metro Flyover Project, Sector 12</Text>
//           </View>

//           {/* Calendar */}
//           <View sx={{ bg: '#FFF', borderRadius: 12, p: 'md', mb: 'md' }}>
//             <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#1D4ED8', mb: 2 }}>📅 Monthly Calendar</Text>
//             <Calendar
//               current={today}
//               markedDates={{
//                 [today]: {
//                   selected: true,
//                   selectedColor: '#1D4ED8',
//                   selectedTextColor: '#fff',
//                 },
//               }}
//               style={{
//                 borderRadius: 10,
//                 height: 320,
//               }}
//               theme={{
//                 calendarBackground: '#fff',
//                 textSectionTitleColor: '#1F2937',
//                 selectedDayBackgroundColor: '#1D4ED8',
//                 selectedDayTextColor: '#fff',
//                 todayTextColor: '#1D4ED8',
//                 dayTextColor: '#111827',
//                 textDisabledColor: '#D1D5DB',
//                 arrowColor: '#1D4ED8',
//                 monthTextColor: '#1D4ED8',
//                 textMonthFontWeight: 'bold',
//                 textDayFontSize: 14,
//                 textMonthFontSize: 16,
//                 textDayHeaderFontSize: 13,
//               }}
//               onDayPress={(day) => {
//                 console.log('Selected day:', day.dateString);
//               }}
//             />
//           </View>
//         </ScrollView>

//         {/* ✅ Bottom Navigation with Safe Area Padding */}
//         <View
//           sx={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             py: 'sm',
//             px: 'sm',
//             borderTopWidth: 1,
//             borderColor: '#ccc',
//             bg: 'white',
//             position: 'absolute',
//             bottom: 0,
//             width: '100%',
//             paddingBottom: insets.bottom > 20 ? insets.bottom - 45 : 10, // ✅ Responsive padding
//           }}
//         >
//           {menuItems.map((item, index) => (
//             <Pressable
//               key={index}
//               onPress={() => navigation.navigate(item.screen)}
//               sx={{ alignItems: 'center', justifyContent: 'center', width: iconSize }}
//             >
//               <Ionicons name={item.icon} size={22} color="#007AFF" />
//               <Text sx={{ color: '#007AFF', fontSize: 10, textAlign: 'center', mt: 1 }}>{item.title}</Text>
//             </Pressable>
//           ))}
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Image, ScrollView } from 'dripsy';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';
import { apiEndpoints } from '../apiconfig/apiconfig';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const iconSize = Math.floor(screenWidth / 6);

  const [userRole, setUserRole] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const shifts = ['General (9:30AM - 6PM)', 'Morning (6AM - 3PM)', 'Night (9PM - 6AM)'];
  const [selectedShift, setSelectedShift] = useState(shifts[0]);

  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    getRoleFromToken();
    fetchAttendanceHistory();
  }, []);

  const getRoleFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserRole(decoded?.role || '');
      }
    } catch (err) {
      console.error('❌ Failed to decode token:', err.message);
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(apiEndpoints.attendanceHistory, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const timeline = res.data.timeline || [];

      const grouped = {};
      timeline.forEach((entry) => {
        const dateStr = new Date(entry.timestamp).toISOString().split('T')[0];
        if (!grouped[dateStr]) grouped[dateStr] = [];
        grouped[dateStr].push(entry);
      });

      const storedShift = await AsyncStorage.getItem('assignedShiftData');
      const assignedShift = storedShift ? JSON.parse(storedShift) : null;

      const defaultShift = {
        name: 'Morning Shift',
        start_time: '09:30 AM',
        end_time: '06:00 PM',
      };

      const shift = assignedShift?.shift || defaultShift;
      const marked = {};

      // Get last 15 real days (not just from current month)
      const last10Days = Array.from({ length: 10 }, (_, i) =>
        moment().subtract(i, 'days').format('YYYY-MM-DD')
      );

      for (let date of last10Days) {
        const logs = grouped[date] || [];

        if (logs.length === 0) {
          // Absent
          marked[date] = {
            selected: true,
            selectedColor: '#EF4444', // Red
            selectedTextColor: '#fff',
          };
          continue;
        }

        const sortedLogs = logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const clockIn = sortedLogs[0]?.timestamp;
        const shiftStart = moment(`${date} ${shift.start_time}`, 'YYYY-MM-DD hh:mm A').toDate();

        const clockInDate = new Date(clockIn);
        const isLate = clockInDate > shiftStart;

        marked[date] = {
          selected: true,
          selectedColor: isLate ? '#F59E0B' : '#10B981', // Orange or Green
          selectedTextColor: '#fff',
        };
      }

      setMarkedDates(marked);
    } catch (err) {
      console.error('❌ Error fetching attendance history:', err.message);
    }
  };

  const menuItems = [
    { title: 'Attendance', screen: 'Attendance', icon: 'calendar-outline' },
    { title: 'History', screen: 'History', icon: 'time-outline' },
    { title: 'Reports', screen: 'Reports', icon: 'document-text-outline' },
    { title: 'Payroll', screen: 'Payroll', icon: 'cash-outline' },
    { title: 'Notification', screen: 'Notification', icon: 'notifications-outline' },
    { title: 'Profile', screen: 'Profile', icon: 'person-circle-outline' },
  ];

  const quickActions = [
    { title: 'Apply Leave', icon: 'paper-plane-outline', screen: 'ApplyLeave' },
    { title: 'Site Instructions', icon: 'newspaper-outline', screen: 'SiteInstruction' },
    ...(userRole === 'admin'
      ? [{ title: 'Supervisor Panel', icon: 'person-outline', screen: 'SupervisorHandling' }]
      : []),
    { title: 'My Timeline', icon: 'briefcase-outline', screen: 'MyTimeline' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View sx={{ flex: 1 }}>
        {/* Header */}
        <View sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 22, mb: 12 }}>
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 50, height: 50, position: 'absolute', left: 20 }}
            resizeMode="contain"
          />
          <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>Dashboard</Text>
        </View>

        {/* Quick Actions */}
        <View sx={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', px: 3, mb: 12 }}>
          {quickActions.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => item.screen && navigation.navigate(item.screen)}
              sx={{ alignItems: 'center', justifyContent: 'center', width: 60 }}
            >
              <Ionicons name={item.icon} size={20} color="#007AFF" />
              <Text sx={{ fontSize: 9, color: '#007AFF', mt: 1, textAlign: 'center' }}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
          {/* Shift Info */}
          <Pressable onPress={() => navigation.navigate('ShiftChanges')}>
            <View
              sx={{
                bg: '#E0F7FA',
                borderRadius: 12,
                p: 'md',
                mb: 'md',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text sx={{ fontSize: 15, fontWeight: 'bold', color: '#00796B' }}>
                  🕐 Shift: {selectedShift}
                </Text>
                <Text sx={{ fontSize: 12, color: '#4B5563', mt: 1 }}>Tap to mark attendance</Text>
              </View>
            </View>
          </Pressable>

          {/* Site Info */}
          <View
            sx={{
              bg: '#E6F0FF',
              borderRadius: 12,
              p: 'md',
              mb: 'md',
            }}
          >
            <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#1D4ED8' }}>📍 Current Site</Text>
            <Text sx={{ fontSize: 14, color: '#333', mt: 1 }}>Metro Flyover Project, Sector 12</Text>
          </View>

          {/* Calendar */}
          <View sx={{ bg: '#FFF', borderRadius: 12, p: 'md', mb: 'md' }}>
            <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#1D4ED8', mb: 2 }}>
              📅 Monthly Calendar
            </Text>
            
            <Calendar
              current={today}
              markedDates={markedDates}
              style={{ borderRadius: 10, height: 340 }}
              theme={{
                calendarBackground: '#fff',
                textSectionTitleColor: '#1F2937',
                selectedDayTextColor: '#fff',
                todayTextColor: '#1D4ED8',
                dayTextColor: '#111827',
                textDisabledColor: '#D1D5DB',
                arrowColor: '#1D4ED8',
                monthTextColor: '#1D4ED8',
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            py: 'sm',
            px: 'sm',
            borderTopWidth: 1,
            borderColor: '#ccc',
            bg: 'white',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingBottom: insets.bottom > 20 ? insets.bottom - 45 : 10,
          }}
        >
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              sx={{ alignItems: 'center', justifyContent: 'center', width: iconSize }}
            >
              <Ionicons name={item.icon} size={22} color="#007AFF" />
              <Text sx={{ color: '#007AFF', fontSize: 10, textAlign: 'center', mt: 1 }}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
