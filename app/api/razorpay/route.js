import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import Razorpay from "razorpay";
import User from "@/models/user";
import connectDB from "@/db/connectDB";

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);

  const razorpayOrderId = body.razorpay_order_id;
  if (!razorpayOrderId) {
    return NextResponse.json({
      success: false,
      message: "Order ID is missing",
    });
  }

  // Check if razorpayOrderId is present on the server
  let p = await Payment.findOne({ order_id: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json("Order Id not found");
  }

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: p.to_user });
  const secret = user.razorpaysecret;

  // Verify the payment
  let xx = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (xx) {
    // Update the payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { order_id: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Verification Failed",
    });
  }
};
