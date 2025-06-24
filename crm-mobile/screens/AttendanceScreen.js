

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Box, Text } from 'dripsy';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoints } from '../apiconfig/apiconfig';

// 🏗️ Construction site GPS (change if needed)
const siteLocation = {
  latitude: 17.4221891,
  longitude: 78.3819498,
};

// 📏 Helper to get distance between two coordinates
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function AttendanceScreen() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  const fetchToken = async () => {
    const token = await AsyncStorage.getItem('token'); // replace with your key if different
    return token;
  };

  const sendLocationToBackend = async (coords, status = 'update') => {
    try {
      const token = await fetchToken();
      if (!token) {
        console.warn('⚠️ No token found.');
        return;
      }

      const payload = {
        status,
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: new Date().toISOString(),
      };

      await axios.post(apiEndpoints.myTimeline, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`📡 Sent [${status}] to backend:`, payload);
    } catch (err) {
      console.error('❌ Failed to send location:', err.message);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);
      console.log('📍 Current Location:', coords);
    } catch (err) {
      console.error('❌ Location error:', err);
      setError('Unable to fetch location');
    } finally {
      setLoading(false);
    }
  };

  const handleClockIn = async () => {
    const distance = getDistanceFromLatLonInMeters(
      location.latitude,
      location.longitude,
      siteLocation.latitude,
      siteLocation.longitude
    );

    if (distance <= 1000) {
      setIsClockedIn(true);
      Alert.alert('✅ Clock In', 'You have clocked in successfully');
      await sendLocationToBackend(location, 'clockin');

      intervalRef.current = setInterval(async () => {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setLocation(coords);

        const dist = getDistanceFromLatLonInMeters(
          coords.latitude,
          coords.longitude,
          siteLocation.latitude,
          siteLocation.longitude
        );

        if (dist > 1000) {
          setIsClockedIn(false);
          await sendLocationToBackend(coords, 'auto-clockout');
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          Alert.alert('⚠️ Auto Clock-Out', 'You moved out of site (100m limit).');
        } else {
          await sendLocationToBackend(coords, 'update');
        }
      }, 60000); // every 60 sec
    } else {
      Alert.alert('❌ Too Far', `You are ${Math.round(distance)}m away from the site.`);
    }
  };

  const handleClockOut = async () => {
    setIsClockedIn(false);
    await sendLocationToBackend(location, 'clockout');
    Alert.alert('📤 Clock Out', 'You have successfully clocked out.');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const hasLocation = location.latitude && location.longitude;
  const distanceFromSite = hasLocation
    ? Math.round(
        getDistanceFromLatLonInMeters(
          location.latitude,
          location.longitude,
          siteLocation.latitude,
          siteLocation.longitude
        )
      )
    : null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Box sx={{ mt: 22, mb: 12 }}>
        <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#007AFF',ml:25 }}>
          📍 Mark Your Attendance
        </Text>
        <Text sx={{ fontSize: 14, color: 'grey' ,ml:78}}>
          GPS-based location validation
        </Text>
      </Box>

      {error ? (
        <Text sx={{ color: 'red', mb: 12 }}>{error}</Text>
      ) : (
        <Box sx={{ mb: 12 }}>
          <Text>Latitude: {location.latitude ?? 'N/A'}</Text>
          <Text>Longitude: {location.longitude ?? 'N/A'}</Text>
          {distanceFromSite !== null && (
            <Text>📏 Distance from site: {distanceFromSite} meters</Text>
          )}
          {loading && <Text>📡 Locating...</Text>}
        </Box>
      )}

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
            height: 500,
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
          <Marker coordinate={siteLocation} title="Site" pinColor="red" />
        </MapView>
      ) : (
        <Text>⏳ Waiting for GPS...</Text>
      )}
    </ScrollView>
  );
}
