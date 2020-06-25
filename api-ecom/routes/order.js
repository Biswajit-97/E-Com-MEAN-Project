const express = require("express");
const router = express.Router();



const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controller/order");

//params
router.param("orderId", getOrderById);


//Actual routes
//create
router.post(
  "/order/create",

  createOrder
);

router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrderById );




module.exports = router;
