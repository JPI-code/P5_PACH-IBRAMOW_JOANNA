//fonction that fetch info from local storage
const fetchCartArray = () =>{
    let cart = JSON.parse(localStorage.getItem("cart"))
        return cart
}
//product price  because of product.js l.76 
//display in order to calculate and show price
const displayTotalPrice = () => {
  let calculatedPrice = 0;
  let calculatedQuantity=0;
  const cart= fetchCartArray();
  cart.forEach( itemAddedToTheCart => {
    calculatedPrice +=itemAddedToTheCart.quantity*itemAddedToTheCart.product.price
    calculatedQuantity +=parseInt(itemAddedToTheCart.quantity);
  });
  document.getElementById("totalQuantity").innerHTML = calculatedQuantity;
  document.getElementById("totalPrice").innerHTML = calculatedPrice;
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
                    <!--added new class in order to display item's color-->
                    <p class="sofa_color">${item.color}</p>
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
            displayTotalPrice();
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
  event.preventDefault();
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

  console.log(orderContent);
  window.location.href="./confirmation.html";

  

})
addEventListener("load", event=> {
  let min = 10000000
  let max = 99999999

    const orderId= Math.floor(Math.random() * (max - min)) + min;
    document.getElementById("orderId").innerHTML = orderId;

})

// // Function to count number of product instantly when user changes the number of products directly in Cart
// let quantityInputs = Array.from(document.getElementsByClassName("itemQuantity"));
// // indicator indicates where in array is our searched color
// let indicator = 0
// let sofa_colors = Array.from(document.getElementsByClassName("sofa_color"));

// quantityInputs.forEach(oneInput => {
//   addEventListener("input", (event)=>{
//     console.log(indicator);
//     console.log(sofa_colors[indicator]);
//   const currentSofaColor = sofa_colors[indicator]
//   let cart =fetchCartArray();
//   const id= oneInput.parentElement.parentElement.parentElement["data-id"]
//   console.log(currentSofaColor)
//   console.log(oneInput)
//   let foundCartItem = cart.find(cartItem=> cartItem.color==currentSofaColor && cartItem.product._id)
// foundCartItem.quantity=oneInput.value;
// localStorage.setItem("cart",JSON.stringify (cart))
// displayTotalPrice();
// })
 
//   indicator ++;
//   if (indicator===fetchCartArray.length) indicator=0;

// });


