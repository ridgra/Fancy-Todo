const baseUrl = 'http://localhost:3000';

$(document).ready(function () {
  // console.log('ready!');
  showHomePage();
});

function showHomePage() {
  if (localStorage.getItem('token')) {
    $('#login-page').hide();
    $('#register-page').hide();
    $('#welcome-page').hide();
    $('#home-page').show();
    $('#todos-page').hide();
    $('#btn-logout').show();
    $('#title-page-projects').show();
    $('#title-page-todos').hide();
    showProjects();
  } else {
    $('#btn-logout').hide();
    $('#login-page').hide();
    $('#register-page').hide();
    $('#home-page').hide();
    $('#todos-page').hide();
    $('#title-page-projects').hide();
    $('#title-page-todos').hide();
  }
}

function showLoginPage(event) {
  event.preventDefault();
  $('#login-email').val('');
  $('#login-password').val('');
  $('#login-page').show();
  $('#register-page').hide();
}

function showRegisterPage(event) {
  event.preventDefault();
  $('#register-email').val('');
  $('#register-password').val('');
  $('#register-page').show();
  $('#login-page').hide();
}

function createToast(msg) {
  const id = new Date().getTime();
  const content = `<div id="toast-${id}" class="toast shadow-sm rounded-lg" role="alert" data-delay="15000" aria-live="assertive" aria-atomic="true" style="width: 300px; background-color: #d4edda;">
              <div class="toast-body ">
                <span class="mr-auto py-2 text-success">${msg}</span>
                <button onclick="removeToast(${id})" type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span class="text-success" aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>`;
  $('#toast-msg').append(content);
  setTimeout(function () {
    removeToast(id);
  }, 15000);
}

function removeToast(id) {
  $(`#toast-${id}`).remove();
}

function showToast(msg) {
  createToast(msg);
  $('.toast').toast('show');
}

function doLogin(event) {
  event.preventDefault();
  const email = $('#login-email').val();
  const password = $('#login-password').val();
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem('token', response.token);
      $('#login-email').val('');
      $('#login-password').val('');
      showToast('You are successfully logged in');
      showHomePage();
    })
    .fail((err) => {
      const errors = JSON.parse(err.responseText).errors;
      if (errors.email) {
        $('#login-email')
          .popover({ content: errors.email[0], trigger: 'manual' })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
      if (errors.password) {
        $('#login-password')
          .popover({ content: errors.password[0], trigger: 'manual' })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
    });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${baseUrl}/users/googleSignIn`);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      localStorage.token = JSON.parse(xhr.responseText).token;
    }
    showToast('You are successfully logged in');
    showHomePage();
  };
  xhr.send('idtoken=' + id_token);
}

function doRegister(event) {
  event.preventDefault();

  const email = $('#register-email').val();
  const password = $('#register-password').val();
  $.ajax({
    url: `${baseUrl}/users/register`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      $('#register-email').val('');
      $('#register-password').val('');
      showToast('You have registered successfully');
      showLoginPage(event);
    })
    .fail((err) => {
      const errors = JSON.parse(err.responseText).errors;
      if (errors.email) {
        $('#register-email')
          .popover({ content: errors.email[0], trigger: 'manual' })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
      if (errors.password) {
        $('#register-password')
          .popover({ content: errors.password[0], trigger: 'manual' })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
    });
}

function doLogout(event) {
  event.preventDefault();
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear();
  $('#welcome-page').show();
  showHomePage();
}

// #PROJECTS

function createProject(event) {
  event.preventDefault();
  const title = $('#c_project_title').val();
  const description = $('#c_project_description').val();
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'post',
    headers: { token: localStorage.getItem('token') },
    data: {
      title,
      description,
    },
  })
    .done((response) => {
      $('#createProject').modal('toggle');
      showToast(`<strong>${title}</strong> was created successfully`);
      showHomePage();
    })
    .fail((err) => {
      $('#c_project_title')
        .popover({
          content: JSON.parse(err.responseText).errors.title[0],
          trigger: 'manual',
        })
        .popover('show')
        .on('shown.bs.popover', function () {
          const $pop = $(this);
          setTimeout(function () {
            $pop.popover('dispose');
          }, 3000);
        });
      $('#c_project_description')
        .popover({
          content: JSON.parse(err.responseText).errors.title[0],
          trigger: 'manual',
        })
        .popover('show')
        .on('shown.bs.popover', function () {
          const $pop = $(this);
          setTimeout(function () {
            $pop.popover('dispose');
          }, 3000);
        });
    })
    .always(() => {
      $('#c_project_title').val('');
      $('#c_project_description').val('');
    });
}

function showProjects() {
  $('#container-projects').empty();

  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'get',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      response.project.forEach((e) => {
        let content = `<div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <div id="v-project-title" class="card-header">
                  ${e.title}
                </div>
                <div class="card-body">
                  <p id="v-project-desc" class="card-text">${e.description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <button type="button" class="btn btn-sm btn-dark" onclick="showTodosPage(event, ${e.id})">Todos</button>
                    <div class="btn-group">
                      <button onClick="getProjectData(${e.id})" type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal"
                        data-target="#editProject">Edit</button>
                      <button type="button" class="btn btn-sm btn-outline-danger"
                        onclick="deleteProject(event, ${e.id})">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        $('#container-projects').append(content);
      });
    })
    .fail((err) => {
      console.log(err);
    });
}

