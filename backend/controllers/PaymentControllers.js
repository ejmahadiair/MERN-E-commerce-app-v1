//external imports
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51KgX5rFfaGHcvoIpuuors2wnGp9vchr6anuNmFj49Xo6AjTjQetpmvIpMJTmzGN1w8lGRaYZVZD4brNBxvvxIRXZ00vlEQqgxV"
);
//
//internal imports
//

//controllers functions

exports.processPayment = async (req, res, next) => {
  let payment;
  try {
    payment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        companny: "Ecommerce",
      },
    });
  } catch (e) {
    console.log("Problem in process payment");
    return res.status(500).json({ message: e.message, success: false, e });
  }
  if (!payment) {
    return res.status(402).json({
      message: "Payment Required | Payment did not complete... Try again.",
      success: false,
    });
  }
  return res.status(202).json({
    message: "Process Accepted",
    success: true,
    client_secret: payment.client_secret,
  });
};

exports.sendStripeApiKey = async (req, res, next) => {
  return res.status(200).json({
    message: "Stripe Api Key",
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
};

//
