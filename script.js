const setWeightBtn = document.getElementById("setWeightBtn");
const usernameInput = document.getElementById("usernameInput");
const createUserBtn = document.getElementById("createUserBtn");
const weightInput = document.getElementById("weightInput");
const list_container = document.getElementById("list_container");
const container2 = document.getElementById("container2");
const container3 = document.getElementById("container3");

const backbtn = document.getElementById("backbtn");
backbtn.addEventListener("click", ()=>{
  container2.style.display = "block";
  container3.style.display = "none";
})


function renderChart(xValues1, yValues1) {
  const xValues = xValues1
  const yValues = yValues1
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
       datasets: [{
        fill: false,
         lineTension: 0,
         backgroundColor: "rgba(0,0,255,1.0)",
         borderColor: "rgba(0,0,255,0.1)",
         data: yValues
       }]
     },
    options: {
      legend: {display: false},
       scales: {
        yAxes: [{ticks: {min: 0, max:120}}],
      }
     }
   });
  
}


let selected_username = "";
let del_username_underscore = "";


let users_string = localStorage.getItem("users")
if (users_string ==null){
    users_string = "[]";
}
let users_arr =  JSON.parse(users_string)
for (let index = 0; index < users_arr.length; index++) {
    const list_item1 = document.createElement('a')
    list_item1.classList.add("list-group-item")
    list_item1.classList.add("list-group-item-action")

    const username1 = users_arr[index].username;
    const username_underscore = username1.replace(" ", "_")

    list_item1.setAttribute('id', username_underscore);

    list_item1.addEventListener("click", ()=>{
        selected_username = username1
        console.log(selected_username)
        container2.style.display = "none";
        container3.style.display = "block";
      

        let data32 = JSON.parse(localStorage.getItem("users"))
    let datas2;
    
    for (let index = 0; index < data32.length; index++) {
        
        if (data32[index].username == selected_username){
        datas2 = data32[index];
        } 
    }

    renderChart(datas2.dates, datas2.weights.map(Number))


    })

    list_item1.innerHTML = `<div class=" d-flex w-100 justify-content-between">
<h5 class="mb-1">${username1}</h5>
</div>`
list_container.appendChild(list_item1)


document.getElementById(username_underscore).addEventListener("contextmenu", ()=>{
  username_to_delete = username_underscore.replace("_", " ")
  let users_arr = JSON.parse(localStorage.getItem("users"));
  let delete_index;

 for (let index = 0; index < users_arr.length; index++) {
        
        if (users_arr[index].username == username_to_delete){
        delete_index = index;
        } 
    }

    users_arr.splice(delete_index, 1)
    let users_arr_str = JSON.stringify(users_arr) 
        localStorage.setItem("users", users_arr_str)
        alert(`The User "${username_to_delete}" Deleted !`)
        location.reload()

})

    
}



createUserBtn.addEventListener("click", (e) => {
  e.preventDefault()

    const username = usernameInput.value;

    const list_item2 = document.createElement('a')
    list_item2.classList.add("list-group-item")
    list_item2.classList.add("list-group-item-action")
    list_item2.setAttribute('id', '');
    const username_underscore = username.replace(" ", "_")

    list_item2.setAttribute('id', username_underscore);

    let users_string = localStorage.getItem("users")
    if (users_string ==null){
        users_string = "[]";
    }

    let users_arr =  JSON.parse(users_string)
    let users_actual = []
    if (users_arr!=null){
        users_actual = users_arr
    }
    console.log(users_actual) 

        let string_users = JSON.stringify(users_actual) 
        localStorage.setItem("users", string_users) 
        users_actual.push({username:username, dates:[], weights:[]})
        let string_users2 = JSON.stringify(users_actual) 
        localStorage.setItem("users", string_users2)
        let data = JSON.parse(localStorage.getItem("users"))
        list_container.appendChild(list_item2)
        list_item2.innerHTML = `<div class="d-flex w-100 justify-content-between">
<h5 class="mb-1">${username}</h5>
<button class="btn btn-dark" type="button">Create New User</button>
</div>`



let data4 = JSON.parse(localStorage.getItem("users"))
console.log(data4)

location.reload()

})


let weight;

setWeightBtn.addEventListener("click", () => {
    console.log("Selected username : "+selected_username)
    weight = weightInput.value;
    console.log(weight)

    const d = new Date();
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()

    const currentTime = `${date}-${month}-${year}`


    let data3 = JSON.parse(localStorage.getItem("users"))
    let datas;
    let datas_index;
    
    for (let index = 0; index < data3.length; index++) {
        
        if (data3[index].username == selected_username){
        datas = data3[index];
        datas.weights.push(weight)
        datas.dates.push(currentTime)
        datas_index = index;
        } 
    }
    data3.splice(datas_index, 1, datas)

    // let lastTime = datas_copy.dates[datas.dates.length-1]

    let string_data3 = JSON.stringify(data3) 
    localStorage.setItem("users", string_data3)

    renderChart(datas.dates, datas.weights.map(Number))

})
