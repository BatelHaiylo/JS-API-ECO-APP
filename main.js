var mainContent = document.getElementById('main')
function changeMainContent(event){
    event.preventDefault()

    let href = event.target.getAttribute('href')

    let links = {
        '/JS/table.js':contributors,
        '/JS/form.js':form,
        '/JS/about.js':about,
        '/JS/userPage.js':userlogin,
        '/JS/contact.js':contact,
        '/JS/cart.js':viewCart
    }
    console.log(links[href]())
    mainContent.innerHTML = links[href]()
}

function search(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}

// function searchProduct(){
//     let products = await this.getAll() 
//     let searchItem = document.getElementById("myInput")
//     products.forEach(product => {
//         if(products.includes(searchItem.value)){
            
//         }
//     });
// }