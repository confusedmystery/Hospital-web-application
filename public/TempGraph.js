

var currentDate = new Date();

// Get the HTML elements
var dateInput = document.getElementById("date-input");
// var currentDateElement = document.getElementById("current-date");

// Set the value of the date input to the current date
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
const current = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
dateInput.value = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
document.getElementById('date').value=current;
document.getElementById('date').innerHTML=current;







fetchGET();


function fetchGET(){
async function fetchGET(){

   let currentpatientName =document.getElementById("currentpatient").textContent
  //  console.log(currentpatientName)
    const url="sensorUserdata";
  const response= await fetch(url);

 let data=await response.json();
 //console.log(data);
 //console.log(currentPatientName)
//  let temp=currentPatientName;
//  console.log(temp);
//  console.log(typeof(temp))
//  let temp2="patient3"
//  console.log(temp2);
//  console.log(typeof(temp2))
let datapoints
  //console.log(checkStringQuotes(currentpatientName))
  let createdday=document.getElementById('date').value;
 // console.log(createdday)
data.forEach( item=> {
//     console.log(item.patient_Id)
//    // console.log(checkStringQuotes(i.patient_Id))
//    // console.log(temp)
  if(currentpatientName.trim()===item.patient_Id.trim()){
   //console.log("entered")
//    data=item.Temparature.filter(i=>{
//     console.log(i.createdDay)
//    })
datapoints=item.Temparature


    //data1=data.filter(item.patient_Id.Temparature)
    }
//    //     
//   // console.log("done")
//          // console.log(item.patient_Id);
   });
  // console.log(datapoints)
   datapoints=(datapoints.filter(item=>
    item.createdDay===createdday))
  // console.log(datapoints)
// data=data.filter(item=>item.patient_Id.trim()===currentpatientName.trim())
//  console.log(data);
//  console.log(data.forEach(i=>i.Temparature.value))
//  data=data.filter(i=>i.Temparature.forEach( item=>{item.createdDay===createdday}))
//  console.log(data);
  // const createdday=document.getElementById('date-input').value;
     // console.log(createdday);
    
  
   return datapoints;
   

}
fetchGET().then(datapoints=>{
      const time=datapoints.map(
        function(index){
          return index.createdAt
        });
        const tempvalue=datapoints.map(
        function(index){
          return index.value
        });
        //console.log(time);


        myChart.config.data.labels=time;
        myChart.config.data.datasets[0].data=tempvalue;
        myChart.update();

        // chart.config.data.labels=time;
        // chart.config.data.datasets[0].data=tempvalue;
        // chart.update();
          })
        }


            function plotData(){
    async function getData(){
        let currentpatientName =document.getElementById("currentpatient").textContent
      const url='sensorUserdata';
     const response= await fetch(url);
     const createdday=document.getElementById('date-input').value;
        // console.log(createdday);
      let data=await response.json();
    // console.log(datapoints);
     //console.log(datapoints.filter(item=>item.createdDay===createdday));
     data.forEach( item=> {
        
          if(currentpatientName.trim()===item.patient_Id.trim()){
          // console.log("entered")
       
        datapoints=item.Temparature
          }
           });

     datapoints=datapoints.filter(item=>item.createdDay===createdday)
     //console.log(datapoints);
       return datapoints;
    }

     getData().then(datapoints=>{
       const time=datapoints.map(
        function(index){
          return index.createdAt
        });
        const tempvalue=datapoints.map(
        function(index){
         return index.value
        });
        //console.log(time);


    //     // myChart.config.data.labels=time;
    //     // myChart.config.data.datasets[0].data=tempvalue;
    //     // myChart.update();

       chart.config.data.labels=time;
        chart.config.data.datasets[0].data=tempvalue;
        chart.update();
          })
        };



    const data = {
      labels: [],
      datasets: [{
        label: 'Temperature',
        data: [],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 2
      }]
    };

    // config 
    const config = {
      type: 'line',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
     const chart = new Chart(
       document.getElementById('chart'),
       config
     );