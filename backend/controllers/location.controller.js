import Location from "../models/Location.js";

// @desc    Get all packages (admin)
// @route   GET /api/locations
// @access  Admin
export async function getLocations(req, res) {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc    Get package by tracking code (user)
// @route   GET /api/locations/track/:trackingCode
// @access  Public
export async function trackLocation(req, res) {
  try {
    const { trackingCode } = req.params;
    const location = await Location.findOne({ trackingCode });

    if (!location) {
      return res.status(404).json({ msg: "Tracking code not found" });
    }

    res.json({
      trackingCode: location.trackingCode,
      status: location.status,
      from: location.from,
      to: location.to,
      currentLocation: location.currentLocation,
      eta: location.eta,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc    Create new package (admin)
// @route   POST /api/locations
// @access  Admin
export async function createLocation(req, res) {
  const { trackingCode, from, to, currentLocation, eta, status } = req.body;

  try {
    let location = await Location.findOne({ trackingCode });
    if (location) {
      return res.status(400).json({ msg: "Tracking code already exists" });
    }

    location = new Location({
      trackingCode,
      from,
      to,
      currentLocation,
      eta,
      status: status || "Pending",
    });

    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc    Update package (admin)
// @route   PUT /api/locations/:trackingCode
// @access  Admin
export async function updateLocation(req, res) {
  const { trackingCode } = req.params;
  const { from, to, currentLocation, eta, status } = req.body;

  try {
    const location = await Location.findOne({ trackingCode });
    if (!location) {
      return res.status(404).json({ msg: "Tracking code not found" });
    }

    location.from = from ?? location.from;
    location.to = to ?? location.to;
    location.currentLocation = currentLocation ?? location.currentLocation;
    location.eta = eta ?? location.eta;
    location.status = status ?? location.status;

    await location.save();
    res.json(location);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc    Delete package (admin)
// @route   DELETE /api/locations/:trackingCode
// @access  Admin
export async function deleteLocation(req, res) {
  const { trackingCode } = req.params;

  try {
    const location = await Location.findOne({ trackingCode });
    if (!location) {
      return res.status(404).json({ msg: "Tracking code not found" });
    }

    await location.deleteOne();
    res.json({ msg: "Package removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}
