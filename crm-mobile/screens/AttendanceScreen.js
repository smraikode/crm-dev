
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
// import * as Location from 'expo-location';
// import { Box, Text } from 'dripsy';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { apiEndpoints } from '../apiconfig/apiconfig';
// import { second } from '@env';


// const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
//   const toRad = (val) => (val * Math.PI) / 180;
//   const R = 6371000;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function AttendanceScreen() {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [siteLocation, setSiteLocation] = useState(null);
//   const [error, setError] = useState('');
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [distance, setDistance] = useState(null);
//   const intervalRef = useRef(null);

//   const fetchToken = async () => await AsyncStorage.getItem('token');

//   const fetchSiteLocation = async () => {
//     try {
//       const token = await fetchToken();
//       if (!token) {
//         setError('Token missing');
//         return;
//       }

//       const res = await axios.get(apiEndpoints.getOfficeLocations, {
//         headers: { Authorization: `Bearer ${token}` },
//         validateStatus: () => true, // allow handling of 404 manually
//       });

//       if (res.status === 404 || !res.data.office_details) {
//         setSiteLocation(null);
//         setError('');
//         Alert.alert(
//           '❌ No Site Assigned',
//           'You have not been assigned a site yet. Please contact your admin.'
//         );
//         return;
//       }

//       const office = res.data.office_details;

//       if (!office.latitude || !office.longitude) {
//         setSiteLocation(null);
//         setError('');
//         Alert.alert(
//           '❌ No Site Assigned',
//           'Your assigned site location is invalid. Please contact your admin.'
//         );
//         return;
//       }

//       setSiteLocation({
//         latitude: office.latitude,
//         longitude: office.longitude,
//         name: office.name,
//       });

//       console.log('🏢 Site Location:', office);
//     } catch (err) {
//       console.error('❌ Failed to fetch site:', err.message);
//       setError('Could not connect to server');
//     }
//   };

//   const fetchCurrentLocation = async (status = null) => {
//     try {
//       const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
//       if (locStatus !== 'granted') {
//         setError('Location permission denied.');
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Highest,
//       });

//       const coords = {
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//       };

//       setLocation(coords);

//       if (siteLocation) {
//         const dist = getDistanceFromLatLonInMeters(
//           coords.latitude,
//           coords.longitude,
//           siteLocation.latitude,
//           siteLocation.longitude
//         );
//         setDistance(Math.round(dist));

//         if (status) {
//           await sendLocationToBackend(coords, status);
//         }
//       }
//     } catch (err) {
//       console.error('❌ Location error:', err.message);
//       Alert.alert(
//         '📍 Location Not Available',
//         'Unable to fetch your GPS location. Please check permissions or try again.'
//       );
//       setError('');
//     }
//   };

//   const sendLocationToBackend = useCallback(async (coords, status) => {
//     try {
//       const token = await fetchToken();
//       if (!token) return;

//       const payload = {
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         status,
//         timestamp: new Date().toISOString(),
//       };

//       await axios.post(apiEndpoints.myTimeline, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(`📡 Sent [${status}] to backend`, payload);
//     } catch (err) {
//       console.error('❌ Error sending location:', err.message);
//     }
//   }, []);

//   const handleClockIn = async () => {
//     if (!siteLocation) return Alert.alert('⚠️ Error', 'Site location not loaded');
//     if (!location.latitude) return Alert.alert('⚠️ Error', 'Current location not available');

//     const dist = getDistanceFromLatLonInMeters(
//       location.latitude,
//       location.longitude,
//       siteLocation.latitude,
//       siteLocation.longitude
//     );

//     if (dist <= 1500) {
//       setIsClockedIn(true);
//       await sendLocationToBackend(location, 'clockin');
//       Alert.alert('✅ Clocked in', 'You have successfully clocked in.');


//       intervalRef.current = setInterval(async () => {
//         const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
//         const coords = {
//           latitude: loc.coords.latitude,
//           longitude: loc.coords.longitude,
//         };

//         setLocation(coords);

//         const dist = getDistanceFromLatLonInMeters(
//           coords.latitude,
//           coords.longitude,
//           siteLocation.latitude,
//           siteLocation.longitude
//         );
//         setDistance(Math.round(dist));

