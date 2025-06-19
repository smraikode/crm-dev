import { View, Text } from 'react-native';

export default function LiveLocationScreen() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Live Location</Text>
      <Text>Lat: 19.0760° N</Text>
      <Text>Lng: 72.8777° E</Text>
    </View>
  );
}