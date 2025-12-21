import Order from "../models/Order.js";

// @desc    Update order location (Admin only)
export async function updateOrderLocation(req, res) {
  const { latitude, longitude, note } = req.body;
  const orderId = req.params.id;

  // Validate lat/lng bounds
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res
      .status(400)
      .json({ msg: "Invalid latitude or longitude values" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    // Update current location
    order.currentLocation = { latitude, longitude };

    // Add to history
    order.locationHistory.push({
      latitude,
      longitude,
      note,
      date: new Date(),
    });

    await order.save();
    res.json({ msg: "Location updated successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc    Get order location
// @route   GET /api/orders/:id/location
export async function getOrderLocation(req, res) {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.json({
      currentLocation: order.currentLocation,
      locationHistory: order.locationHistory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}
