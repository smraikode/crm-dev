import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validateRegistration = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!form.email.includes('@')) newErrors.email = 'Invalid email format';

    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!form.password.trim()) newErrors.password = 'Password is required';
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (isLogin) {
      // ✅ Simulate success for any login input
      alert('Login Successful (Test Mode)');
      navigation.navigate('Dashboard');
    } else {
      // 🟩 Registration logic stays the same
      if (validateRegistration()) {
        setRegisteredUser({
          email: form.email,
          password: form.password,
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
        });
        alert('Registered Successfully');
        setIsLogin(true);
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>
        {isLogin ? 'Login' : 'Register'}
      </Text>

      {!isLogin && (
        <>
          <TextInput
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            style={{
              borderWidth: 1,
              marginBottom: 4,
              padding: 10,
              borderRadius: 6,
              borderColor: errors.firstName ? 'red' : '#ccc',
            }}
          />
          {errors.firstName && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.firstName}</Text>}

          <TextInput
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            style={{
              borderWidth: 1,
              marginBottom: 4,
              padding: 10,
              borderRadius: 6,
              borderColor: errors.lastName ? 'red' : '#ccc',
            }}
          />
          {errors.lastName && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.lastName}</Text>}

          <TextInput
            placeholder="Phone Number"
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleInputChange('phone', text)}
            style={{
              borderWidth: 1,
              marginBottom: 4,
              padding: 10,
              borderRadius: 6,
              borderColor: errors.phone ? 'red' : '#ccc',
            }}
          />
          {errors.phone && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.phone}</Text>}
        </>
      )}

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          marginBottom: 4,
          padding: 10,
          borderRadius: 6,
          borderColor: errors.email ? 'red' : '#ccc',
        }}
      />
      {errors.email && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 4,
          padding: 10,
          borderRadius: 6,
          borderColor: errors.password ? 'red' : '#ccc',
        }}
      />
      {errors.password && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.password}</Text>}

      {!isLogin && (
        <>
          <TextInput
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            secureTextEntry
            style={{
              borderWidth: 1,
              marginBottom: 4,
              padding: 10,
              borderRadius: 6,
              borderColor: errors.confirmPassword ? 'red' : '#ccc',
            }}
          />
          {errors.confirmPassword && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.confirmPassword}</Text>}
        </>
      )}

      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} color={isLogin ? 'blue' : 'green'} />

      <TouchableOpacity
        onPress={() => {
          setIsLogin(!isLogin);
          setErrors({});
        }}
        style={{ marginTop: 20, alignSelf: 'center' }}
      >
        <Text style={{ color: 'blue' }}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
