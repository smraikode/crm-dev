export const mockAttendanceLogs = [
  {
    day: 'Monday',
    date: 'June 17, 2025',
    clockIn: '10:03 AM',
    clockOut: '6:05 PM',
    effectiveHours: '7h 45m',
    grossHours: '8h 2m',
    status: 'Late',
    lateDuration: '3 min',
    shift: '10:00 AM - 6:00 PM',
  },
  {
    day: 'Sunday',
    date: 'June 16, 2025',
    clockIn: '10:00 AM',
    clockOut: '6:00 PM',
    effectiveHours: '8h',
    grossHours: '8h',
    status: 'On Time',
    shift: '10:00 AM - 6:00 PM',
  },
];


export const mockReports = [
  { date: '2025-06-01', status: 'Present' },
  { date: '2025-06-02', status: 'Absent' },
  { date: '2025-06-03', status: 'Present' },
];

export const mockPayroll = {
  totalDays: 22,
  workedDays: 18,
  perDay: 500,
  totalSalary: 9000,
};

export const mockProfile = {
  name: 'Sreenivas Bandaru',
  role: 'Site Supervisor',
  site: 'Hyderabad Metro Project',
  image: 'https://randomuser.me/api/portraits/men/32.jpg', // sample photo
  language: 'English',
};

