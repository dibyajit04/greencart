const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Calculate total
    let total = 0;
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ msg: `Not enough stock for ${item.product.name}` });
      }
      total += item.product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total
    });

    // Decrease product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ msg: "Error placing order", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('items.product');
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders", error: err.message });
  }
};