function getProjectData(id) {
  $.ajax({
    url: `${baseUrl}/projects/${id}`,
    method: 'get',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      $('#e_project_id').val(response.project.id);
      $('#e_project_title').val(response.project.title);
      $('#e_project_description').val(response.project.description);
    })
    .fail((err) => {
      console.log(err);
    });
}

function editProject() {
  const id = $('#e_project_id').val();
  const title = $('#e_project_title').val();
  const description = $('#e_project_description').val();
  $.ajax({
    url: `${baseUrl}/projects/${id}`,
    method: 'put',
    headers: { token: localStorage.getItem('token') },
    data: {
      title,
      description,
    },
  })
    .done((response) => {
      $('#editProject').modal('toggle');
      showToast(
        `<strong>${response.project.title}</strong> was updated successfully`
      );
      showHomePage();
    })
    .fail((err) => {
      if (err.responseJSON.errors.title) {
        $('#e_project_title')
          .popover({
            content: err.responseJSON.errors.title[0],
            trigger: 'manual',
          })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
      if (err.responseJSON.errors.description) {
        $('#e_project_description')
          .popover({
            content: err.responseJSON.errors.description[0],
            trigger: 'manual',
          })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
    });
  ///here
}

function deleteProject(event, id) {
  event.preventDefault();
  $.ajax({
    url: `${baseUrl}/projects/${id}`,
    method: 'delete',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      showToast(
        `<strong>${response.project.title}</strong> was deleted successfully`
      );
      showHomePage();
    })
    .fail((err) => {
      console.log(err);
    });
}

// #TODOS

async function showTodosPage(event, id) {
  event.preventDefault();
  $('#welcome-page').hide();
  $('#home-page').hide();
  $('#title-page-todos').show();
  $('#todos-page').show();
  $('#todo-projectid').val(id);

  const el = await $.ajax({
    url: `${baseUrl}/todo/${id}`,
    method: 'get',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      $('#container-todos').empty();
      response.todo.forEach((e) => {
        const content = `<div class="col-md-4">
  <div class="card mb-4 shadow-sm">
    <div id="v-project-title" class="card-header d-flex justify-content-between">
      <span>
        ${e.title}
      </span>
      <div class="btn-group">
        <button onclick="getTodoData(${
          e.id
        })" type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal"
          data-target="#editTodo" >Edit</button>
        <button type="button" class="btn btn-sm btn-outline-danger"
          onclick="deleteTodo(${e.id}, ${id}, '${e.title}')">Delete</button>
      </div>
    </div>
    <div class="card-body">
      <div class="card mb-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${e.description}</li>
          <li class="list-group-item">${
            !e.status
              ? `<span class="text-danger">Pending</span>`
              : `<span class="text-success">Done</span>`
          }</li>
          <li id=date-${e.id} class="list-group-item">${new Date(
          e.due_date
        ).toDateString()}
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group w-100 container-fluid p-0">
          <button type="button" class="btn btn-sm btn-success" onclick="markAsDone(event, true, ${
            e.id
          }, ${id})">Done</button>
          <button type="button" class="btn btn-sm btn-danger" onclick="markAsDone(event, false, ${
            e.id
          }, ${id})">Pending</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
        $('#container-todos').append(content);
      });
      return response;
    })
    .fail((err) => {
      console.log(err);
    })
    .always(() => {
      $('#todo-title').val('');
      $('#todo-desc').val('');
      $('#todo-date').val('');
    });

  $.ajax({
    type: 'get',
    url: `${baseUrl}/user-projects/${id}`,
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      $('#container-email').empty();
      response.forEach((e) => {
        const tmp = `<div class="container-fluid">
                <div class="card mb-4 shadow-sm">
                  <div id="v-project-title" class="card-header font-weight-bold">
                    ${e}
                  </div>
                </div>
              </div>`;
        $('#container-email').append(tmp);
      });
    })
    .fail((err) => {
      console.log(err);
    });

  await el.todo.forEach((e) => {
    const day = new Date(e.due_date).getDate();
    const month = new Date(e.due_date).getMonth() + 1;
    const year = new Date(e.due_date).getFullYear();
    $.ajax({
      type: 'post',
      url: `${baseUrl}/calendarific`,
      data: {
        day,
        month,
        year,
      },
      headers: { token: localStorage.getItem('token') },
      success(res) {
        const tmp = `<br><small class="font-weight-light text-danger"><i>${res.calendarific}</i></small>`;
        $(`#date-${e.id}`).append(tmp);
      },
    });
  });
}

function createTodo(event) {
  event.preventDefault();
  const title = $('#todo-title').val();
  const description = $('#todo-desc').val();
  const due_date =
    $('#todo-date').val() || new Date().toISOString().substr(0, 10);
  const projectId = $('#todo-projectid').val();

  $.ajax({
    url: `${baseUrl}/todo`,
    method: 'post',
    headers: { token: localStorage.getItem('token') },
    data: {
      title,
      description,
      due_date,
      projectId: projectId,
    },
  })
    .done(() => {
      showToast(`<strong>${title}</strong> was created successfully`);
      showTodosPage(event, projectId);
    })
    .fail((err) => {
      const date = JSON.parse(err.responseText).errors;
      $('#todo-title')
        .popover({
          content: JSON.parse(err.responseText).errors.title[0],
          trigger: 'manual',
        })
        .popover('show')
        .on('shown.bs.popover', function () {
          const $pop = $(this);
          setTimeout(function () {
            $pop.popover('dispose');
          }, 3000);
        });
      if (date.due_date) {
        $('#todo-date')
          .popover({
            content: date.due_date[0],
            trigger: 'manual',
          })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
    })
    .always(() => {
      $('#todo-title').val('');
      $('#todo-desc').val('');
      $('#todo-date').val('');
    });
}

function markAsDone(event, bool, id, projectId) {
  $.ajax({
    url: `${baseUrl}/todo/status/${id}`,
    method: 'put',
    headers: { token: localStorage.getItem('token') },
    data: {
      status: bool,
    },
  })
    .done((response) => {
      showToast(
        `<strong>${response.todo.title}</strong> was set to <strong>${
          bool == true ? 'done' : 'pending'
        }</strong> successfully`
      );
      showTodosPage(event, projectId);
    })
    .fail((err) => {
      console.log(err);
    });
}

function deleteTodo(id, projectId, title) {
  $.ajax({
    url: `${baseUrl}/todo/${id}`,
    method: 'delete',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      showToast(`<strong>${title}</strong> was deleted successfully`);
      showTodosPage(event, projectId);
    })
    .fail((err) => {
      console.log(err);
    });
}

function getTodoData(id) {
  $.ajax({
    url: `${baseUrl}/todo/id/${id}`,
    method: 'get',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      $('#e_todo_id').val(id);
      $('#e_todo_title').val(response.todo.title);
      $('#e_todo_description').val(response.todo.description);
      $('#e_todo_date').val(response.todo.due_date);
      $('#e_todo_projectid').val(response.todo.projectId);
    })
    .fail((err) => {
      console.log(err);
    });
}

function editTodo(event) {
  const projectId = $('#e_todo_projectid').val();
  const id = $('#e_todo_id').val();
  const title = $('#e_todo_title').val();
  const description = $('#e_todo_description').val();
  const due_date = $('#e_todo_date').val();
  $.ajax({
    url: `${baseUrl}/todo/${id}`,
    method: 'put',
    headers: { token: localStorage.getItem('token') },
    data: {
      title,
      description,
      due_date,
    },
  })
    .done(() => {
      $('#editTodo').modal('toggle');
      showToast(`<strong>${title}</strong> was updated successfully`);
      showTodosPage(event, projectId);
    })
    .fail((err) => {
      if (err.responseJSON.errors.title) {
        $('#e_todo_title')
          .popover({
            content: err.responseJSON.errors.title[0],
            trigger: 'manual',
          })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
      if (err.responseJSON.errors.due_date) {
        $('#e_todo_date')
          .popover({
            content: err.responseJSON.errors.due_date[0],
            trigger: 'manual',
          })
          .popover('show')
          .on('shown.bs.popover', function () {
            const $pop = $(this);
            setTimeout(function () {
              $pop.popover('dispose');
            }, 3000);
          });
      }
    })
}

async function sendInvitation(event) {
  event.preventDefault();
  try {
    const projectId = $('#todo-projectid').val();
    const email = $('#member-email').val();

    if (!email) {
      $('#member-email')
        .popover({ content: 'Email is required', trigger: 'manual' })
        .popover('show')
        .on('shown.bs.popover', function () {
          const $pop = $(this);
          setTimeout(function () {
            $pop.popover('dispose');
          }, 3000);
        });
      return;
    }

    const userId = await $.ajax({
      url: `${baseUrl}/users`,
      method: 'post',
      headers: { token: localStorage.getItem('token') },
      data: {
        email,
      },
      error(err) {
        throw { msg: err };
      },
      complete: () => $('#member-email').val(''),
    });

    if (!userId.user) throw { msg: 'Email not found' };

    const findUser = await $.ajax({
      type: 'get',
      url: `${baseUrl}/user-projects?projectId=${projectId}&userId=${userId.user}`,
      headers: { token: localStorage.getItem('token') },
    });

    if (findUser.userProjects)
      throw { msg: 'You have invited this user already' };

    await $.ajax({
      url: `${baseUrl}/user-projects`,
      type: 'post',
      headers: { token: localStorage.getItem('token') },
      data: {
        projectId,
        userId: userId.user,
      },
      success() {
        showToast(`<strong>${email}</strong> was invited successfully`);
      },
    });
    showTodosPage(event, projectId);
  } catch (err) {
    showToast(err.msg);
  }
}
