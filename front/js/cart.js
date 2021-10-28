//fonction that fetch info from local storage
const fetchCartArray = () => {
  let cart = JSON.parse(localStorage.getItem("cart"))
  // SORTING BY PRODUCT ID / SOFA MODEL
  cart.sort((a, b) => a.product._id.localeCompare(b.product._id))
  //console.log("sorting cart array")
  return cart
}
//product price  because of product.js l.76 
//Fonction "display" in order to calculate and show price
const displayTotalPrice = () => {
  let calculatedPrice = 0;
  let calculatedQuantity = 0;
  const cart = fetchCartArray();
  cart.forEach(itemAddedToTheCart => {
    calculatedPrice += itemAddedToTheCart.quantity * itemAddedToTheCart.product.price
    calculatedQuantity += parseInt(itemAddedToTheCart.quantity);
  });
  document.getElementById("totalQuantity").innerHTML = calculatedQuantity;
  document.getElementById("totalPrice").innerHTML = calculatedPrice;
}

//fonction to display items in the Cart
const displayItemsAddedToCart = () => {
  let cart = fetchCartArray()
  console.log(cart)
  if (cart === null)
    //if cart is null, fonction return will stop the execution of the fonction
    return
  //if not
  let itemContainer = document.getElementById("cart__items")
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
                    ${item.product.price * item.quantity},00€
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


//STAGE 1 extract data from FORM.Commander
//1.
//STAGE 2 return CONTACT and ARRAY of Products ID



// UPDATING TOTAL PRICE WHEN CHANGING QUANTITY IN THE CART

const setQuantityAutoCalculation = () => {
  let inputForms = document.getElementsByClassName("itemQuantity")
  let cart = fetchCartArray();
  for (let i = 0; i < inputForms.length; i++) {
    //console.log("adding event listener")
    inputForms[i].addEventListener("input", (event) => {
      //console.log("event fired")
      cart[i].quantity = inputForms[i].value
      window.localStorage.setItem("cart", JSON.stringify(cart))
      displayTotalPrice()
    })
  }

}


// DELETING ITEMS FROM THE CART USING BUTTON "SUPPRIMER" 
const activateDeleteButtons = () => {
  let deleteButtons = document.getElementsByClassName("deleteItem")
  let cart = fetchCartArray();
  for (let i = 0; i < deleteButtons.length; i++) {
    //console.log("adding event listener")
    deleteButtons[i].addEventListener("click", (event) => {
      //console.log("Deleting items from cart")
      cart.splice(i, 1)
      window.localStorage.setItem("cart", JSON.stringify(cart))
      displayItemsAddedToCart();
      setQuantityAutoCalculation();
      activateDeleteButtons();
    })
  }
}



// VALIDATION INPUTS FORMS TO MEET FIELDS REQUIREMENTS 

const validateForms = () => {
  const contact = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    address: document.getElementById("address"),
    city: document.getElementById("city"),
    email: document.getElementById("email"),
  }
  //validating name check for number input (|| means OR; && means AND; ! means NOT)
  
  if (/\d/.test(contact.firstName.value) || (contact.firstName.value===""))
    {
      
      let inputError = document.getElementById("firstNameErrorMsg");
      inputError.innerHTML= "Invalid input. Note: obligatory field and no digits allowed";

  
      return false
    
    }

    if (/\d/.test(contact.lastName.value) || (contact.lastName.value===""))
    {
      let inputError = document.getElementById("lastNameErrorMsg");
      inputError.innerHTML= "Invalid input. Note: obligatory field and no digits allowed";
   
    return false
    }

  //validating surname
 
  //validating adress
  if  (contact.address.value==="")
  {
    let inputError = document.getElementById("addressErrorMsg");
    inputError.innerHTML= "Invalid input. Note: obligatory field";
 
  return false
  }
  //validating city
  if  (contact.city.value==="")
  {
    let inputError = document.getElementById("cityErrorMsg");
    inputError.innerHTML= "Invalid input. Note: obligatory field";
 
  return false
  }
  //validating email  ! means = NOT
  if  ((contact.email.value==="") || !(contact.email.value.includes ("@")))
  {
    let inputError = document.getElementById("emailErrorMsg");
    inputError.innerHTML= "Invalid input. Note: obligatory field";
 
  return false
  }
  return true
}
  
// SENDING DATA FROM FORM USING POST

const sendOrder = (order, APIaddress) => {
  console.log(order);
  console.log(APIaddress)

  fetch (APIaddress, {
method: "POST",
body:JSON.stringify(order)
  }
  )
  .then (serverReponse=> {
    console.log(serverReponse)
  })
}


// DIPSPAYING THE ORDER NUMBER
const displayOrderNumber = () => {
  let min = 10000000
  let max = 99999999

  const orderId = Math.floor(Math.random() * (max - min)) + min;
  document.getElementById("orderId").innerHTML = orderId;
}

// SCRIPT DIVISION TO EXECUTE DEPENDING ON THE PAGE confirmation.html or cart.html
if (window.location.pathname.split("/").pop() == 'confirmation.html') {
  displayOrderNumber()
}
else if (window.location.pathname.split("/").pop() == 'cart.html') {
  const formSubmit = document.getElementById("order")
  formSubmit.addEventListener("click", event => {
    //prevents in this case means: refresh and validation
    event.preventDefault();
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
    if (validateForms(contact)) {
      const orderContent = {
        contact: contact,
        products: fetchCartArray().map(cartItem => cartItem.product._id),
      }
  
      sendOrder(orderContent, "http://localhost:3000/api/products/order")
  
      console.log(orderContent);
      window.location.href = "./confirmation.html";
    }
  }
  )
  
  // listening on click to validate and send order

  displayItemsAddedToCart()
  setQuantityAutoCalculation()
  activateDeleteButtons()
}