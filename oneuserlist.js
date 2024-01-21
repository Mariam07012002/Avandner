// uselirst.js
let userlist = document.getElementById('userlist-div');
let arr = [];

async function getData() {
  try {
    const resp = await fetch('http://localhost:3000/users');
    const data = await resp.json();
    arr.push(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function showUsers() {
  try {
    await getData(); 
    userlist.innerHTML = JSON.stringify(arr);
    console.log(arr);
  } catch (error) {
    console.error(error);
  }
}

showUsers();
