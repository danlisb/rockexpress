// Mock data for cart
// In the final application, this data will come from the backend

const cart_data = []

function addToCart(product_id, quantity) {
    const existingItem = cart_data.find(item => item.product_id === product_id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart_data.push({ product_id, quantity });
    }
}

function removeFromCart(product_id) {
    const index = cart_data.findIndex(item => item.product_id === product_id);
    if (index !== -1) {
        cart_data.splice(index, 1);
    }
}

function getCart() {
    console.log("Cart data:", cart_data);
    
    return cart_data;
}

export { addToCart, removeFromCart, getCart };
