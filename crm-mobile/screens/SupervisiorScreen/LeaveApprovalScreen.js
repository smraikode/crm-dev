import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'dripsy';

// 🧪 Static mock leave data (Replace with API call in future)
const staticLeaves = [
  {
    id: 101,
    name: 'Raju Pawar',
    role: 'Mason',
    reason: 'Family Emergency',
    fromDate: '2025-06-18',
    toDate: '2025-06-20',
    status: 'Pending',
  },
  {
    id: 102,
    name: 'Salman Shaikh',
    role: 'Labour',
    reason: 'Medical Leave',
    fromDate: '2025-06-19',
    toDate: '2025-06-21',
    status: 'Pending',
  },
];

export default function LeaveApprovalScreen() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    setLeaveRequests(staticLeaves);

    // 🚀 Future: Fetch from API
    /*
    fetch('https://your-api.com/supervisor/leaves')
      .then((res) => res.json())
      .then((data) => setLeaveRequests(data))
      .catch((err) => console.error('❌ Failed to load leaves', err));
    */
  }, []);

  const handleApprove = (id) => {
    alert(`✅ Approved Leave ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`❌ Rejected Leave ID: ${id}`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 7 }}>
      <Text
        sx={{
          fontSize: 22,
          fontWeight: 'bold',
          mb: 10,
          textAlign: 'center',
          color: '#1D4ED8',
        }}
      >
        📄 Leave Approval Requests
      </Text>

      {leaveRequests.map((leave) => (
        <View
          key={leave.id}
          sx={{
            bg: 'white',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            p: 4,
            mb: 6,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}>
            {leave.name} — {leave.role}
          </Text>

          <Text sx={{ fontSize: 14, color: '#374151', mb: 1 }}>
            Reason: {leave.reason}
          </Text>

          <Text sx={{ fontSize: 14, color: '#6B7280' }}>
            From: {leave.fromDate} ➜ To: {leave.toDate}
          </Text>

          <Text
            sx={{
              fontSize: 14,
              fontWeight: '500',
              color: leave.status === 'Pending' ? '#F59E0B' : '#10B981',
              mt: 2,
              mb: 2,
            }}
          >
            Status: {leave.status}
          </Text>

          {/* ✅ Action Buttons */}
          <View sx={{ flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
            <TouchableOpacity
              onPress={() => handleApprove(leave.id)}
              style={{
                backgroundColor: '#10B981',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                flex: 1,
                marginRight: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Approve
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleReject(leave.id)}
              style={{
                backgroundColor: '#EF4444',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                flex: 1,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
