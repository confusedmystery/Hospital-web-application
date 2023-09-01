

function sendData(e,searchResults,route) {
    
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/\s*/);
    if (match2[0] === e.value) {
        searchResults.innerHTML ='';
        return;
    }
    if(match [0] === e.value) {
        
        fetch(route, {
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

            resultItem.textContent = item.name+" "+ item.email;; 
         
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