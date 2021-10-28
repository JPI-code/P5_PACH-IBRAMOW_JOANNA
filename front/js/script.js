

//FUNCTION TO FETCH ALL PRODUCTS BY THEIR ID FROM API 


const itemListContainer = document.getElementById("items");
let fetchedItems = [];
const fetchItems = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => (fetchedItems = data))
        .catch(err => console.log(err))
};

//FUNCTION TO DISPLAY PREVIOUSLY FETCHED PRODUCTS ON HOMEPAGE USING MAPPING METHOD
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
//CALL THE FUNCTION TO EXECUTE/LAUNCH IT
displayItems ();


