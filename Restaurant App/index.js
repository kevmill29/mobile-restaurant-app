import {menuArray} from './data.js'


let orderSummaryArray = []

const orderItems = document.getElementById('order-items')


document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        console.log(e.target.dataset.add)
        addToOrder(e.target.dataset.add)
    }
})

let addToOrder = (menuId) => {
    let itemObj = menuArray.filter((item)=>{
        return item.uuid === menuId
    })[0]

    orderSummaryArray.push({
        item: itemObj.item,
        cost: itemObj.price
    })

    console.log(orderSummaryArray.item)
    
}

function menuHtml(){
    let menu = ""
    menuArray.forEach((item)=>{
        menu += 
        `
        <div class="menu-item-div">
                <div class="img-left">
                    <img src="${item.image}" class="menu-item">
                </div>
                <div class="item-desc">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.ingredients}</p>
                    <p><strong>$${item.price}</strong></p>
                </div>
                <div class="item-wrapper">
                <i class="fa-regular fa-plus plus"></i>
                </div>        
        </div>
        `
       
    })
    return menu 
}
let render =()=>{
document.getElementById('MENU-ITEMS').innerHTML = menuHtml()

}
render()
