import { View, ScrollView, Text } from 'react-native';
import { mockReports } from '../utils/mockData';
import ReportItem from '../components/ReportItem';

export default function ReportsScreen() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Monthly Reports</Text>
      {mockReports.map((report, index) => (
        <ReportItem key={index} report={report} />
      ))}
    </ScrollView>
  );
}
