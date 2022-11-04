// ĐƯA SẢN PHẨM LÊN GIAO DIỆN
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
                    
                </div>
            </div>
            <div class="item-bottom">
                <a href="#">${currentProduct.name}</a>
                <p>Giá: ${currentProduct.price}<sup>đ</sup></p>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" id="addToCartBtn" onclick="addToCart(${currentProduct.id})" ><i class="fa fa-shopping-cart"></i> đặt hàng</button>
                </div>
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
    return result;
}

window.onload = () => {
    console.log("window load");
    getProductList();
    getCartItemList();
};

// GIỎ HÀNG
let cartItemList = [];

const renderCartItemList = (data) => {
    if (!data) data = cartItemList;
    var cartItemHTML = "";     

    for (let i = 0; i < data.length; i++) {
        let currentCartItem = data[i];
        cartItemHTML += `<tr>
                    <td><img src="${currentCartItem.img}"><span>${currentCartItem.productName}</span></td>
                    <td><span>${currentCartItem.price}</span><sup>đ</sup></td>
                    <td><input type="number" value="1" min="1"></td>
                    <td><span>${currentCartItem.calcPrice()}</span><sup>đ</sup></td>
                    <td><button><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>`;
    };
    document.getElementById("tbodyCart").innerHTML = cartItemHTML;
}

const getCartItemList = async () => {
    try {
        const res = await axios({
            url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/products/cart",
            method: "GET",
        });

        cartItemList = mapCartData(res.data);
        renderCartItemList(cartItemList);
        console.log("done");
    } catch (error) {
        console.log(error);
    };
}

const mapCartData = (dataFromAPI) => {
    let result = [];

    for (var i = 0; i < dataFromAPI.length; i++) {
        let oldCartItem = dataFromAPI[i];
        let newCartItem = new CartItem(
            oldCartItem.id,
            oldCartItem.productName,
            oldCartItem.price,
            oldCartItem.img,
            oldCartItem.quantity,
        );
        result.push(newCartItem);
    }
    return result;
}

function createCartItem(id) {
    var newCartItem = new Object();


    for (let i = 0; i < productList.length; i++) {

        if (id == productList[i].id) {
            newCartItem.id = productList[i].id;
            newCartItem.productName = productList[i].name;
            newCartItem.price = productList[i].price;
            newCartItem.img = productList[i].img;
        }
    }
    axios({
        url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/products/cart",
        method: "POST",
        data: newCartItem,
    }).then(function (res) {
        console.log(res);
    }).catch(function (error) {
        console.log(error);
    });
    renderCartItemList(newCartItem);
    
}

function addToCart(id) {
    alert("đưa vào giỏ hàng sp có id là" + id);

    let existCartItemList = false;

    for (let i = 0; i < cartItemList.length; i++) {
        // nếu tồn tại thì tăng số lượng
        if (id == cartItemList[i].id) {
            cartItemList[i].quantity++;
            return
        }
    };
    // nếu không tồn tại => tạo đối tượng mới
    if (existCartItemList == false) {
        createCartItem(id);
        // let cartItem = createCartItem(id);
        // cartItemList.push(cartItem);
    };    
}