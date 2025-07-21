
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;



const apiEndpoints = {


  login: `${BACKEND_URL}/auth/login`,
  register: `${BACKEND_URL}/auth/signup`,
  mytimeline: `${BACKEND_URL}/attendance/mark`,
  searchUsers: `${BACKEND_URL}/search/search-users`,
  assignRole: `${BACKEND_URL}/permissions/assign-role`,
  removeSubordinate: `${BACKEND_URL}/permissions/remove-subordinate`,
  createLead: `${BACKEND_URL}/leads`,
  createTask: `${BACKEND_URL}/tasks/createTask`,
  getMyTasks: `${BACKEND_URL}/tasks/my`,
  updateTaskStatus: `${BACKEND_URL}/tasks/updateStatus`,
  getTeamTasks: `${BACKEND_URL}/tasks/team`,
  publicLead: `${BACKEND_URL}/public-leads`,
  getProperties: `${BACKEND_URL}/properties`,
  sendSMS: `${BACKEND_URL}/msg-service/send-sms`,
  sendWhatsApp: `${BACKEND_URL}/msg-service/send-whatsapp`,
  MyTeamAttendance: `${BACKEND_URL}/attendance/team`,
  getOfficeLocations: `${BACKEND_URL}/user/get-office`,
  getAllOffices: `${BACKEND_URL}/offices`,
  assignOfficeToUser: `${BACKEND_URL}/user/add-office`,
  MyAttendance: `${BACKEND_URL}/attendance/history`,
  getSubordinates: `${BACKEND_URL}/roles/get-subordinates`, 

  //assignLead: `${BACKEND_URL}/leads/assign`,
  //orgTree: `${BACKEND_URL}/org-tree`,


};




export { apiEndpoints };