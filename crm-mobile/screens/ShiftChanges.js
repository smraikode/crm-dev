

import React, { useEffect, useState, useRef } from 'react';
import {
    ScrollView,
    Pressable,
    Animated,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import { Box, Text } from 'dripsy';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiEndpoints } from '../apiconfig/apiconfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function ShiftChanges() {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShift, setSelectedShift] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
 
    const navigation = useNavigation();


    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Unauthorized', 'Token not found');
                return;
            }

            const response = await axios.get(apiEndpoints.getAllShifts, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setShifts(response.data);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Unable to fetch shifts.');
        } finally {
            setLoading(false);
        }
    };

    const handleShiftSelect = (shift) => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
        ]).start();
        setSelectedShift(shift);
    };

    const onStartDateChange = (event, selectedDate) => {
        setShowStartPicker(false);
        if (selectedDate) setStartDate(selectedDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        setShowEndPicker(false);
        if (selectedDate) setEndDate(selectedDate);
    };

    const handleStoreLocally = async () => {
        if (!selectedShift || !startDate || !endDate) {
            Alert.alert('Missing Info', 'Please select shift and both dates.');
            return;
        }

        const shiftAssignment = {
            shift: selectedShift,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };

        await AsyncStorage.setItem('assignedShiftData', JSON.stringify(shiftAssignment));
        Alert.alert('✅ Shift Stored', 'Shift data saved locally and will reflect in History screen.');
        navigation.navigate('Dashboard');
    };

    if (loading) {
        return (
            <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
                <ActivityIndicator size="large" color="#10B981" />
                <Text sx={{ mt: 10, fontSize: 16, color: '#6B7280' }}>Loading shifts...</Text>
            </Box>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60, backgroundColor: '#F9FAFB', flexGrow: 1 }}>
            <Box sx={{ mb: 30 }}>
                <Text sx={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>🔄 Select Your Shift</Text>
                <Text sx={{ fontSize: 15, color: '#6B7280', mt: 2 }}>Choose your preferred working hours and duration</Text>
            </Box>

            {shifts.map((shift) => (
                <Animated.View
                    key={shift.id}
                    style={{ transform: [{ scale: selectedShift?.id === shift.id ? scaleAnim : 1 }], marginBottom: 16 }}
                >
                    <Pressable
                        onPress={() => handleShiftSelect(shift)}
                        style={{
                            backgroundColor: selectedShift?.id === shift.id ? '#D1FAE5' : '#FFFFFF',
                            borderColor: selectedShift?.id === shift.id ? '#10B981' : '#E5E7EB',
                            borderWidth: 2,
                            paddingVertical: 16,
                            paddingHorizontal: 20,
                            borderRadius: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Icon
                            name="time-outline"
                            size={22}
                            color={selectedShift?.id === shift.id ? '#10B981' : '#6B7280'}
                            style={{ marginRight: 12 }}
                        />
                        <Text style={{ fontSize: 16, color: '#111827', fontWeight: '500' }}>
                            {shift.name} ({shift.start_time} - {shift.end_time})
                        </Text>
                    </Pressable>
                </Animated.View>
            ))}

            {selectedShift && (
                <Box sx={{ mt: 30 }}>
                    <Pressable onPress={() => setShowStartPicker(true)}>
                        <Box sx={{ p: 12, borderRadius: 8, bg: '#F3F4F6', borderWidth: 1, borderColor: '#D1D5DB', mb: 10 }}>
                            <Text>📅 Start Date: {moment(startDate).format('LL')}</Text>
                        </Box>
                    </Pressable>

                    <Pressable onPress={() => setShowEndPicker(true)}>
                        <Box sx={{ p: 12, borderRadius: 8, bg: '#F3F4F6', borderWidth: 1, borderColor: '#D1D5DB' }}>
                            <Text>📆 End Date: {endDate ? moment(endDate).format('LL') : 'Select'}</Text>
                        </Box>
                    </Pressable>

                    <Box sx={{ mt: 30 }}>
                        <Pressable
                            onPress={handleStoreLocally}
                            style={{
                                backgroundColor: '#10B981',
                                paddingVertical: 14,
                                borderRadius: 10,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                Store Shift & Dates
                            </Text>
                        </Pressable>
                    </Box>
                </Box>
            )}

            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date()}
                    onChange={onStartDateChange}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={startDate}
                    onChange={onEndDateChange}
                />
            )}
        </ScrollView>
    );
}