//         if (dist > 1500) {
//           setIsClockedIn(false);
//           await sendLocationToBackend(coords, 'auto-clockout');
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//           Alert.alert('⚠️ Auto Clock-Out', 'You moved out of range.');
//         } else {
//           await sendLocationToBackend(coords, 'update');
//         }
//       }, second);
//     } else {
//       Alert.alert('❌ Too Far', `You are ${Math.round(dist)}m away. Required: ≤ 1500m`);
//     }
//   };

//   const handleClockOut = async () => {
//     setIsClockedIn(false);
//     await sendLocationToBackend(location, 'clockout');
//     Alert.alert('✅ Clocked Out', 'You have successfully clocked out.');
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchSiteLocation();
//       await fetchCurrentLocation();
//     })();

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   const hasLocation = location.latitude && location.longitude;
//   const hasSite = siteLocation?.latitude && siteLocation?.longitude;

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Box sx={{ mt: 22, mb: 12 }}>
//         <Text sx={{ fontSize: 22, fontWeight: 'bold', color: '#007AFF' }}>
//           📍 My Timeline
//         </Text>
//         <Text sx={{ fontSize: 14, color: 'grey' }}>
//           Track your attendance timeline
//         </Text>
//         <Text sx={{ fontSize: 14, color: 'black' }}>
//           Office Name: {siteLocation ? siteLocation.name : 'N/A'}
//         </Text>
//       </Box>

//       {error ? <Text sx={{ color: 'red', mb: 12 }}>{error}</Text> : null}

//       <Box sx={{ mb: 12 }}>
//         <Text>Latitude: {location.latitude ?? 'N/A'}</Text>
//         <Text>Longitude: {location.longitude ?? 'N/A'}</Text>
//         {distance !== null && <Text>📏 Distance: {distance} meters</Text>}
//       </Box>

//       <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 20 }}>
//         <TouchableOpacity
//           onPress={handleClockIn}
//           disabled={isClockedIn}
//           style={{
//             backgroundColor: '#10B981',
//             paddingVertical: 12,
//             paddingHorizontal: 20,
//             borderRadius: 8,
//             opacity: isClockedIn ? 0.5 : 1,
//           }}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Clock In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleClockOut}
//           disabled={!isClockedIn}
//           style={{
//             backgroundColor: '#EF4444',
//             paddingVertical: 12,
//             paddingHorizontal: 20,
//             borderRadius: 8,
//             opacity: !isClockedIn ? 0.5 : 1,
//           }}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Clock Out</Text>
//         </TouchableOpacity>
//       </Box>

//       {hasLocation && hasSite ? (
//         <MapView
//           style={{
//             width: Dimensions.get('window').width - 32,
//             height: 400,
//             borderRadius: 16,
//           }}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} title="You" pinColor="green" />
//           <Marker coordinate={siteLocation} title="Site" pinColor="red" />
//         </MapView>
//       ) : (
//         <Text>⏳ Waiting for GPS or Site Location...</Text>
//       )}
//     </ScrollView>
//   );
// }



import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Box, Text } from 'dripsy';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoints } from '../apiconfig/apiconfig';
import { second } from '@env';

