

let firstname = document.getElementById('firstName');
let lastname = document.getElementById('lastName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let button = document.getElementById("signup-button-id");

class User {
  constructor(id, username, login, password, email) {
    this.id = id;
    this.username = username;
    this.login = login;
    this.password = password;
    this.email = email;
  }
}

let newuserlist = [];
let user;

button.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  let new_username = `${firstname.value} ${lastname.value}`;
  let login = firstname.value+""+lastname.value;
  let id = new Date().getTime().toString();

  user = new User(id, new_username, login, password.value, email.value);
  submitForm(user);
});

function submitForm(data) {
  const url = 'http://localhost:3000/users'; // Your server endpoint
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(updatedData => {
      console.log('Updated data from server:', updatedData);
      // You can update your UI or perform additional actions with the updated data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
