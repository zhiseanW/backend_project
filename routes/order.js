const express = require("express");
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const router = express.Router();

const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/", isUserValid, async (req, res) => {
  try {
    const orders = await getOrders(req.user);
    console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", isUserValid, async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, products, totalPrice, status } =
      req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice,
      status
    );
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
      paid_at,
    } = req.body;
    const updatedOrder = await updateOrder(
      req.params.id,
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
      paid_at
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (order) {
      await deleteOrder(id);
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
