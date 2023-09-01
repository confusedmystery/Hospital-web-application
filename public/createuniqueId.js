const generatebtnD=document.getElementById("generate d")
const generatebtnCt=document.getElementById("generate ct")

generatebtnD.onclick=randomnumber1;
generatebtnCt.onclick=randomnumber2;


function randomnumber1(event){
    event.preventDefault();
    let x = Math.floor((Math.random() * 10000) + 1);
     x="DOC_"+x
   
     document.getElementById("random_int").value=x;
    console.log(x)
  //  console.log(writeuniqueId)
//   if(x==="")
//   alert("uniqueId not generated")
//   else{
//     alert("uniqueId generated")
//     location.reload()
//   }
}
function randomnumber2(event){
    event.preventDefault();
    let x = Math.floor((Math.random() * 10000) + 1);
     x="CARE_"+x
   
     document.getElementById("random_int").value=x;
    console.log(x)
  //  console.log(writeuniqueId)
//   if(x==="")
//   alert("uniqueId not generated")
//   else{
//     alert("uniqueId generated")
//     location.reload()
//   }
}