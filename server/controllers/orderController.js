// Placed Order COD : /api/order/cod
import productModel from "../models/Product.js";
import orderModel from "../models/order.js";
import userModel from "../models/User.js";
import stripe from "stripe";

//  order with cash on delivery
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length == 0) {
      return res.json({ success: false, message: "Invalid data" });
    }
    let amount = await items.reduce(async (acc, item) => {
      const prod = await productModel.findById(item.product);
      return (await acc) + prod.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    res.json({ success: false, message: `changeStock ${error.message}` });
  }
};

// order with online payment // /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    const { origin } = req.headers;

    if (!address || items.length == 0) {
      // address nhi hai
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];

    // calculation on amount
    let amount = await items.reduce(async (acc, item) => {
      const prod = await productModel.findById(item.product);
      productData.push({
        name: prod.name,
        price: prod.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + prod.offerPrice * item.quantity;
    }, 0);

    // 2 % tax
    amount += Math.floor(amount * 0.02);

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: true,
    });

    // Stripe gateway initialise
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // craete session

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.json({ success: false, message: `changeStock ${error.message}` });
  }
};

// Stripe webhooks to verify payments Action : /stripe
export const stripeWebHooks = async (request, response) => {
  // Stripe gateway initialise
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }

  // handle the event

  switch (event.type) {
    case "event_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;

      // Mark payment as paid

      await orderModel.findByIdAndUpdate(orderId, {
        isPaid: true,
        paymentType: "Online",
      });
      await userModel.findOneAndUpdate(userId, {
        cartItems: {},
      });
      break;
    }

    case "event_intent.paymentfailed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      console.log(orderId, userId);

      const { orderId } = session.data[0].metadata;

      await orderModel.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.error(`Unhandled event type ${event.type}`);
      break;

      response.json({ recieved: true });
  }
};

// Order details of individual users : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({
        userId,
        $or: [{ paymentType: "COD" }, { isPaid: true }], // syntactic sugar
      })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all orders (for seller / admin ) : /api/order/sellers

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({
        $or: [{ paymentType: "COD" }, { isPaid: true }], // syntactic sugar
      })
      .populate("items.product address")
      .sort({ created: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
