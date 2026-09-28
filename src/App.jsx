import { useState } from "react";

function App() {
  // Products
  const products = [
    { id: 1, name: "Laptop", price: 120000 },
    { id: 2, name: "Mouse", price: 2500 },
    { id: 3, name: "Keyboard", price: 5000 },
  ];

  // Cart state
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      // Agar product already cart mein hai
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Agar product pehli baar add ho raha hai
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Quantity increase
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Quantity decrease
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* Products */}
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>Rs. {product.price}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <hr />

      {/* Cart */}
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <strong>{item.name}</strong>

            <span> Rs. {item.price} </span>

            <button onClick={() => decreaseQuantity(item.id)}>-</button>

            <span> {item.quantity} </span>

            <button onClick={() => increaseQuantity(item.id)}>+</button>

            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}

      {/* Total */}
      <h2>Total: Rs. {total}</h2>
    </div>
  );
}

export default App;
