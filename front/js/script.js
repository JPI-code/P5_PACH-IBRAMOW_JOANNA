// /**
//  * This function will edit Element
//  * @param {string} id 
//  */

// function editElement (id){
//     element = document.getElementById(id)
//     console.log(element.children)
// }
// editElement(id="items");


const itemListContainer = document.getElementById("items");
let fetchedItems = [];
const fetchItems = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => (fetchedItems = data))
        .catch(err => console.log(err))
};

const displayItems = async () => {
    await fetchItems()

    itemListContainer.innerHTML = fetchedItems.map(
        (item) =>  
    `
    <a href="./product.html?id=${item._id}">
    <article>
      <img src=${item.imageUrl} alt=${item.altTxt}>
      <h3 class="productName">${item.name}</h3>
      <p class="productDescription">${item.description}</p>
    </article>
  </a>
    `
    )   

};

displayItems ();


