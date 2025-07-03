import MyTeamAttendance from "../pages/Attendance/MyTeamAttendance";

const LOCAL_URL = "http://localhost:8000/api";
// const STAGE_URL = "https://stgfastapi.selfsync.ai";
// const PROD_URL = "https://fastapi.selfsync.ai";

const environments = {
  local: LOCAL_URL,
  // staging: STAGE_URL,
  // prod: PROD_URL,
};

// const activeEnvironment = environments.staging;

const activeEnvironment = environments.local;

const apiEndpoints = {

    login:`${activeEnvironment}/auth/login`,
    register:`${activeEnvironment}/auth/signup`,
    mytimeline:`${activeEnvironment}/mytimeline/current-location`,
    searchUsers: `${activeEnvironment}/search/search-users`,
    assignRole: `${activeEnvironment}/permissions/assign-role`,
    removeSubordinate: `${activeEnvironment}/permissions/remove-subordinate`,
    createLead: `${activeEnvironment}/leads`, 
    //assignLead: `${activeEnvironment}/leads/assign`,
    createTask: `${activeEnvironment}/tasks/createTask`,
    getMyTasks: `${activeEnvironment}/tasks/my`,
    updateTaskStatus: `${activeEnvironment}/tasks/updateStatus`,
    getTeamTasks: `${activeEnvironment}/tasks/team`,
    publicLead: `${activeEnvironment}/public-leads`,
    //orgTree: `${activeEnvironment}/org-tree`,
    getProperties: `${activeEnvironment}/properties`,
    MyTeamAttendance: `${activeEnvironment}/team/attendance`,
    
}

export { activeEnvironment, apiEndpoints };