import {menuArray} from './data.js'

let orderDiv = document.getElementById("ORDER-SUMMARY")
let orderSummaryArray = []
const form = document.getElementById('myForm');
const namePlaceholder = document.querySelector('#namePlaceholder');
const thankYouMessage = document.querySelector('#thankYouMessage');
const orderItems = document.getElementById('order-items')
const loadingScreen = document.getElementById('loading-screen');

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        console.log(e.target.dataset.add)
        addToOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        console.log(e.target.dataset.remove)
        RemoveFrmOrder(e.target.dataset.remove)
    }
    else if (e.target.dataset.complete){
        handleCompleteClick(e.target.dataset.complete)
    }
})



form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const name = document.getElementById('name').value;
  namePlaceholder.textContent = name;
  thankYouMessage.style.display = 'block';
  document.getElementById('payment-modal').classList.add('hidden')
  
    loadingScreen.classList.remove('hidden')
 loadingScreen.innerHTML =`
  
                      <h3>Order Processing...</h3>
                                          <div class="loading-spinner"></div>
                                          </div>`
                                         
    // simulate processing the order
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.getElementById('payment-modal').innerHTML =`
      <div id="thankYouMessage" style="display: none;">
                                              <h4>Thank you <span id="namePlaceholder"></span> your order is on its way!</h4>
                                            </div>`
    }, 3000);
})





let handleCompleteClick =()=>{
    document.getElementById('payment-modal').classList.remove("hidden")
}

let TotalPrice =() =>{
    let totalPriceHtml = ''
    
    let totalPrice = 0
    orderSummaryArray.forEach(function(order){
        totalPrice += order.price
    })
    
    totalPriceHtml = `<div class="inner-total-price">
                <h2>Total price:</h2>
                <h4>$${totalPrice}</h4>
                </div>`
    return totalPriceHtml
}

function RemoveFrmOrder(menuId){
    orderSummaryArray.splice(menuId, 1);
    render()
}


let addToOrder = (menuId) => {
    let itemObj = menuArray.filter((item)=>{
        return item.uuid === menuId
    })[0]

    orderSummaryArray.push( itemObj )

    console.log(orderSummaryArray)
    render()
}

function orderHtml(){
    let order = ""
    orderSummaryArray.forEach((item)=>{
        order += `
        
        <div class="order-list">
        <div class="inner-order-list">
            <h2>${item.name}</h2>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
        </div>
        <h4>$${item.price}</h4>
    </div> 
        `
    })
    return order
    
    } 


function menuHtml(){
    let menu = ""
    menuArray.forEach((item)=>{
        menu += 
        `
        <div class="menu-item-div">
            <div class="left">
                <div class="img-left">
                    <img src="${item.image}" class="menu-item">
                </div>
                <div class="item-desc">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.ingredients}</p>
                    <p><strong>$${item.price}</strong></p>
                </div>
            </div>
                <div class="item-wrapper" >
                <i class="fa-regular fa-plus plus" data-add="${item.uuid}"></i>
                </div>        
        </div>
        `
       
    })
    return menu 
}
let render =()=>{
    if(orderSummaryArray.length === 0) {
        document.getElementById("ORDER-SUMMARY").style.display = "none"
    } else {
        document.getElementById("ORDER-SUMMARY").style.removeProperty("display")
    }
    
document.getElementById('MENU-ITEMS').innerHTML = menuHtml()
document.getElementById("wrapper").innerHTML = orderHtml()
document.getElementById("total-price").innerHTML = TotalPrice()



}
render()
