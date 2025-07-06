// apiconfig.js
import { LOCAL_API_URL } from '@env';

const activeEnvironment = LOCAL_API_URL;

const apiEndpoints = {
  login: `${activeEnvironment}/auth/login`,
  register: `${activeEnvironment}/auth/signup`,
  logout: `${activeEnvironment}/auth/logout`,
  myTimeline: `${activeEnvironment}/attendance/mark`,
  myTimelineUser: `${activeEnvironment}/attendance/location-check`,
  searchUsers: `${activeEnvironment}/search/search-users`,
  assignRole: `${activeEnvironment}/permissions/assign-role`,
  myTeamAttendance: `${activeEnvironment}/team/attendance`,
  attendanceHistory: `${activeEnvironment}/attendance/history`,
  applyLeave: `${activeEnvironment}/leave/apply`,
  getOfficeLocations: `${activeEnvironment}/user/get-office`,
};

export { activeEnvironment, apiEndpoints };
