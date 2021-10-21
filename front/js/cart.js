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

//ETAPE 1 extract data from FORM.Commander
//1.
//ETAPE 2 return CONTACT and ARRAY of Products ID

// fetch("http://localhost:3000/api/products/order",
//         {
//             method: "POST",
//             body: JSON.stringify(order),
//             headers: { "Content-Type": "application/json" },
//         }
//     )
// order = {
// contact: {city,  name,  etc.}
// products: fetchedProducts.map(product =>   product.id)
// }
// Léo Punsola1:47 PM
// reconstituer contact 
// const contact = retour du formulaire
// puis
// const order = {
// contact:  contact,
// products: fetchedProducts.map() }



const formSubmit = document.getElementById("order")
formSubmit.addEventListener("click", event =>{
  console.log("test")
  // const firstName = document.getElementById("firstName").value
  // const lastName = document.getElementById("lastName").value
  // const address = document.getElementById("address").value
  // const city= document.getElementById("city").value
  // const email = document.getElementById("email").value

const contact = {
  firstName: document.getElementById("firstName").value,
  lastName: document.getElementById("lastName").value,
  address: document.getElementById("address").value,
  city: document.getElementById("city").value,
  email: document.getElementById("email").value,
}
const orderContent ={
  contact:contact,
  products:fetchCartArray().map(cartItem => cartItem.product._id),
}

  console.log(orderContent)

})

