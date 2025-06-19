import { View, Text } from 'react-native';

export default function PayrollSummary({ payroll }) {
  return (
    <View style={{ padding: 12, borderWidth: 1 }}>
      <Text>Total Days: {payroll.totalDays}</Text>
      <Text>Worked Days: {payroll.workedDays}</Text>
      <Text>Per Day Wage: ₹{payroll.perDay}</Text>
      <Text>Total Salary: ₹{payroll.totalSalary}</Text>
    </View>
  );
}