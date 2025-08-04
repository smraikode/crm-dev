
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { apiEndpoints } from '../apiconfig/apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateLogin = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRegister = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits';
    if (!form.password.trim()) e.password = 'Password is required';
    if (!form.confirmPassword.trim()) e.confirmPassword = 'Confirm password is required';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords must match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };



  const handleLogin = async () => {
    if (!validateLogin()) return;

    const loginPayload = {
      email: form.email,
      password: form.password
    };

    try {
      const res = await axios.post(apiEndpoints.login, loginPayload);
      const token = res.data.token;

      // ✅ Save token to local storage
      await AsyncStorage.setItem('token', token);

      console.log('✅ Login Response:', res.data);
      Alert.alert('Login successful.');

      navigation.navigate('Dashboard'); // No need to pass token, it's stored
    } catch (err) {
      console.log('❌ Login Error:', err.response?.data || err.message);
      Alert.alert('Login failed', err.response?.data?.detail || err.message);
    }
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;

    const payload = {
      name: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password
    };

    console.log('📝 Register Payload:', payload);

    try {
      const res = await axios.post(apiEndpoints.register, payload);
      console.log('✅ Registration Response:', res.data);
      Alert.alert('Registration successful. You may now log in.');
      setIsLogin(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    } catch (err) {
      console.log('❌ Registration Error:', err.response?.data || err.message);
      Alert.alert('Registration failed', err.response?.data?.detail || err.message);
    }
  };

  const renderInput = (placeholder, field, secure = false, keyboard = 'default') => (
    <View>
      <TextInput
        placeholder={placeholder}
        value={form[field]}
        secureTextEntry={secure}
        keyboardType={keyboard}
        onChangeText={val => handleInputChange(field, val)}
        style={{
          borderWidth: 1,
          marginBottom: 4,
          padding: 10,
          borderRadius: 6,
          borderColor: errors[field] ? 'red' : '#ccc'
        }}
      />
      {errors[field] && <Text style={{ color: 'red', marginBottom: 8 }}>{errors[field]}</Text>}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        {isLogin ? 'Login' : 'Register'}
      </Text>

      {!isLogin && (
        <>
          {renderInput('First Name', 'firstName')}
          {renderInput('Last Name', 'lastName')}
          {renderInput('Phone Number', 'phone', false, 'phone-pad')}
        </>
      )}

      {renderInput('Email', 'email', false, 'email-address')}
      {renderInput('Password', 'password', true)}
      {!isLogin && renderInput('Confirm Password', 'confirmPassword', true)}

      <Button
        title={isLogin ? 'Login' : 'Register'}
        onPress={isLogin ? handleLogin : handleRegister}
        color={isLogin ? 'blue' : 'green'}
      />

      <TouchableOpacity
        onPress={() => {
          setIsLogin(prev => {
            const nextIsLogin = !prev;

            // Reset form values depending on the mode
            setForm(
              nextIsLogin
                ? { email: '', password: '' }
                : {
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: ''
                }
            );
            setErrors({});
            return nextIsLogin;
          });
        }}
        style={{ marginTop: 20, alignSelf: 'center' }}
      >
        <Text style={{ color: 'blue' }}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
