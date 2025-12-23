


import { Router } from "express";
const router = Router();
import { getProducts, getProductById, createProduct, seedProducts } from "../controllers/product.controller.js";

router.post("/seed/all", seedProducts); // ✅ FIRST
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById); // ✅ LAST

// TEMP: Delete all products
router.delete("/reset", async (req, res) => {
  try {
    await Product.deleteMany(); // deletes all products
    res.json({ msg: "All products deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});
// router.post("/seed/all", seedProducts);

export default router;
