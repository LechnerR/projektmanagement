import axios from 'axios';

const BASE_URL = 'https://b0qco5h7cj.execute-api.eu-central-1.amazonaws.com/pm/'

export { getProjects, getProject, getEmployees, getEmployee, getEmployeesPerProject, getEmployeesPerTask,
        getTasksPerProject, getTask, updateProject, updateTask, updateEmployee, deleteProject, deleteEmployee, deleteTask};

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

function updateProject(project) {
  const url = `${BASE_URL}/Project`;
  axios.post(url, project)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err, err.message);
      });
}

function deleteProject(id) {
  const url = `${BASE_URL}/Project?ID=${id}`;
  axios.delete(url)
          .then(response => {
              console.log('Projekt wurde erfolgreich gelöscht', response)
          })
          .catch(error => {
              console.log(error);
          })
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
  const url = `${BASE_URL}/Employee?ProjectTaskID=${taskId}`;
  return axios.get(url).then(response => response.data)
                        .catch(function(err) {
                          console.log(err);
                        });
}

function updateEmployee(employee) {
  const url = `${BASE_URL}/Employee`;
  axios.post(url, employee)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err, err.message);
      });
}

function deleteEmployee(id) {
  const url = `${BASE_URL}/Employee?ID=${id}`;
  axios.delete(url)
          .then(response => {
              console.log('MA wurde erfolgreich gelöscht', response)
          })
          .catch(error => {
              console.log(error);
          })
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

function updateTask(task) {
  const url = `${BASE_URL}/ProjectTask`;
  axios.post(url, task)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err, err.message);
      });
}

function deleteTask(id) {
  const url = `${BASE_URL}/ProjectTask?ID=${id}`;
  axios.delete(url)
          .then(response => {
              console.log('Task wurde erfolgreich gelöscht', response)
          })
          .catch(error => {
              console.log(error);
          })
}
