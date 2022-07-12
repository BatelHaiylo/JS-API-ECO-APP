class Objelement {
    constructor(url,imgArr){
        this.url = url
        this.imgArr = imgArr
    }

    async getDevices(){
        try{
          document.getElementById('main').innerHTML = 
          `<div id= "loading_containrt" style="min-height: 100vh;"><img src="/images/loading-bar.gif" class="d-flex justify-content-center  align-items-center pt-5";"></div>`
            return await fetch(`${this.url}`)
            .then(data => data.json())
        } catch(error){this.error(error)}
        finally{ document.getElementById('loading_containrt').innerHTML =" "}
    }

    async getUsers(usersHtml=''){
        let APIusers = await fetch(`${UserApi}`).then(res => res.json())
        let users = [...APIusers, ...newUsers]
        users.forEach((user,index) => {
          user.picture =`${usersPicturesArr[index] ? usersPicturesArr[index] : usersPicturesArr[0]}`
            usersHtml += addToTable(user,index)
        })
        tableTemplate(usersHtml)
    }

    error(err) {
        console.log(err)
    }

    async deleteDevice(id){
        try{
          let response = await fetch(`${devicesApi}/${id}`,{
            method: 'DELETE',
            headers: {'Content-type': 'application/json;'}
          })
      
          if(response.status <= 299) 
            document.getElementById(id).remove()
          else document.getElementById('errors').innerHTML = 'Something wrong on deleting'
      } catch(error){this.error(error)
      }finally{}
      }
      

    async addCardToPage(elementId = 'main',result='<div class="row container-fluid">') {
        let products = await this.getDevices() 
        products.forEach((product,index) => {
          if(index % 3 == 0) {result += '</div><div class="row container-fluid">'}
          product.picture =`${devicePicturesArr[index] ? devicePicturesArr[index] : devicePicturesArr[0]}`
            result += this.cardTemplate(product,index)
        });
      document.getElementById(elementId).innerHTML = result
    }

    cardTemplate(product) {
        let {brand,color,createdAt,id,isAvailable,picture,price,ram} = product
        return `
            <div class="card col-sm-10 col-md-4 g-4" id="${id}">
              <img id="proudect_img" src="${picture}" class="card-img-top h-50">
              <div class="card-body">
                <h3 class="card-title">${brand}   ${color}</h3>
                <h5 class="card-title">${ram}</h5>
                <h5 class="card-title">${price}$ </h5>
                <span class="card-title">${isAvailable}  ${createdAt}</span><br><br>
                <button onclick="deleteDevice('${id}')" class="btn btn-dark">delete</button>
              </div>
            </div>
        `
    }

    tableTemplate(usersHtml){
        let container = document.getElementById('main')
        container.innerHTML = `  
   
        <section class="hero">
        <div class="container">
          <ol class="breadcrumb justify-content-center">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Information</li>
          </ol>
          <div class="hero-content text-center">
            <h1 class="hero-heading mb-0">App User</h1>
          </div>
        </div>
        </section>
        
        <div class="table table-responsive-sm">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>User Name</th><th>Email</th><th>Age</th><th>Phone</th><th>Picture</th>
          </tr>
          </thead>
          <tbody>${usersHtml}</tbody>
        </table>
        </div>
     `
    }

    addToTable(user){
        return `
         <tr>
          <td>${user.name.first}${user.name.last}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.phone}</td>
          <td><img src="${user.picture}" height="50" width="45" style="border-radius:90%;"></td>
        </tr>
         `
    }
    
   
    static print(url,elementId='main') {
      let devices = new Objelement(url)
      devices.addCardToPage(elementId)
    }

    static print(url,elementId='main') {
        let user = new Objelement(url)
        user.getUsers(elementId)
      }
  
}

const devicesApi = 'https://my-json-server.typicode.com/Jeck99/fake-server/devices'
const UserApi = 'https://my-json-server.typicode.com/Jeck99/fake-server/users'
const newUsers = []

function devices(event) {
  event.preventDefault()
  Objelement.print(devicesApi,'main')
}

function table(event) {
    event.preventDefault()
    Objelement.print(UserApi,'main')
}
  
function addUserTotable(event) {
    newUsers.push(Objelement.print(
        document.getElementById("age").value,
        document.getElementById("l_name").value,
        document.getElementById("f_name").value,
        document.getElementById("email").value,
        "+1" + document.getElementById("phone").value,
        document.getElementById("picture").value,
        document.getElementById("password").value
    ))
}
