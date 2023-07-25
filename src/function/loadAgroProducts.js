const loadAgroProducts = (products) => {
    fetch('http://localhost:5001/products')
        .then(response => response.json())
        .then(data => {
            products.value = data;
        })
        .catch(error => {
            console.log(error);
        });
}

export default loadAgroProducts;