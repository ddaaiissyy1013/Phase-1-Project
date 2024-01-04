let jsonData;
document.getElementById("brands-container").style.display = 'block';
document.getElementById("categories-container").style.display = 'block';
document.getElementById("categories-container").innerHTML = '';

document.addEventListener('DOMContentLoaded', () => {
    
    let currentCategory = null;
    let currentBrand = null;

    

    function fetchProducts() {
        // document.getElementById("brands-container").style.display = 'block';
        // document.getElementById("categories-container").style.display = 'block';
        // document.getElementById("categories-container").innerHTML = '';

        fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                document.getElementById("search-input").addEventListener("change", function (event) {
                    event.preventDefault()
                    console.log(event.target.value)
                    search_string = event.target.value
                    searchProducts(data, search_string);
                    // console.log(event.target) 
                 });
                
                setCategories(data);
            });
    }
    // fetchProducts();
    document.getElementById("theme-switcher").addEventListener("click", fetchProducts);

    

    // function fetchProducts() {
        

    //     fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             jsonData = data;
    //             setCategories(data);
    //         });
    // }

    function setCategories(data) {
        let categories = [...new Set(data.map(obj => obj.product_type))];
        
        categories.forEach((category) => {
            let categoryBtn = document.createElement("button");
            categoryBtn.textContent = category;

            categoryBtn.addEventListener("click", (e) => {
                e.preventDefault()

                currentCategory = category;
                //document.getElementById("categories-container").style.display = 'none';
                fetchBrands(category, data);
            });

            document.getElementById("categories-container").appendChild(categoryBtn);
        });
    }

    function fetchBrands(category, data) {
        document.getElementById("brands-container").innerHTML = '';
        document.getElementById("products-container").innerHTML = '';

        let brands = [...new Set(data.filter(obj => obj.product_type === category).map(obj => obj.brand))];

        brands.forEach((brand) => {
            let brandBtn = document.createElement("button");
            brandBtn.textContent = brand;

            brandBtn.addEventListener("click", (e) => 
            {
                e.preventDefault

                currentBrand = brand;
                document.getElementById("brands-container").style.display = 'none';
                displayProductsBTN(brand, data.filter(obj => obj.product_type === currentCategory && obj.brand === brand));
            });
            document.getElementById("brands-container").appendChild(brandBtn);
        });
    }

    

    function displayProductsBTN(brand, data) {
        document.getElementById("products-container").innerHTML = '';
        console.log(data)
            data?.forEach((item) => {
            console.log(item)
            let product = document.createElement("div");

            let img = document.createElement("img");
            img.src = item.image_link;
            img.alt = item.name + " picture";
            img.title = "Type: " + item.product_type + ", Price: $" + item.price;
            product.appendChild(img);

            let productName = document.createElement("p");
            productName.textContent = item.name;
            product.appendChild(productName);

            document.getElementById("products-container").appendChild(product);
        });
    }

    function searchProducts(data, query) {
        console.log(query)
        console.log(data)
        let searchWord = query.toLowerCase()
        let filteredProducts = data?.filter(product =>
            product["product_type"]?.toLowerCase().includes(searchWord) || product.brand?.toLowerCase().includes(searchWord)
            || product.name?.toLowerCase().includes(searchWord) || product.brand?.toLowerCase().includes(searchWord)
        )

        console.log(filteredProducts)

        displayProducts(filteredProducts);
    }
    
    function displayProducts(data) {
        document.getElementById("products-container").innerHTML = '';
        console.log(data)
            data?.forEach((item) => {
            console.log(item)
            let product = document.createElement("div");

            let img = document.createElement("img");
            img.src = item.image_link;
            img.alt = item.name + " picture";
            img.title = "Type: " + item.product_type + ", Price: $" + item.price;
            product.appendChild(img);

            let productName = document.createElement("p");
            productName.textContent = item.name;
            product.appendChild(productName);

            document.getElementById("products-container").appendChild(product);
        });
    }
    

});
