const express = require("express");

const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();
const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getProducts(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getProduct(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newProduct = await addProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image, music } = req.body;
    const updatedProduct = await updateProduct(
      req.params.id,
      name,
      description,
      price,
      category,
      image,
      music
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
