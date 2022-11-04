// QUẢN LÝ SẢN PHẨM
let productList = [];

function renderProductTable() {
  var tableHTML = "";
  for (var i = 0; i < productList.length; i++) {
    var currentProduct = productList[i];
    // dùng `` để viết chuỗi ở nhiều dòng
    // để viết chuỗi + biến: "chuỗi 1" + biến +"chuỗi 2" hoặc "chuỗi 1 ${biến} chuỗi 2"
    tableHTML += `<tr>
                <td>${currentProduct.id}</td>
                <td>${currentProduct.img}</td>
                <td>${currentProduct.typel}</td>
                <td>${currentProduct.productName}</td>
                <td>${currentProduct.screen}</td>
                <td>${currentProduct.backCamera}</td>
                <td>${currentProduct.frontCamera}</td>
                <td>${currentProduct.battery}</td>
                <td>${currentProduct.describe}</td>
                <td>${currentProduct.price}</td>
                <td>
                  <button onclick="deleteStudent('${currentProduct.id}')" class="btn btn-danger">Xoá</button>

                  <button onclick="getUpdateStudent('${currentStudent.id
      }')" class="btn btn-info">Sửa</button>
                </td>
              </tr>`;
  }
  document.getElementById("tbodyProduct").innerHTML = tableHTML;
}

function getProductTableList() {
  // gửi request xuống backend +> ds sinh viên
  // hàm axios chạy khi gắn CND axios vào
  var promise = axios({
    url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/products/phones",
    method: "GET",
  });
  // nếu thành công gọi then chạy (cho phép truyền vào 1 callback, khi backend trả dữ liệu thành công thì chạy then), nếu thất baiuj gọi catch chạy (ra orror)
  promise.then(function (response) {
    productList = mapTableData(response.data);
    console.log(response);
    renderProductTable();
  }).catch(function (error) {
    console.log(error);
  });
}

function mapTableData(productListLocal) {
  var result = [];
  for (var i = 0; i < productListLocal.length; i++) {
    var oldProduct = productListLocal[i];
    var newProduct = new Product(
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
  getProductTableList();
};

function createProduct() {
  var isFormValid = validateForm();

  if (!isFormValid) return;

// 1.lấy input 
//   var id = document.getElementById("txtId").value;  
  var type = document.getElementById("txtType").value;
  var name = document.getElementById("txtName").value;
  var price = +document.getElementById("txtPrice").value;
  var screen = document.getElementById("txtScreen").value;
  var backCamera = document.getElementById("txtBackCamera").value;
  var frontCamera = document.getElementById("txtFrontCamera").value;
  var battery = document.getElementById("txtBattery").value;
  var img= document.getElementById("txtImg").value;
  var describe = document.getElementById("txtDesc").value;

  // 3. tạo object sinh viên mới (input)
  var newProduct = new Product(
    id,
    type,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    battery,
    img,
    describe,
  );

  axios({
    url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/products/phones",
    method: "POST",
    data: newProduct,
  }).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
}

function validateForm() {
  // kiểm tra form
  var productName = document.getElementById("txtName").value;
  var type = document.getElementById("txtType").value;
  var price= document.getElementById("txtPrice").value;
  var image= document.getElementById("txtImg").value;

  // để xét từng lệnh có thể lông trong if nhưng nhiều code
  // vd: if (required(studentId, "spanMaSV")){
  //   length(studentId, "spanMaSV", 6, 9)};
  // có thể dùng toán tử logic && để xét từng vế
  var isValid = true;
  // &&= trả về giá trị true howcj false
  // isValid &&= true => isValid = isValid && true

  isValid &= required(productName, "spanName") && length(productName, "spanName", 6, 9);
  isValid &= required(type, "spanType");
  isValid &= required(price, "spanPrice") && number(price, "spanPrice");
  isValid &= required(image, "spanImg");


  return isValid;
  // nếu isValid true => form ok
  // nếu isValid false => forn error
}

function required(val, spanId) {
  // lấy thuộc tính ID của thẻ span
  if (val.length === 0) {
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}
function length(val, spanId, min, max) {
  if (!min) min = 6;
  if (!max) min = 9;

  if (val.length < min || val.length > max) {
    document.getElementById(spanId).innerHTML = `*Độ dài phải từ ${min} tới ${max} kí tự`;
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function number(val, spanId) {
  var pattern = /[0-9]/;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = `*Chỉ chấp nhận kí tự số`;
  return false;
}