/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function toggleDropdown() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.fa-sharp fa-solid fa-user')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }



// function check(event) {
//     event.preventDefault();
   
//   }
async function fetchGET() {
  

  const url="getroomId";
  const response= await fetch(url);

  const roomdata=await response.json();
  //console.log(roomdata)
  const select = document.getElementById('create-room-id');
  roomdata.forEach(item => {
      const opt = document.createElement('option');
     
       opt.value = item.roomId;
      // console.log(opt.value)
       opt.text = item.roomId;
      // console.log(opt.text)
     select.add(opt);
    });
}

async function fetchGETdeviceId() {
  

  const url="getdeviceId";
  const response= await fetch(url);

  const devicedata=await response.json();
  //console.log(devicedata)
  const select = document.getElementById('device-id');
  devicedata.forEach(item => {
      const opt = document.createElement('option');
     
       opt.value = item.deviceId;
      // console.log(opt.value)
       opt.text = item.deviceId;
      // console.log(opt.text)
     select.add(opt);
   //  console.log(opt.value)

    });

}

fetchGET();
fetchGETdeviceId();



const createbutton = document.getElementById("submit-create");
createbutton.onclick=check;
function check(event){
    event.preventDefault();
    let roomId=""
     roomId = document.getElementById("create-room-id").value;
    document.getElementById("writeId").innerHTML = roomId;
   
     if(roomId==="")
     alert("Enter room Id")
     else{
         document.getElementById("card").style.display = "block";
       
     }
}
const connectbutton = document.getElementById("connect-btn");
connectbutton.onclick=fetchPOST;
// function fetchPOST () {
//     // (A1) DATA
//     let data = new URLSearchParams();
//     let roomId=document.getElementById("create-room-id").value
//     let patient_name=document.getElementById("patient-name").value
    
//     data.append("RoomId", roomId);
//     data.append("Id_name",patient_name);
   
//     // (A2) FETCH
//    console.log(data);
//        if(confirm("Room is successfuly created")){

//     fetch('http://localhost:3000/connect', { method: "post", body: data })
//               location.reload();
//        }
             

//     // .then(txt => console.log(txt))
//     // .catch(err => console.log(error));

//   }
  function fetchPOST () {

  let roomId=document.getElementById("create-room-id").value

  let patient_name=document.getElementById("patient-name").value
  let device_name=document.getElementById("device-id").value
  //console.log(roomId);
  //console.log(patient_name);
  //console.log(device_name);
   if(roomId===""||patient_name===""){
     alert("please select RoomId/PatientId")
   } else{
   if(confirm("Room is successfuly created")){
   fetch('connect', {
    method: 'POST',
   body: JSON.stringify({ RoomId:roomId, patient_Id:patient_name, Device_name:device_name}),
   headers: {
     'Content-Type': 'application/json'
   }
 })
 location.reload();
 }
}
//   .then(response => response.json())
//     .then(data => console.log(data))
//   .catch(error => console.error(error))
   }
   //const searchResults = document.getElementById('searchResults');
   function sendData(e,searchResults) {
   
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/\s*/);
    if (match2[0] === e.value) {
        searchResults.innerHTML ='';
        return;
    }
    if(match [0] === e.value) {
        fetch('getPatientsdoc', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    }).then(res => res.json()).then(data => {
        let payload = data.payload;
        searchResults.innerHTML ='';
        if(payload.length < 1){
            searchResults.innerHTML = '<p>Sorry. Nothing Found.</p>';
            return;
        }
          payload.forEach(function (item, index){

            if(index > 0) {searchResults.innerHTML += '<hr>';}
            let resultItem = document.createElement('p');
            resultItem.id = item.name;

            resultItem.textContent = item.name;
            searchResults.appendChild(resultItem);
        });

        
          var children =
[].slice.call(searchResults.getElementsByTagName('p'),0);
          children.forEach(({id})=>{
            document.getElementById(id).addEventListener('click',
function(event){
                e.value = id
                searchResults.innerHTML= ''
            })
          })
    });
    return;
}
    searchResults.innerHTML ='';
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}