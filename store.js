if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', function (event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal()
        })
    }
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];  
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value 
        total = total + (price*quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = "₹" + total;
}

// cartItemContainer = document.getElementsByClassName('cart-items')[0]
// cartRows = cartItemContainer.getElementsByClassName('cart-row')

// cartRow = cartRows[0]
// priceElement = cartRow.getElementsByClassName('cart-price')[0];  
// quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
// quantity = quantityElement.value
// price = parseFloat(priceElement.innerText.replace('₹', ''))
// productPrice = productPrice*[quantity]

// document.getElementsByClassName('cart-price')[0].innerText = "₹" + productPrice;
