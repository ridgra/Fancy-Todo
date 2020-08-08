const baseUrl = 'http://localhost:3000';

$(document).ready(function () {
  // console.log('ready!');
  checkAuth();
});

function checkAuth() {
  if (localStorage.getItem('token')) {
    console.log('token', localStorage.token);
    $('#login-page').hide();
    $('#register-page').hide();
    $('#welcome-page').hide();
    $('#home-page').show();
    $('#btn-logout').show();
    $('#title-page-projects').show();
    showProjects();
  } else {
    console.log('fail');
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
  $('#login-page').show();
  $('#register-page').hide();
}

function showRegisterPage(event) {
  event.preventDefault();
  $('#register-page').show();
  $('#login-page').hide();
}

function doLogin(event) {
  event.preventDefault();
  const email = $('#register-email').val();
  const password = $('#register-password').val();
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      console.log(response);
      localStorage.setItem('token', response.token);
      checkAuth();
      // showHomePage(event);
    })
    .fail((err) => {
      console.log(err);
    });
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
      console.log(response);
      showLoginPage(event);
    })
    .fail((err) => {
      console.log(err);
    });
}

function doLogout(event) {
  event.preventDefault();
  localStorage.clear();
  $('#welcome-page').show();
  checkAuth();
}

// #PROJECTS

function createProject(event) {
  event.preventDefault();
  const title = $('#c_project_title').val();
  const description = $('#c_project_description').val();
  console.log(localStorage.getItem('token'));
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
      console.log(response);
      $('#createProject').modal('toggle');
    })
    .fail((err) => {
      console.log(err);
    });

  // $('#v-project-title').text(a);
  // console.log(title, desc);
}

function showProjects() {
  $('#container-projects').empty();
  const tmp =
`<div id="v-project-title" class="card-header">
  Featured
</div>
<div class="card-body">
  <p id="v-project-desc" class="card-text">This is a wider card with supporting text below as a natural
    lead-in to
    additional
    content. This content is a little bit longer.</p>
  <div class="d-flex justify-content-between align-items-center">
    <button type="button" class="btn btn-sm btn-dark" onclick="showTodosPage(event)">Todos</button>
    <div class="btn-group">
      <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal"
        data-target="#editProject">Edit</button>
      <button type="button" class="btn btn-sm btn-outline-danger"
        onclick="deleteProject(event)">Delete</button>
    </div>
  </div>
</div>`
  
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'get',
    headers: { token: localStorage.getItem('token') },
  })
    .done((response) => {
      console.log(response);
      // $('#createProject').modal('toggle');
      $('#container-projects').append(tmp);
    })
    .fail((err) => {
      console.log(err);
    });
}

function editProjectModal(event) {
  event.preventDefault();
  editProject();
}

function editProject() {
  $('#editProject').modal('toggle');
  const title = $('#e_project_title').val();
  const desc = $('#e_project_description').val();

  console.log(title, desc);
  // $('#v-project-title').text(a);
}

function deleteProject(event) {
  event.preventDefault();
  // console.log('hi');
  // $('#v-project-title').text(a);
}

// #TODOS

function showTodosPage() {
  // event.preventDefault();
  $('#title-page-todos').show();
  $('#welcome-page').hide();
  $('#home-page').hide();
  $('#todos-page').show();
  // $('#v-project-title').text(a);
}

function markAsDone(params) {}

/*

function doRegister(event) {
  event.preventDefault();
  // const email = $('#register-email').val('hiii');
  const email = $('#register-email').val();
  const password = $('#register-password').val();
  console.log(email, password);
  console.log('sdggas');
  $.ajax({
    url: `${URL}/users/register`,
    method: 'POST',
    data: {
      email,
      password,
    }
      .done((result) => {
        // console.log(result);
        console.log(email);
        console.log(password);
        // localStorage.setItem('access_token', result.access_token); //set token di client
        // console.log('berhasil login', result);
      })
      .fail((err) => {
        console.log(err);
      })
      .always(() => {
        $('#email').val('');
        $('#password').val('');
      }),
  });
}

*/
