import {menuArray} from './data.js'

let orderDiv = document.getElementById("ORDER-SUMMARY")
let orderSummaryArray = []

const orderItems = document.getElementById('order-items')


document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        console.log(e.target.dataset.add)
        addToOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        console.log(e.target.dataset.remove)
        RemoveFrmOrder(e.target.dataset.remove)
    } else if (e.target.dataset.pay){
        console.log(e.target.dataset.pay)
        PayClick(e.target.dataset.pay)
    }
})

let TotalPrice =(menuId) =>{
    return 'Price'
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
            <p><strong>${item.name}</strong></h2>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
        </div>
        <p><strong>$${item.price}</strong></h2>
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
    if (orderSummaryArray.length === 0){
        document.getElementById('ORDER-SUMMARY').style.display ="none"
    }
    
document.getElementById('MENU-ITEMS').innerHTML = menuHtml()
document.getElementById("wrapper").innerHTML = orderHtml()
document.getElementById("total-price").innerHTML = TotalPrice()



}
render()
