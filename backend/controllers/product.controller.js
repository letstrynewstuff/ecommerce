// backend/controllers/product.controller.js (Add product data seeding example if needed)
// For the product list mentioned: Add descriptions, etc.
// You can run this once to seed products
// GET all products

import Product from "../models/Product.js";

// GET all products
export async function getProducts(req, res) {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}


// GET product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// CREATE product (admin later)
// export async function createProduct(req, res) {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// }

export async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// Example seeding function (optional, call via a route or script)
export async function seedProducts(req, res) {
  try {
    const productsData = [
      // 6 iPhones with description, battery minutes, release date
      {
        name: "Sentinel VPro",
        category: "phones",
        price: 2999,
        description: "High-end smartphone with A15 Bionic chip.",
        specs: [
          "Battery: 3095 mAh (up to unlimited minutes talk time)",
          "Release Date: 2021-09-24",
        ],
        image: "/uploads/phone1.jpg",
      },
      {
        name: "Aegis Core",
        category: "phones",
        price: 2799,
        description: "Improved camera and battery life.",
        specs: [
          "Battery: 3279 mAh (up to 1320 minutes talk time)",
          "Release Date: 2022-09-16",
        ],
        image: "/uploads/phone2.jpeg",
      },
      {
        name: "IronVault X1x",
        category: "phones",
        price: 1199,
        description: "Titanium frame, A17 Pro chip.",
        specs: [
          "Battery: 4441 mAh (up to 1040 minutes talk time)",
          "Release Date: 2023-09-22",
        ],
        image: "/uploads/phone3.jpeg",
      },
      {
        name: "TitanLock Pro (2022)",
        category: "phones",
        price: 2429,
        description: "Compact design with powerful performance.",
        specs: [
          "Battery: 2018 mAh (up to 900 minutes talk time)",
          "Release Date: 2022-03-18",
        ],
        image: "/uploads/phone4.jpeg",
      },
      {
        name: "Fortis One",
        category: "phones",
        price: 1699,
        description: "Small form factor with 5G.",
        specs: [
          "Battery: 2227 mAh (up to 620 minutes talk time)",
          "Release Date: 2020-11-13",
        ],
        image: "/uploads/phone5.jpeg",
      },
      {
        name: "Obsidian Guard",
        category: "phones",
        price: 1499,
        description: "Dual-camera system, all-day battery.",
        specs: [
          "Battery: 3110 mAh (up to 480 minutes talk time)",
          "Release Date: 2019-09-20",
        ],
        image: "/uploads/phone6.jpeg",
      },

      // 6 Laptops
      {
        name: "TitanEdge",
        category: "laptops",
        price: 3999,
        description: "Lightweight laptop with M2 chip.",
        specs: ["Battery: Up to 1080 minutes", "Release Date: 2022-07-15"],
        image: "/uploads/laptop1.jpeg",
      },
      {
        name: "AegisBook Pro",
        category: "laptops",
        price: 2599,
        description: "Pro performance for creators.",
        specs: ["Battery: Up to 1320 minutes", "Release Date: 2023-11-07"],
        image: "/uploads/laptop2.jpeg",
      },
      {
        name: "SteelCore X",
        category: "laptops",
        price: 1299,
        description: "Ultra-thin Windows laptop.",
        specs: ["Battery: Up to 720 minutes", "Release Date: 2023-01-05"],
        image: "/uploads/laptop3.jpeg",
      },
      {
        name: "ObsidianBook",
        category: "laptops",
        price: 1199,
        description: "Convertible 2-in-1 design.",
        specs: ["Battery: Up to 780 minutes", "Release Date: 2022-02-28"],
        image: "/uploads/laptop4.jpeg",
      },
      {
        name: "Sentinel Ultra",
        category: "laptops",
        price: 1399,
        description: "Business-grade durability.",
        specs: ["Battery: Up to 900 minutes", "Release Date: 2023-03-15"],
        image: "/uploads/laptop5.jpeg",
      },
      {
        name: "Fortress 15",
        category: "laptops",
        price: 1499,
        description: "Gaming laptop with AMD Ryzen.",
        specs: ["Battery: Up to 600 minutes", "Release Date: 2023-02-08"],
        image: "/uploads/laptop6.jpeg",
      },

      // 3 Radios
      {
        name: "Motorola R7",
        category: "radios",
        price: 599,
        description: "Digital two-way radio.",
        specs: ["Battery: Up to 1680 minutes", "Release Date: 2022-05-10"],
        image: "/uploads/radio1.jpg",
      },
      {
        name: "Hytera PD782",
        category: "radios",
        price: 499,
        description: "Rugged handheld radio.",
        specs: ["Battery: Up to 1440 minutes", "Release Date: 2021-08-20"],
        image: "/uploads/radio2.jpg",
      },
      {
        name: "Kenwood NX-5300",
        category: "radios",
        price: 699,
        description: "Multi-protocol digital radio.",
        specs: ["Battery: Up to 1560 minutes", "Release Date: 2023-04-15"],
        image: "/uploads/radio3.jpg",
      },

      // 2 Satellites (assuming satellite phones)
      {
        name: "Iridium 9575 Extreme",
        category: "satellite",
        price: 1399,
        description: "Satellite phone for remote areas.",
        specs: [
          "Battery: Up to 240 minutes talk time",
          "Release Date: 2011-11-01",
        ],
        image: "/uploads/satellite1.jpeg",
      },
      {
        name: "Inmarsat IsatPhone 2",
        category: "satellite",
        price: 999,
        description: "Global satellite communication.",
        specs: [
          "Battery: Up to 480 minutes talk time",
          "Release Date: 2014-03-01",
        ],
        image: "/uploads/satellite2.jpeg",
      },

      // 4 Intercoms
      {
        name: "Clear-Com HelixNet",
        category: "intercom",
        price: 2499,
        description: "Digital networked intercom.",
        specs: ["Power: Continuous operation", "Release Date: 2020-06-15"],
        image: "/uploads/intercom1.jpg",
      },
      {
        name: "Riedel Bolero",
        category: "intercom",
        price: 3499,
        description: "Wireless intercom system.",
        specs: ["Battery: Up to 1020 minutes", "Release Date: 2018-09-20"],
        image: "/uploads/intercom2.jpg",
      },
      {
        name: "Telex RTS",
        category: "intercom",
        price: 1999,
        description: "Matrix intercom for broadcast.",
        specs: ["Power: Wired", "Release Date: 2019-04-10"],
        image: "/uploads/intercom3.jpg",
      },
      {
        name: "Hollyland Solidcom",
        category: "intercom",
        price: 899,
        description: "Wireless headset intercom.",
        specs: ["Battery: Up to 600 minutes", "Release Date: 2022-01-05"],
        image: "/uploads/intercom4.jpg",
      },

      // 2 Networks (assuming network devices)
      {
        name: "Cisco Catalyst 9300",
        category: "networks",
        price: 4999,
        description: "Enterprise network switch.",
        specs: ["Power: Redundant", "Release Date: 2017-06-20"],
        image: "/uploads/network1.jpg",
      },
      {
        name: "Netgear Nighthawk",
        category: "networks",
        price: 299,
        description: "High-speed Wi-Fi router.",
        specs: ["Coverage: Up to 2500 sq ft", "Release Date: 2021-03-15"],
        image: "/uploads/network2.jpg",
      },
    ];

    await Product.deleteMany(); // prevent duplication
    const result = await Product.insertMany(productsData);

    res.status(201).json({
      msg: "Products seeded successfully",
      count: result.length,
    });
  } catch (err) {
    console.error("Seeding Error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
}
