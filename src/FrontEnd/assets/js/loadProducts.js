function loadProducts() {
    let fatherElementProduct = document.getElementById('index-product-container');

    if (fatherElementProduct !=null) {
        
        for (let x = 0; x < 30; x++) {
            let novoProduto = document.createElement('div');
            novoProduto.className = "index-product-quad";

            novoProduto.innerHTML = `
            <div class="index-product-quad">
            <a class="index-product-quad-link" href="productPage.html">
            <div class="index-product-quads-image">
                <div class="index-product-quads-image-balls">
                    <div class="index-product-quads-image-balls-icon"></div>
                    <div class="index-product-quads-image-balls-icon"></div>
                    <div class="index-product-quads-image-balls-icon"></div>
                    <div class="index-product-quads-image-balls-icon"></div>
                </div>
            </div>  
            <hr>
            
            <div class="index-product-name-container">
                <span class="index-product-name">Nome do produto</span>
                <span class="index-product-description">Lorem ipsum dolor sit Lorem ipsum dolor sit... </span>
            </div>

            <div class="index-product-price-container">
                <span class="index-product-old-price">R$ 4.000,00</span>
                <span class="index-product-price">R$ 1.200,00</span>
                <span class="index-product-percentage-promotion"><sup>30% OFF</sup></span>
                <span class="index-product-installments">em 12x de R$ 100 sem juros</span>

                <span class="index-product-free-shipping">Frete grátis</span>
            </div>
        </div></a>
            `;
            
            fatherElementProduct.appendChild(novoProduto);
        }
    } 
}

loadProducts();
