const searchForm= document.querySelector('.search-form');

 document.querySelector('#search-btn').onclick =()=>{

    
    searchForm.classList.toggle('active');
    addRoom.classList.remove('active');

 }

// const addRoom= document.querySelector('.add-room');

// document.querySelector('#addroom').onclick =()=>{
    
//     addRoom.classList.toggle('active');
//     searchForm.classList.remove('active');

// }


//const createCardButton = document.getElementById("createCard");


//card code
// const formContainer = document.getElementById("form-container");
// const container = document.getElementById("container");
// const headerInput = document.getElementById("header");
// const statusInput = document.getElementById("status");
// const nameInput = document.getElementById("name");
// const temperatureInput = document.getElementById("temperature");
// const textInput = document.getElementById("text");
// const submitButton = document.getElementById("submit");

// createCardButton.addEventListener("click", () => {
//     formContainer.style.display = "block";
// });
//     submitButton.addEventListener("click", () => {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     const header = document.createElement("h1");
//     header.textContent = headerInput.value;
//     card.appendChild(header);

//     const status = document.createElement("p");
//     status.classList.add("status");
//     status.textContent = statusInput.value;
//     card.appendChild(status);

//     const name = document.createElement("p");
//     name.textContent = nameInput.value;
//     card.appendChild(name);

//     const temperature = document.createElement("p");
//     temperature.textContent = temperatureInput.value;
//     card.appendChild(temperature);

//     const text = document.createElement("p");
//     text.textContent = textInput.value;
//     card.appendChild(text);

//     container.appendChild(card);
// });

//function getData(){

    async function fetchGET() {

      const url="sensorUserdata";
      const response= await fetch(url);

      const data=await response.json();
    // console.log(data);
    
    //return data;
 
 const cardContainer = document.querySelector('.container');

// // loop through the data and create a card for each item
data.forEach( item => {
      // create the card element
 
      let roomIddisplay="RoomID:";
      const app_container = document.createElement('div');
      app_container.classList.add('app_container');
      
        const app_top_bar = document.createElement('div');
        app_top_bar.classList.add('app-top-bar');
        app_container.appendChild(app_top_bar);
      
       const app_heading = document.createElement('h1');
       app_heading.classList.add('app-heading');
       app_heading.textContent=roomIddisplay+ item.RoomId;
       app_top_bar.appendChild(app_heading);


       let created="Created on: "
         const created_date = document.createElement('h2');
         created_date.classList.add('Date');
         created_date.textContent=created+ item.createdDay;
          app_container.appendChild(created_date);
       
          let patient_name="Name: "
         const heading2 = document.createElement('h2');
       heading2.classList.add('patient_name');
        heading2.textContent=patient_name+item. patient_Id;
        app_container.appendChild(heading2);
      
      let device_Id="Device-Id: "
        const heading3 = document.createElement('h3');
        heading3.classList.add('device_name');
         heading3.textContent=device_Id+item.Device_name;
         app_container.appendChild(heading3);
        
        
       let recent_temparature="Recent-Temparature: "
       let Temparature = document.createElement('h2');
         Temparature.classList.add('recent_temparature');
         Temparature.id=item.patient_Id
         if(item.Temparature.length){
          Temparature.textContent=recent_temparature+ item.Temparature[item.Temparature.length-1].value;
         if( (item.Temparature[item.Temparature.length-1].value)<=25){
          app_container.style.background="#92DFF3";
        }
            if( (item.Temparature[item.Temparature.length-1].value)>25){
                 app_container.style.background="orange";
 //Temparature.style.color="red";
         } 
         }
          
          app_container.appendChild(Temparature);
         
   
      
      
      
      
      //   // add the card to the container
       cardContainer.appendChild(app_container);     

  //  const app_content = document.createElement('div');
  //  app_content.classList.add('app-content');
  //  const button_button_block = document.createElement('button');
  //  button_button_block.classList.add('button button-block ');
  //  app_content.append(button_button_block);
  //  app_container.append(app_content);

   
  
   //const input = document.createElement('input');
   //input.classList.add('patient-name');
   //input.textContent=item.Id_name;
  //app_container.appendChild(input);
   
//  const button_button_dial=document.createElement('div');
//   button_button_dial.classList.add('button button-dial');
//   app_container.appendChild(button_button_dial);

   
  // const button_dial_top=document.createElement('div');
  // button_dial_top.classList.add('button-dial-top');
  // app_container.appendChild(button_dial_top);
   
  
  


//   // add the card to the container
  
 });

 let children =
 [].slice.call(cardContainer.getElementsByClassName('recent_temparature'),0);
            children.forEach(({id})=>{
         document.getElementById(id).addEventListener('click',
 function(event){
 
          let clickedUser=id;
              var url = "Temparaturegraph?name="+clickedUser 
              window.open(url);
            })
      })
}

//console.log("following data")

//getData();
fetchGET ();

//console.log(req.session.authenticated)
//   document.getElementById("writeId").innerHTML = item.RoomId;
//   document.getElementById("patient-name").innerHTML=item.Id_name;
//   document.getElementById("show-temperature").innerHTML=item.Temperature;
//   document.getElementById("sleeping-position").innerHTML=item.Humidity;
//   document.getElementById("humidity").innerHTML=item.Position;