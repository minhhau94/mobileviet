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
                <p>Giá: ${formatCash(currentProduct.price)}</p>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" id="addToCartBtn" onclick="addToCart(${currentProduct.id})" ><i class="fa fa-shopping-cart"></i>đặt hàng</button>
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
    console.log(productList)
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
};

// GIỎ HÀNG
let cartItemList = [];

const addToCart = (id) => {
    for (let i = 0; i < productList.length; i++) {
        let newCartItem = productList[i];
        let quantity = "1";
        if (id == newCartItem.id) {
            let cartIem = new CartItem(
                newCartItem.id,
                newCartItem.name,
                newCartItem.price,
                newCartItem.img,
                +quantity,
            )
            // kiểm trả trong giỏ hàng đã có sản phẩm đó chưa
            let test = 0
            for (let i in cartItemList) {
                if (cartItemList[i].id == id) {
                    cartItemList[i].quantity++;
                    test = 1
                    break;
                }
            }
            if (test == 0) {
                cartItemList.push(cartIem);
            }
            console.log(cartIem);
        }
    }
    renderCartItemList(cartItemList);
}



const renderCartItemList = (data) => {
    var cartItemHTML = "";
    let totalPrice = 0;


    for (let i = 0; i < data.length; i++) {
        let currentCartItem = data[i];
        let amount = currentCartItem.price * currentCartItem.quantity;
        totalPrice += amount;
        cartItemHTML += `<tr>
                    <td><img src="${currentCartItem.img}"><span>${currentCartItem.name}</span></td>
                    <td><span>${formatCash(currentCartItem.price)}</span><sup>đ</sup></td>
                    <td><span>${currentCartItem.quantity}</span></td>
                    <td><span>${formatCash(amount)}</span></td>
                    <td><button onclick="deleteCartItem(${currentCartItem.id})"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>`;
    };

    document.getElementById("amount").innerHTML = formatCash(totalPrice);
    document.getElementById("tbodyCart").innerHTML = cartItemHTML;
}

const formatCash = (price) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return VND.format(price);
}

const showCart = () => {
    document.getElementById("cart").classList.toggle("hiddenCart")
}

const deleteCartItem = (id) => {
    let index = findCartItemId(id);
    cartItemList.splice(index, 1);
    renderCartItemList(cartItemList);

}

function findCartItemId(id) {
    for (var i = 0; i < cartItemList.length; i++) {
        if (cartItemList[i].id === id) {
            return i;
        }
    }
    return -1;
};

const vdPrice = 1239876;
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

console.log(VND.format(vdPrice));