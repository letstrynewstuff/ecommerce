// import Location from "../models/Location.js";


// // @access  Admin
// export async function getLocations(req, res) {
//   try {
//     const locations = await Location.find().sort({ createdAt: -1 });
//     res.json(locations);
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }


// // @access  Public
// export async function trackLocation(req, res) {
//   try {
//     const { trackingCode } = req.params;
//     const location = await Location.findOne({ trackingCode });

//     if (!location) {
//       return res.status(404).json({ msg: "Tracking code not found" });
//     }

//     res.json({
//       trackingCode: location.trackingCode,
//       status: location.status,
//       from: location.from,
//       to: location.to,
//       currentLocation: location.currentLocation,
//       eta: location.eta,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }


// // @access  Admin
// export async function createLocation(req, res) {
//   const { trackingCode, from, to, currentLocation, eta, status } = req.body;

//   try {
//     let location = await Location.findOne({ trackingCode });
//     if (location) {
//       return res.status(400).json({ msg: "Tracking code already exists" });
//     }

//     location = new Location({
//       trackingCode,
//       from,
//       to,
//       currentLocation,
//       eta,
//       status: status || "Pending",
//     });

//     await location.save();
//     res.status(201).json(location);
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }

// // @desc    Update package (admin)
// // @route   PUT /api/locations/:trackingCode
// // @access  Admin
// export async function updateLocation(req, res) {
//   const { trackingCode } = req.params;
//   const { from, to, currentLocation, eta, status } = req.body;

//   try {
//     const location = await Location.findOne({ trackingCode });
//     if (!location) {
//       return res.status(404).json({ msg: "Tracking code not found" });
//     }

//     location.from = from ?? location.from;
//     location.to = to ?? location.to;
//     location.currentLocation = currentLocation ?? location.currentLocation;
//     location.eta = eta ?? location.eta;
//     location.status = status ?? location.status;

//     await location.save();
//     res.json(location);
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }

// // @desc    Delete package (admin)
// // @route   DELETE /api/locations/:trackingCode
// // @access  Admin
// export async function deleteLocation(req, res) {
//   const { trackingCode } = req.params;

//   try {
//     const location = await Location.findOne({ trackingCode });
//     if (!location) {
//       return res.status(404).json({ msg: "Tracking code not found" });
//     }

//     await location.deleteOne();
//     res.json({ msg: "Package removed" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }


import Location from "../models/Location.js";

// ================================
// GET ALL LOCATIONS (ADMIN)
// ================================
export async function getLocations(req, res) {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    console.error("❌ getLocations error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// ================================
// TRACK PACKAGE (PUBLIC)
// ================================
export async function trackLocation(req, res) {
  try {
    const { trackingCode } = req.params;

    // 🔍 DEBUG LOGS (VERY IMPORTANT)
    console.log("📦 Tracking code requested:", trackingCode);
    console.log("🗄️ Mongo URI in use:", process.env.MONGO_URI);

    const location = await Location.findOne({ trackingCode });

    if (!location) {
      console.warn("⚠️ Tracking code NOT found:", trackingCode);
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
    console.error("❌ trackLocation error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// ================================
// CREATE LOCATION (ADMIN)
// ================================
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
    console.error("❌ createLocation error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// ================================
// UPDATE LOCATION (ADMIN)
// ================================
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
    console.error("❌ updateLocation error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// ================================
// DELETE LOCATION (ADMIN)
// ================================
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
    console.error("❌ deleteLocation error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}
