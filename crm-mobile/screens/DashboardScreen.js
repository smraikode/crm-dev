// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, Pressable, Image, ScrollView } from 'dripsy';
// import { Dimensions } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function DashboardScreen() {
//   const navigation = useNavigation();
//   const screenWidth = Dimensions.get('window').width;


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
//     { title: 'Supervisor Panel', icon: 'person-outline', screen: 'SupervisorHandling' },
//     { title: 'My Timeline', icon: 'briefcase-outline', screen: 'MyTimeline' },
//   ];

//   const shifts = ['General (9AM - 6PM)', 'Morning (6AM - 3PM)', 'Night (9PM - 6AM)'];
//   const [selectedShift, setSelectedShift] = useState(shifts[0]);

//   const iconSize = Math.floor(screenWidth / menuItems.length) - 10;

//   return (
//     <View sx={{ flex: 1, bg: 'white' }}>
//       {/* Header */}
//       <View sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 40, mb: 20 }}>
//         <Image
//           source={require('../assets/logo.png')}
//           style={{ width: 50, height: 50, position: 'absolute', left: 20 }}
//           resizeMode="contain"
//         />
//         <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>Dashboard</Text>
//       </View>

//       {/* Quick Actions */}
//       <View
//         sx={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           alignItems: 'center',
//           px: 3,
//           mb: 12,
//         }}
//       >
//         {quickActions.map((item, index) => (
//           <Pressable
//             key={index}
//             onPress={() => item.screen && navigation.navigate(item.screen)}
//             sx={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: 60,
//             }}
//           >
//             <Ionicons name={item.icon} size={20} color="#007AFF" />
//             <Text sx={{ fontSize: 9, color: '#007AFF', mt: 1, textAlign: 'center' }}>{item.title}</Text>
//           </Pressable>
//         ))}
//       </View>

//       {/* Scrollable content */}
//       <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
//         {/* Shift Card */}
//         <Pressable onPress={() => navigation.navigate('AttendanceToday')}>
//           <View
//             sx={{
//               bg: '#E0F7FA',
//               borderRadius: 12,
//               p: 'md',
//               mb: 'md',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//           >
//             <View>
//               <Text sx={{ fontSize: 15, fontWeight: 'bold', color: '#00796B' }}>
//                 🕐 Shift: {selectedShift}
//               </Text>
//               <Text sx={{ fontSize: 12, color: '#4B5563', mt: 1 }}>Tap to mark attendance</Text>
//             </View>
//           </View>
//         </Pressable>

//         {/* Site Info */}
//         <View
//           sx={{
//             bg: '#FFF3E0',
//             borderRadius: 12,
//             p: 'md',
//             mb: 'md',
//           }}
//         >
//           <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#EF6C00' }}>📍 Current Site</Text>
//           <Text sx={{ fontSize: 14, color: '#333', mt: 1 }}>Metro Flyover Project, Sector 12</Text>
//         </View>

//         {/* Task Summary */}
//         <View
//           sx={{
//             bg: '#E8F5E9',
//             borderRadius: 12,
//             p: 'md',
//             mb: 'md',
//           }}
//         >
//           <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#388E3C' }}>📋 Today’s Tasks</Text>
//           <Text sx={{ fontSize: 13, color: '#4CAF50', mt: 1 }}>✅ Mark concrete area</Text>
//           <Text sx={{ fontSize: 13, color: '#4CAF50' }}>🔩 Weld steel beams</Text>
//           <Text sx={{ fontSize: 13, color: '#4CAF50' }}>🧼 Safety briefing with supervisor</Text>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View
//         sx={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           alignItems: 'center',
//           py: 'sm',
//           px: 'sm',
//           borderTopWidth: 1,
//           borderColor: '#ccc',
//           bg: 'white',
//           position: 'absolute',
//           bottom: 0,
//           width: '100%',
//         }}
//       >
//         {menuItems.map((item, index) => (
//           <Pressable
//             key={index}
//             onPress={() => navigation.navigate(item.screen)}
//             sx={{ alignItems: 'center', justifyContent: 'center', width: iconSize }}
//           >
//             <Ionicons name={item.icon} size={22} color="#007AFF" />
//             <Text sx={{ color: '#007AFF', fontSize: 10, textAlign: 'center', mt: 1 }}>{item.title}</Text>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Image, ScrollView } from 'dripsy';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [userRole, setUserRole] = useState('');
  const shifts = ['General (9AM - 6PM)', 'Morning (6AM - 3PM)', 'Night (9PM - 6AM)'];
  const [selectedShift, setSelectedShift] = useState(shifts[0]);

  const iconSize = Math.floor(screenWidth / 6); // adjust for number of bottom icons

  useEffect(() => {
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
    getRoleFromToken();
  }, []);

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
    <View sx={{ flex: 1, bg: 'white' }}>
      {/* Header */}
      <View sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 40, mb: 20 }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 50, height: 50, position: 'absolute', left: 20 }}
          resizeMode="contain"
        />
        <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>Dashboard</Text>
      </View>

      {/* Quick Actions */}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          px: 3,
          mb: 12,
        }}
      >
        {quickActions.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => item.screen && navigation.navigate(item.screen)}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
            }}
          >
            <Ionicons name={item.icon} size={20} color="#007AFF" />
            <Text sx={{ fontSize: 9, color: '#007AFF', mt: 1, textAlign: 'center' }}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
        {/* Shift Card */}
        <Pressable onPress={() => navigation.navigate('AttendanceToday')}>
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
            bg: '#FFF3E0',
            borderRadius: 12,
            p: 'md',
            mb: 'md',
          }}
        >
          <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#EF6C00' }}>📍 Current Site</Text>
          <Text sx={{ fontSize: 14, color: '#333', mt: 1 }}>Metro Flyover Project, Sector 12</Text>
        </View>

        {/* Task Summary */}
        <View
          sx={{
            bg: '#E8F5E9',
            borderRadius: 12,
            p: 'md',
            mb: 'md',
          }}
        >
          <Text sx={{ fontSize: 16, fontWeight: 'bold', color: '#388E3C' }}>📋 Today’s Tasks</Text>
          <Text sx={{ fontSize: 13, color: '#4CAF50', mt: 1 }}>✅ Mark concrete area</Text>
          <Text sx={{ fontSize: 13, color: '#4CAF50' }}>🔩 Weld steel beams</Text>
          <Text sx={{ fontSize: 13, color: '#4CAF50' }}>🧼 Safety briefing with supervisor</Text>
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
  );
}
