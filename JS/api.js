const locationAPI = 'https://airbnb19.p.rapidapi.com/api/v1/getCategory'
const weatherAPI =  'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly'

async function getLocation(url = `${locationAPI}`){
    try{
        return await fetch(url)
        .then(response => response.json())
    	.then(response => console.log(response.data))
    }catch(err){
        (err => console.error(err))
    }
}

async function printLocation(elementId = 'main',result='<div class="row container-fluid">'){
        let geo = await getLocation(`${weatherAPI}`)
        geo.forEach((item,index) => {
          if(index % 3 == 0) {result += '</div><div class="row container-fluid">'}
            result += cardTemplate(item)
        });
      document.getElementById(elementId).innerHTML = result
    }

function cardTemplate(item){
    let {id,title,image} = item
    return `
        <div class="card col-sm-10 col-md-4 g-4" id="${id}">
          <img id="proudect_img" src="${image}" class="card-img-top h-50">
          <div class="card-body">
            <h3 class="card-title">${title}</h3>
            <button onclick="deleteDevice('${id}')" class="btn btn-dark">delete</button>
          </div>
        </div>
    `
}