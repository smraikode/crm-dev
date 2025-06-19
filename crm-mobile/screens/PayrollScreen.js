import { View, Text } from 'react-native';
import { mockPayroll } from '../utils/mockData';
import PayrollSummary from '../components/PayrollSummary';

export default function PayrollScreen() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Payroll Summary</Text>
      <PayrollSummary payroll={mockPayroll} />
    </View>
  );
}
