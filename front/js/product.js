//USING PROPERTY  WINDOW.LOCATION.HREF TO GET/RETURN THE ENTIRE URL OF THE CURRENT PAGE 

console.log(window.location.href)

//USING SLICE METHOD TO OBTAIN PRODUCT ID FROM URL STRING
//SLICE METHOD EXTRACTS PART OF A STRING URL AND RETURNS THE EXTRACTED PART IN A NEW STRING.

const getProductId = () => {
   let url = window.location.href; 
   let index = url.lastIndexOf ("?id=");
   let id = url.slice (index, url.length);
   id = id.slice(4, url.length);

   return id
}


getProductId ()



//FUNCTION TO FETCH PRODUCT DETAILS FROM API BASED ELEMENT ID
const itemProductContainer =document.getElementById("item");
let fetchedProduct;
const fetchProduct = async () => {
   let ProductId = getProductId();
   await fetch("http://localhost:3000/api/products/"+ProductId)
   //in order to add string + text
   .then((response) => response.json())
   .then((data) => (fetchedProduct= data))

       .catch(err => console.log(err))
}

fetchProduct ()

//FUNCTION TO DISPLAY PRODUCT WITH ITS DETAILS ON PRODUCT PAGE
//USING METHOD CREATEELEMENT AND FUNCTION FOREACH TO CREATE NEW OPTION FOR COLOR ARRAY 
const displayProduct = async () => {
await fetchProduct()
document.getElementById("title").innerText=fetchedProduct.name;
// "name" comes from Product.js
document.getElementsByClassName("item__img")[0].innerHTML=`<img src=${fetchedProduct.imageUrl} alt=${fetchedProduct.altTxt}>`;
document.getElementById("price").innerText=fetchedProduct.price;
document.getElementById("description").innerText=fetchedProduct.description;
let selectedColorContainer = document.getElementById("colors");
// "colors" comes from Product.js
fetchedProduct.colors.forEach(color => {
   // color - my variable, one element from array COLORS
   let newOption = document.createElement("option")
   // createElement is a method
   newOption.innerText=color;
   newOption.value=color;
   // <option value="vert">vert</option>
selectedColorContainer.appendChild(newOption);
});
}
displayProduct()
//DEFINE LOCAL STORAGE 
const localStorage = window.localStorage;
 // Function ADD ELEMENT
 const addElementToCart = (fetchedProduct, color, quantity) => {
   //check if Cart exists in Local storage - meaning: check if user has already clicked on ADD TO CART
   // Or = || and '' means empty; null means nothing
   if (localStorage.getItem("cart")===null || localStorage.getItem("cart")==='')
   {
      //creates empty array
      localStorage.setItem("cart",JSON.stringify ([]))
      console.log("Initialized Local Storage")
  }
  let cartItem = {
     product: fetchedProduct,
     color: color,
     quantity: quantity
  }
  console.log(localStorage.cart)
  // DECLARE CART
let cart = JSON.parse(localStorage.cart)
console.log(cart)
//FONCTION TO FIND PRODUCT,  && means "and"
let foundProduct = cart.find(element => element.product._id===cartItem.product._id && element.color===cartItem.color)
console.log(foundProduct)
if (foundProduct===undefined){
   cart.push(cartItem)
}
else {
   //parseInt : change quantity to type: number
   
   foundProduct.quantity=parseInt(foundProduct.quantity)
   // console.log(typeof foundProduct.quantity)
   foundProduct.quantity+=parseInt(cartItem.quantity)
}

localStorage.setItem("cart",JSON.stringify (cart))
}
//ADDING ADDEVENTLISTENER - A METHOD LOOKING FOR SPECIFIED EVENT - IN THIS CASE IT IS USER'S ACTION: CLICK
document.getElementById("addToCart").addEventListener("click", () => {
console.log("click");

//Get selected proprietes 
let color = document.getElementById("colors").value
let quantity = document.getElementById("quantity").value

//    localStorage.setItem("products",JSON.stringify([fetchedProduct]));
// console.log(localStorage)
addElementToCart(fetchedProduct, color, quantity)
 
console.log(localStorage)
});

