// const LOCAL_URL = "http://localhost:8000/api"; // 🔁 Replace with actual LAN IP, e.g., http://192.168.1.5:8000/api
// const STAGING_URL = "https://stgfastapi.selfsync.ai";
// const PROD_URL = "https://fastapi.selfsync.ai";


const LOCAL_URL = "http://10.0.0.133:8000/api"; // 🔁 Replace with actual LAN IP, e.g., http://192.168.1.5:8000/api


const environments = {
  local: LOCAL_URL,
  // staging: STAGING_URL,
  // production: PROD_URL,
};

const activeEnvironment = environments.local;

const apiEndpoints = {
  login: `${activeEnvironment}/auth/login`,
  register: `${activeEnvironment}/auth/signup`,
  logout: `${activeEnvironment}/auth/logout`,
  myTimeline: `${activeEnvironment}/mytimeline/current-location`,
  myTimelineUser: `${activeEnvironment}/mytimeline/user`,
  searchUsers: `${activeEnvironment}/search/search-users`,
  assignRole: `${activeEnvironment}/permissions/assign-role`,
  myTeamAttendance: `${activeEnvironment}/team/attendance`,
  attendanceHistory: `${activeEnvironment}/attendance/history`,
};

export { activeEnvironment, apiEndpoints };
