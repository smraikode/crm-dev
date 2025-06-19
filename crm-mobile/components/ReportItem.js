import { View, Text } from 'react-native';

export default function ReportItem({ report }) {
  return (
    <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
      <Text>Date: {report.date}</Text>
      <Text>Status: {report.status}</Text>
    </View>
  );
}