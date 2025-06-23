import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReportsScreen from '../screens/ReportsScreen';
import PayrollScreen from '../screens/PayrollScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import AttendanceToday from '../screens/AttendanceToday';
import ApplyLeaveScreen from '../screens/ApplyLeaveScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SiteInstructionScreen from '../screens/SiteInstructionScreen';
import SupervisorHandlingScreen from '../screens/SupervisiorScreen/SupervisorHandlingScreen';
import MyTimelineUserScreen from '../screens/MyTimelineUserScreen';


const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="AttendanceToday" component={AttendanceToday} />
      <Stack.Screen name="ApplyLeave" component={ApplyLeaveScreen} />
      <Stack.Screen name="MyTimeline" component={MyTimelineUserScreen} />
      <Stack.Screen name="SiteInstruction" component={SiteInstructionScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Payroll" component={PayrollScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen name="SupervisorHandling" component={SupervisorHandlingScreen} />

    </Stack.Navigator>
  );
}

