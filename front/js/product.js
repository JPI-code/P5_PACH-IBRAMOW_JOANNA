console.log(window.location.href)

const getProductId = () => {
   let url = window.location.href; 
   let index = url.lastIndexOf ("?id=");
   let id = url.slice (index, url.length);
   id = id.slice(4, url.length);

   console.log (id)
}


getProductId ()