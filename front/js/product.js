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

// Add Event Listener 
document.getElementById("addToCart").addEventListener("click", () => {
console.log("click");

   localStorage.setItem("products",JSON.stringify([fetchedProduct]));
console.log(localStorage)
 });