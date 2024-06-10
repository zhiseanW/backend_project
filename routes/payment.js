const express = require("express");
// setup router
const router = express.Router();
const { verifyPayment } = require("../controllers/payment");

// route for payment verification
router.post("/", async (req, res) => {
  try {
    const { billplz_id, billplz_paid, billplz_paid_at, billplz_x_signature } =
      req.body;
    const order = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
