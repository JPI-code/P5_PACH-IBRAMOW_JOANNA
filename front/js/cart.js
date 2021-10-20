//fonction that fetch info from local storage
const fetchCartArray = () =>{
    let cart = JSON.parse(localStorage.getItem("cart"))
        return cart
}

//fonction to display items
const displayItemsAddedToCart =() => {
    let cart = fetchCartArray()
    if (cart===null)
    //if cart is null, fonction return will stop the execution of the fonction
        return 
        //if not
      let itemContainer =document.getElementById("cart__items")
            itemContainer.innerHTML = cart.map(
                (item) =>  
            `
            <article class="cart__item" data-id="${item.product._id}">
            <div class="cart__item__img">
              <img src="${item.product.imageUrl}" alt="${item.product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                <h2>${item.product.name}</h2>
                <p>
                    ${item.product.price*item.quantity},00€
                    </p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
            `
            )   
        
        };
    

        

displayItemsAddedToCart()