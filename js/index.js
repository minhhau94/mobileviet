let productList = [];

const renderProduct = (data) => {
    if (!data) data = productList;

    var productHTML = "";

    for (let index in data) {
        let currentProduct = data[index];

        productHTML += `<div class="col">
        <div class="item">
            <div class="item-top">
                <div class="image">
                    <img id="productImg" src="${currentProduct.img}"
                        alt="">
                </div>
                <div class="item-info">
                    <h5>Cấu hình:</h5>
                    <ul>
                        <li>Màn hình: ${currentProduct.screen}</li>
                        <li>Camera sau: ${currentProduct.backCamera}</li>
                        <li>Camera trước: ${currentProduct.frontCamera}</li>
                        <li>Pin ${currentProduct.battery}</li>                        
                    </ul>
                    <p>${currentProduct.describe}</p>
                    <div class="add-to-cart">
                        <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                    </div>
                </div>
            </div>
            <div class="item-bottom">
                <a href="#">${currentProduct.name}</a>
                <p>Giá: ${currentProduct.price}</p>
            </div>
        </div>
    </div>`;  
    };

    document.getElementById("productRow").innerHTML = productHTML;
}

const getProductList = async () => {
    try {
        const res = await axios({
            url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/products/phones",
            method: "GET",
        });

        productList = mapData(res.data);
        renderProduct();
        console.log("done");
    } catch (error) {
        console.log(error);
    };
}

const mapData = (dataFromAPI) => {
    let result = [];

  for (var i = 0; i < dataFromAPI.length; i++) {
    let oldProduct = dataFromAPI[i];
    let newProduct = new Product(
        oldProduct.id,
        oldProduct.type,
        oldProduct.name,
        oldProduct.price,
        oldProduct.screen,
        oldProduct.backCamera,
        oldProduct.frontCamera,
        oldProduct.battery,
        oldProduct.img,
        oldProduct.describe,
        
    );
    result.push(newProduct);
  }
  console.log(result);
  return result;
}

window.onload = () => {
    console.log("window load");
    getProductList();
};