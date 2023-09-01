async function fetchGET() {

    const url="users";
    const response= await fetch(url);

    const data=await response.json();
    console.log(data)

    const listdiv = document.querySelector('.list');


    data.forEach( item => {
        // create the card element
    const listname = document.createElement('p');
    listname.classList.add("patient_name")
    listname.textContent=item.name;
    listdiv.appendChild(listname);
  
     


    });
}

// const clickname= document.querySelector(".patient_name")

// clickname.onclick= naam;


// function naam(){
  
//     console.log(clickname.textcontent)


// }



fetchGET();

