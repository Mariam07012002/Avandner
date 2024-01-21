
let add_avand = document.getElementById("add-avand");
let userlist = document.getElementById('userlist-div');
let arr = [];
let storedValue = localStorage.getItem('auth');
let obj = JSON.parse(storedValue);

let storedToken = localStorage.getItem('token');



if (obj.status == 'admin') {
  runforAdmin();
} else if (obj.status == 'user') {
  runforUser();
}
add_avand.addEventListener("click",()=>{
  location.replace("./newavand.html")
})
async function runforAdmin() {
  async function getData() {
    try {
      const resp = await fetch('http://localhost:3000/users');
      const data = await resp.json();
      arr = data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function showUsers() {
    try {
      await getData();
      userlist.innerHTML = '';
      function filterByPrefix(arr, prefix) {
        return arr.filter(item => item.startsWith(prefix));
      }

      function makeavandbox(one_obj) {
        let keys = Object.keys(one_obj);
        let avandnames = filterByPrefix(keys, "avandN");
        let valuesFromAvandNames = avandnames.map(avandName => one_obj[avandName]);

        let obj_item = document.createElement('div');
        obj_item.setAttribute('class', "user-item");
        let username = document.createElement("h3");
        username.innerHTML = one_obj.username + "|";
        let email = document.createElement("h3");
        email.innerHTML = one_obj.email + "|";

        obj_item.append(username, email);
        console.log(one_obj);

        for (let i = 0; i < valuesFromAvandNames.length; i++) {
          let obj_avand = document.createElement('div');
          obj_avand.setAttribute("class", "one-avand");
          let obj_avand_dates = document.createElement('h5');
          obj_avand_dates.innerHTML = "Սկիզբ " + valuesFromAvandNames[i].start_date + "։ Վերջ " + valuesFromAvandNames[i].finish_date;
          let obj_avand_money = document.createElement('h5');
          obj_avand_money.innerHTML = "Ներդրված " + valuesFromAvandNames[i].avandi_gumar + "։ Պետք է ստանա " + valuesFromAvandNames[i].stacvox_gumar;
          obj_avand.append(obj_avand_dates, obj_avand_money);
          obj_item.append(obj_avand);
        }
        userlist.append(obj_item);
      }

      for (let i = 0; i < arr.length; i++) {
        makeavandbox(arr[i]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  showUsers();
}

let one_obj;

function runforUser() {
  async function getData() {
    try {
      const resp = await fetch(`http://localhost:3000/users/${obj.id}`);
      const data = await resp.json();
      one_obj = (data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function showUsers() {
    try {
      await getData();

      function filterByPrefix(arr, prefix) {
        return arr.filter(item => item.startsWith(prefix));
      }

      function makeavandbox(one_obj) {
        let keys = Object.keys(one_obj);
        let avandnames = filterByPrefix(keys, "avandN");
        let valuesFromAvandNames = avandnames.map(avandName => one_obj[avandName]);

        console.log(valuesFromAvandNames);

        let obj_item = document.createElement('div');
        obj_item.setAttribute('class', "user-item");
        let username = document.createElement("h3");
        username.innerHTML = one_obj.username + "|";
        let email = document.createElement("h3");
        email.innerHTML = one_obj.email + "|";

        obj_item.append(username, email);
        console.log(one_obj);

        for (let i = 0; i < valuesFromAvandNames.length; i++) {
          let obj_avand = document.createElement('div');
          obj_avand.setAttribute("class", "one-avand");
          let obj_avand_dates = document.createElement('h5');
          obj_avand_dates.innerHTML = "Սկիզբ " + valuesFromAvandNames[i].start_date + "։ Վերջ " + valuesFromAvandNames[i].finish_date;
          let obj_avand_money = document.createElement('h5');
          obj_avand_money.innerHTML = "Ներդրված " + valuesFromAvandNames[i].avandi_gumar + "։ Պետք է ստանա " + valuesFromAvandNames[i].stacvox_gumar;
          obj_avand.append(obj_avand_dates, obj_avand_money);
          obj_item.append(obj_avand);
        }
        userlist.append(obj_item);
      }

      makeavandbox(one_obj);
    } catch (error) {
      console.error(error);
    }
  }

  showUsers();
}
