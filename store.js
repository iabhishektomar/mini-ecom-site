if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    

    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(let i = 0; i<removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', function (event) {
            event.target.parentElement.parentElement.remove();
            updateCartTotal()
        })
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        var quantity = quantityInputs[i];
        quantity.addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value<=0) {
                input.value == 1
            }
            updateCartTotal()
              
        })

        
    }


    // let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    // for (let i = 0; i < removeCartItemButtons.length; i++) {
    //     let button = removeCartItemButtons[i]
    //     button.addEventListener('click', function (event) {
    //         let buttonClicked = event.target
    //         buttonClicked.parentElement.parentElement.remove();
    //         updateCartTotal()
    //     })
    // }
//     var quantityInputs = document.getElementById('cart-quantity-input')
//     for (let i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i]
//         input.addEventListener('change', quantityChanged)
//     }
// }

// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value == 1
//     }
//     updateCartTotal()

var addToCartButtons = document.getElementsByClassName('btn btn-primary shop-item-button');
for (let i = 0; i<addToCartButtons.length; i++) {
    let addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener('click', function (event) {
        console.log('clickedAddToCart');
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

        addItemToCart(title, price, imageSrc);
        updateCartTotal()
    })
}

document.getElementsByClassName('btn btn-primary btn-purchase')[0].addEventListener('click', purchaseClicked)

document.getElementsByClassName('btn-remove-all')[0].addEventListener('click', emptyCart)

}

let purchaseClicked = () => {
    alert('Thank you for your purchase')
    emptyCart()
}

let emptyCart = () => { 
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartItems.append(cartRow);
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        var cartItemName = cartItemNames[i];
        if (cartItemName.innerText == title) {
            alert('This item already exist in cart')
            return
        }
    }
    var cartRowContents = ` 
    <div class="cart-row">    
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        </div>
    </div> `

    cartRow.innerHTML = cartRowContents;
    updateCartTotal()
    
    cartRow.getElementsByClassName('btn btn-danger')[0].addEventListener('click', function (event) {
        event.target.parentElement.parentElement.remove();
        updateCartTotal()})
    
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value<=0) {
                input.value == 1
            }
            updateCartTotal()
        })
}



function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    // var productPrice = price;
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];  
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value 
        // productPrice = price*quantity;
        total = total + (price*quantity)
        // total = total + productPrice;

        // quantity.addEventListener('change', quantityChanged)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = "₹" + total;
}
