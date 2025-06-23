// import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useState } from 'react';

// export default function LoginScreen() {
//   const navigation = useNavigation();
//   const [isLogin, setIsLogin] = useState(true);
//   const [registeredUser, setRegisteredUser] = useState(null);
//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleInputChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//     setErrors({ ...errors, [field]: '' });
//   };

//   const validateRegistration = () => {
//     const newErrors = {};

//     if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!form.email.trim()) newErrors.email = 'Email is required';
//     else if (!form.email.includes('@')) newErrors.email = 'Invalid email format';

//     if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
//     else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone number must be 10 digits';

//     if (!form.password.trim()) newErrors.password = 'Password is required';
//     if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
//     else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (isLogin) {
//       // ✅ Simulate success for any login input
//       alert('Login Successful (Test Mode)');
//       navigation.navigate('Dashboard');
//     } else {
//       // 🟩 Registration logic stays the same
//       if (validateRegistration()) {
//         setRegisteredUser({
//           email: form.email,
//           password: form.password,
//           name: `${form.firstName} ${form.lastName}`,
//           phone: form.phone,
//         });
//         alert('Registered Successfully');
//         setIsLogin(true);
//         setForm({
//           firstName: '',
//           lastName: '',
//           email: '',
//           phone: '',
//           password: '',
//           confirmPassword: '',
//         });
//         setErrors({});
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>
//         {isLogin ? 'Login' : 'Register'}
//       </Text>

//       {!isLogin && (
//         <>
//           <TextInput
//             placeholder="First Name"
//             value={form.firstName}
//             onChangeText={(text) => handleInputChange('firstName', text)}
//             style={{
//               borderWidth: 1,
//               marginBottom: 4,
//               padding: 10,
//               borderRadius: 6,
//               borderColor: errors.firstName ? 'red' : '#ccc',
//             }}
//           />
//           {errors.firstName && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.firstName}</Text>}

//           <TextInput
//             placeholder="Last Name"
//             value={form.lastName}
//             onChangeText={(text) => handleInputChange('lastName', text)}
//             style={{
//               borderWidth: 1,
//               marginBottom: 4,
//               padding: 10,
//               borderRadius: 6,
//               borderColor: errors.lastName ? 'red' : '#ccc',
//             }}
//           />
//           {errors.lastName && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.lastName}</Text>}

//           <TextInput
//             placeholder="Phone Number"
//             value={form.phone}
//             keyboardType="phone-pad"
//             onChangeText={(text) => handleInputChange('phone', text)}
//             style={{
//               borderWidth: 1,
//               marginBottom: 4,
//               padding: 10,
//               borderRadius: 6,
//               borderColor: errors.phone ? 'red' : '#ccc',
//             }}
//           />
//           {errors.phone && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.phone}</Text>}
//         </>
//       )}

//       <TextInput
//         placeholder="Email"
//         value={form.email}
//         onChangeText={(text) => handleInputChange('email', text)}
//         keyboardType="email-address"
//         style={{
//           borderWidth: 1,
//           marginBottom: 4,
//           padding: 10,
//           borderRadius: 6,
//           borderColor: errors.email ? 'red' : '#ccc',
//         }}
//       />
//       {errors.email && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.email}</Text>}

//       <TextInput
//         placeholder="Password"
//         value={form.password}
//         onChangeText={(text) => handleInputChange('password', text)}
//         secureTextEntry
//         style={{
//           borderWidth: 1,
//           marginBottom: 4,
//           padding: 10,
//           borderRadius: 6,
//           borderColor: errors.password ? 'red' : '#ccc',
//         }}
//       />
//       {errors.password && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.password}</Text>}

//       {!isLogin && (
//         <>
//           <TextInput
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChangeText={(text) => handleInputChange('confirmPassword', text)}
//             secureTextEntry
//             style={{
//               borderWidth: 1,
//               marginBottom: 4,
//               padding: 10,
//               borderRadius: 6,
//               borderColor: errors.confirmPassword ? 'red' : '#ccc',
//             }}
//           />
//           {errors.confirmPassword && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.confirmPassword}</Text>}
//         </>
//       )}

//       <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} color={isLogin ? 'blue' : 'green'} />

//       <TouchableOpacity
//         onPress={() => {
//           setIsLogin(!isLogin);
//           setErrors({});
//         }}
//         style={{ marginTop: 20, alignSelf: 'center' }}
//       >
//         <Text style={{ color: 'blue' }}>
//           {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

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

  // const handleLogin = async () => {
  //   if (!validateLogin()) return;
  //   const loginPayload = {
  //     email: form.email,
  //     password: form.password
  //   };
  //   console.log('🔐 Login Payload:', loginPayload);

  //   try {
  //     const res = await axios.post(apiEndpoints.login, loginPayload);
  //     console.log('✅ Login Response:', res.data);
  //     Alert.alert('Login successful.');
  //     navigation.navigate('Dashboard', { token: res.data.token });
  //   } catch (err) {
  //     console.log('❌ Login Error:', err.response?.data || err.message);
  //     Alert.alert('Login failed', err.response?.data?.detail || err.message);
  //   }
  // };

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
