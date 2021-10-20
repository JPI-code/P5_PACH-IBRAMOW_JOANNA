console.log(window.location.href)

const getProductId = () => {
   let url = window.location.href; 
   let index = url.lastIndexOf ("?id=");
   let id = url.slice (index, url.length);
   id = id.slice(4, url.length);

   return id
}


getProductId ()


// http://localhost:3000/api/products

// const itemListContainer = document.getElementById("items");
// let fetchedItems = [];
// const fetchItems = async () => {
//     await fetch("http://localhost:3000/api/products")
//     .then((response) => response.json())
//     .then((data) => (fetchedItems = data))
//         .catch(err => console.log(err))
// };


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
// console.log(fetchedProduct)

const displayProduct = async () => {
await fetchProduct()
document.getElementById("title").innerText=fetchedProduct.name;
// "name" comes from Product.js
document.getElementById("price").innerText=fetchedProduct.price;
document.getElementById("description").innerText=fetchedProduct.description;
let selectedColorContainer = document.getElementById("colors");
// "colors" comes from Product.js
fetchedProduct.colors.forEach(color => {
   // color - my variable, one element from array COLORS
   let newOption = document.createElement("option")
   // createElement is a methode
   newOption.innerText=color;
   newOption.value=color;
   // <option value="vert">vert</option>
selectedColorContainer.appendChild(newOption);
});
}
displayProduct()
// Define Local Storage
const localStorage = window.localStorage;
 // Function ADD ELEMENT
 const addElementToCart = (fetchedProduct, color, quantity) => {
   //check if Cart exists in Local storage - meaning somebody has already clicked on ADD TO CART
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
// Fonction to find product, && means "and"
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
// Add Event Listener 
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

