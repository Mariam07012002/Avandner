async function getData() {
    try {
      const resp = await fetch('http://localhost:3000/users');
      const data = await resp.json();
      showUsers(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  getData();


function showUsers(arr) {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit-id');
  
    let logins_array = arr.map((item) => item["login"]);
    function checkLogin() {
        let auth = [];
    
        if (logins_array.includes(username.value)) {
            let targetObj = arr.find((item) => item.login === username.value);
    
            if (targetObj && targetObj.password === password.value) {
                alert("Correct username and password");
                auth[0] = true;
    
                // Check if the user is an admin
                if (targetObj.status === "admin") {
                    auth[1] = 'admin';
                    auth[2] = targetObj.id
                  
                } else {
                    auth[1] = 'user';
                    auth[2] = targetObj.id
                }
            } else {
                alert("Incorrect password");
                auth[0] = false;
            }
        } else {
            alert('Non-valid username, please try again');
            auth[0] = false;
        }
     
        return auth;
    }
    
    let isOK;
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        isOK =  checkLogin();
        localStorage.setItem('auth', JSON.stringify({
            status: isOK[1],
            id:isOK[2]
        }));
        if(isOK[0]) {
            function generateRandom4DigitNumber() {
                return Math.floor(1000 + Math.random() * 9000);
            }
            let rand = generateRandom4DigitNumber();
            localStorage.setItem('token', JSON.stringify({
                token:rand
            }));
            redirect();
        }
    });
    function redirect() {
        location.replace("./userlist.html")
    }
    
    
}
