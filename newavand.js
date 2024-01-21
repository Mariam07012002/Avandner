let hatkacvac_gumar = document.getElementById("gumar");
let m = document.getElementById('m-input');
let day = document.getElementById('days-input');
let start_date = document.getElementById("start-date");
let finish_date = document.getElementById("finish-date");
let result_money = document.getElementById("result-money");
let avand_selecter = document.getElementById("avand-select-id");
let calc_button = document.getElementById('calculate-avand-button');
avand_selecter.addEventListener("change", ()=>{
  
  if(avand_selecter.value == "kutakayin") 
  m.removeAttribute("disabled")
else m.setAttribute("disabled","true")
if(avand_selecter.value == "tari_voroshaki_orer")
day.removeAttribute("disabled")
else day.setAttribute("disabled","true")
})
function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

let datenow = getCurrentDate();
start_date.setAttribute("min", datenow);

start_date.addEventListener('input', function () {
    // Set the min attribute of finish_date to the chosen date of start_date
    finish_date.setAttribute("min", start_date.value);
});

calc_button.addEventListener('click', () => {
 
  result_money.removeAttribute('disabled');
    let avandi_gumar = hatkacvac_gumar.value;
    let start_date_string = start_date.value;
    let finish_date_string = finish_date.value;
    let start_date_obj = new Date(start_date_string);
    let finish_date_obj = new Date(finish_date_string);
    let diff_obj = dateDiffInYearsMonthsDays(start_date_obj, finish_date_obj);
    let year_diff = diff_obj.years;
    let month_diff = diff_obj.months;
    let month_in_years = month_diff / 12;
    let days_diff = Math.floor((finish_date_obj - start_date_obj) / (24 * 60 * 60 * 1000));

    let result;
    if (avand_selecter.value == "parz") {
        result = standart_avand_parz_tokos(avandi_gumar, 20, year_diff);
    } else if (avand_selecter.value == "bard") {
        result = avand_bard_tokos(avandi_gumar, 20, year_diff);
    } else if (avand_selecter.value == "orerov") {
        result = Jamketayain_orerov(avandi_gumar, 20, days_diff);
    } else if (avand_selecter.value == "amisnerov") {
        result = Jamketayain_amisnerov(avandi_gumar, 20, month_diff);
    } else if (avand_selecter.value == "kutakayin") {     
      result = kutakayin(avandi_gumar, 20, year_diff, m.value); 
  }
  else if (avand_selecter.value == "tari_voroshaki_orer") {    
    alert(year_diff) 
    result = tari_voroshaki_orer(avandi_gumar, 20, year_diff, day.value); 
}

    result_money.value = result;
    runforUser(avandi_gumar,start_date_string,finish_date_string,result);
});


function standart_avand_parz_tokos(gumar,tokos,tari) {
 return gumar*(1+tari*(tokos/100));
}
function avand_bard_tokos(gumar,tokos,tari) {
  return gumar*Math.pow(1+(tokos/100),tari)
}
function Jamketayain_orerov(gumar,tokos,or) {
  return gumar*(1+(tokos/100)*(or/360));
}
function kutakayin(gumar,tokos,tari,m) {
  return gumar*Math.pow((1+((tokos/100)/m)),tari*m);
}
function tari_voroshaki_orer(gumar,tokos,tari,or) {
  return gumar*Math.pow((1+tokos/100),tari) * (1+tokos/100 * or/360)
}



function dateDiffInYearsMonthsDays(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    const timeDiff = Math.abs(date2 - date1);
    const daysDiff = Math.floor(timeDiff / msPerDay);
  
    const date1Year = date1.getFullYear();
    const date2Year = date2.getFullYear();
    const date1Month = date1.getMonth();
    const date2Month = date2.getMonth();
  
    let yearDiff = date2Year - date1Year;
    let monthDiff = date2Month - date1Month;
  
    if (monthDiff < 0) {
      yearDiff -= 1;
      monthDiff += 12;
    }
  
    // Calculate the correct day difference
    const dayDiff = date2.getDate() - date1.getDate();
  
    return { years: yearDiff, months: monthDiff, days: dayDiff };
  }
  

let user_obj;
let storedValue = localStorage.getItem('auth');
let user_obj_id = JSON.parse(storedValue).id


  async function runforUser(avandi_gumar,start_date_string,finish_date_string,result) {
    async function getData() {
        try {
            const resp = await fetch(`http://localhost:3000/users/${user_obj_id}`);
            const data = await resp.json();
           user_obj = (data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
async function PutRequest() {
  await getData();
  function generateRandom4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}
let rand = generateRandom4DigitNumber();
  user_obj["avandN"+rand] = {};
  user_obj["avandN"+rand].start_date = start_date_string;
  user_obj["avandN"+rand].finish_date = finish_date_string;
  user_obj["avandN"+rand].avandi_gumar = avandi_gumar;
  user_obj["avandN"+rand].stacvox_gumar = result;
  user_obj.havedepo = true;
  alert(user_obj)
   await fetch(`http://localhost:3000/users/${user_obj_id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user_obj),
});
 
}
 await PutRequest();

}

