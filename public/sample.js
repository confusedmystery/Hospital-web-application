




async function fetchGET() {
  

    const url="http://localhost:3000/getroomId";
    const response= await fetch(url);

    const roomdata=await response.json();
    console.log(roomdata)
    const select = document.getElementById('create-room-id');
    roomdata.forEach(item => {
        const opt = document.createElement('option');
       
         opt.value = item._id;
        // console.log(opt.value)
         opt.text = item.roomId;
        // console.log(opt.text)
       select.add(opt);
      });
}

fetchGET();