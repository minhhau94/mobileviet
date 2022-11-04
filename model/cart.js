class CartItem {
    constructor(id, productName, price, image, quantity) {
        this.id = id;
        this.productName = productName;
        this.price = price
        this.img = image;
        this.quantity = quantity; 
        this.calcPrice = function () {
            return (this.price * this.quantity);
        };            
    };
}