export default function AttendanceScreen() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const intervalRef = useRef(null);
  const locationMonitorRef = useRef(null);
  const wasLocationOff = useRef(false); // to track location off → on

  const fetchToken = async () => await AsyncStorage.getItem('token');

  const checkLocationServices = async () => {
    const isEnabled = await Location.hasServicesEnabledAsync();
    return isEnabled;
  };

  const fetchCurrentLocation = async () => {
    try {
      const enabled = await checkLocationServices();
      if (!enabled) {
        setError('⚠️ Location is OFF. Please turn on your location.');
        return null;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('⚠️ Please enable location permission');
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      setError('');
      setLocation(coords);
      return coords;
    } catch (err) {
      console.error('❌ Location error:', err.message);
      Alert.alert('📍 Location Error', 'Unable to fetch location. Check permissions.');
      return null;
    }
  };

  const sendLocationToBackend = useCallback(async (coords, status) => {
    try {
      const token = await fetchToken();
      if (!token) {
        console.warn('Token missing');
        return;
      }

      const payload = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        status,
        timestamp: new Date().toISOString(),
      };

      const res = await axios.post(apiEndpoints.myTimeline, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status >= 200 && res.status < 300) {
        console.log(`📡 Sent [${status}]`, payload);
      } else {
        console.error(`❌ Failed to send [${status}]`, res.status, res.data);
      }
    } catch (err) {
      console.error('❌ Error sending location:', err.message);
    }
  }, []);

  const startSendingLocation = () => {
    intervalRef.current = setInterval(async () => {
      const isOn = await checkLocationServices();
      if (!isOn) {
        if (!wasLocationOff.current) {
          Alert.alert('⚠️ Location Off', 'Please turn on your location to mark attendance.');
          wasLocationOff.current = true;
        }
        return; // Skip sending location
      }

      const liveCoords = await fetchCurrentLocation();
      if (liveCoords) {
        if (wasLocationOff.current) {
          Alert.alert('✅ Location On', 'Thank you for turning on your location. Attendance is now resumed.');
          wasLocationOff.current = false;
        }
        await sendLocationToBackend(liveCoords, 'update');
      }
    }, Number(second));
  };

  const handleClockIn = async () => {
    const isOn = await checkLocationServices();
    if (!isOn) {
      Alert.alert('⚠️ Location Required', 'Turn on location before clocking in.');
      return;
    }

    const coords = await fetchCurrentLocation();
    if (!coords) return;

    setIsClockedIn(true);
    Alert.alert('✅ Clocked In', 'You are now clocked in.');
    await sendLocationToBackend(coords, 'clockin');
    startSendingLocation();
  };

  const handleClockOut = async () => {
    const isOn = await checkLocationServices();
    if (!isOn) {
      Alert.alert('⚠️ Location Required', 'Turn on location before clocking out.');
      return;
    }

    const coords = await fetchCurrentLocation();
    if (!coords) return;

    setIsClockedIn(false);
    Alert.alert('✅ Clocked Out', 'You have successfully clocked out.');
    await sendLocationToBackend(coords, 'clockout');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Initial location fetch
    fetchCurrentLocation();

    // Monitor location ON/OFF status every second
    locationMonitorRef.current = setInterval(async () => {
      const isOn = await checkLocationServices();
      if (!isOn) {
        setError('⚠️ Location is OFF. Please turn on your location.');
      } else {
        setError('');
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (locationMonitorRef.current) clearInterval(locationMonitorRef.current);
    };
  }, []);

  const hasLocation = location.latitude && location.longitude;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Box sx={{ mt: 22, mb: 12 }}>
        <Text sx={{ fontSize: 22, fontWeight: 'bold', color: '#007AFF' }}>
          📍 My Timeline
        </Text>
        <Text sx={{ fontSize: 14, color: 'grey' }}>
          Track your attendance in real-time
        </Text>
      </Box>

      {error ? <Text sx={{ color: 'red', mb: 12 }}>{error}</Text> : null}

      <Box sx={{ mb: 12 }}>
        <Text>Latitude: {location.latitude ?? 'N/A'}</Text>
        <Text>Longitude: {location.longitude ?? 'N/A'}</Text>
      </Box>

      <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 20 }}>
        <TouchableOpacity
          onPress={handleClockIn}
          disabled={isClockedIn}
          style={{
            backgroundColor: '#10B981',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            opacity: isClockedIn ? 0.5 : 1,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Clock In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClockOut}
          disabled={!isClockedIn}
          style={{
            backgroundColor: '#EF4444',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            opacity: !isClockedIn ? 0.5 : 1,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Clock Out</Text>
        </TouchableOpacity>
      </Box>

      {hasLocation ? (
        <MapView
          style={{
            width: Dimensions.get('window').width - 32,
            height: 400,
            borderRadius: 16,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="You" pinColor="green" />
        </MapView>
      ) : (
        <Text>⏳ Waiting for GPS location...</Text>
      )}
    </ScrollView>
  );
}
