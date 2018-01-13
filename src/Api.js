import axios from 'axios';

const BASE_URL = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

export { getProjects, getProject, getEmployees, getEmployee, getEmployeesPerProject, getEmployeesPerTask,
        getTasksPerProject, getTask};

function getProjects() {
  const url = `${BASE_URL}/Project`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getProject(id) {
  const url = `${BASE_URL}/Project?ID=${id}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

// kA ob ma des überhaupt brauchen
function getEmployees() {
  const url = `${BASE_URL}/Employee`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getEmployee(id) {
  const url = `${BASE_URL}/Employee?ID=${id}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getEmployeesPerProject(projectId) {
  const url = `${BASE_URL}/Employee?ProjectID=${projectId}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getEmployeesPerTask(taskId) {
  const url = `${BASE_URL}/Employee?TaskID=${taskId}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getTasksPerProject(projectId) {
  const url = `${BASE_URL}/ProjectTask?ProjectID=${projectId}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function getTask(id) {
  const url = `${BASE_URL}/ProjectTask?ID=${id}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}
