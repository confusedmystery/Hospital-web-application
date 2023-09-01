//console.log(<%= user.name %>);




//console.log(name1)
fetchGETCareTakers();
fetchGET();


async function fetchGETCareTakers() {
    let currentcaretakerName =document.getElementById("username").textContent

    const url="getcttodash";
    const response= await fetch(url);

    const caretakersdata=await response.json();
   // console.log(doctorsdata);
   caretakersdata.forEach( item => {
                  if(currentcaretakerName===item.caretaker){
                    fetchGET (item.patient);
                  }
    });

}

async function fetchGET(patientName) {

    const url="sensorUserdata";
    const response= await fetch(url);

    const data=await response.json();
  // console.log(data);

   //function createCard(patientName){
    const cardContainer = document.querySelector('.container');
    //console.log(data);
    // // loop through the data and create a card for each item
    data.forEach( item => {
        // create the card element
        if(patientName===item. patient_Id ){
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
                if( (item.Temparature[item.Temparature.length-1].value)>=25){
                    app_container.style.background="#92DFF3";
          }
          if( (item.Temparature[item.Temparature.length-1].value)<25){
           app_container.style.background="blue";
           //Temparature.style.color="red";
          }
               }
                
                app_container.appendChild(Temparature);
               
         
            
            
            
            
            //   // add the card to the container
             cardContainer.appendChild(app_container);

            //  let children =
            //  [].slice.call(app_container.getElementsByClassName('recent_temparature'),0);
            //            children.forEach(({id})=>{
            //             document.getElementById(id).addEventListener('click',
            //  function(event){
            //                  let clickedUser=id;

            //      fetch('TemparatureGraph', {
            //          method: 'POST',
            //        body: JSON.stringify({sendUser:clickedUser}),
            //         headers: {
            //           'Content-Type': 'application/json'
            //         }
            //       })
            //              })
            //            })
    
            //     //alert("heelo")
    
             }

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

  //return data;
//}




//console.log("following data")

//getData();
