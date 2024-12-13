"use server";

import Razorpay from "razorpay";
import Payment from "@/models/payment";
import User from "@/models/user";
import connectDB from "@/db/connectDB";

export const initiate = async (amount, to_username, paymentForm) => {
  await connectDB();

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  const razorpayID = user.razorpayid;

  var instance = new Razorpay({
    key_id: razorpayID,
    key_secret: secret,
  });

  // Define the options object for creating the Razorpay order
  const options = {
    amount: amount * 100, // Razorpay requires the amount in the smallest currency unit (e.g., paise for INR)
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      name: paymentForm.name,
      message: paymentForm.message,
      to_user: to_username,
    },
  };

  let x = await instance.orders.create(options);
  // Create a payment object which shows a pending payment in the database
  const newPayment = new Payment({
    name: paymentForm.name,
    to_user: to_username,
    order_id: x.id,
    message: paymentForm.message,
    amount: amount,
  });
  newPayment.save();

  //   await Payment.create({
  //     name: paymentForm.name,
  //     to_user: to_username,
  //     order_id: x.id,
  //     message: paymentForm.message,
  //     amount: amount,
  //   });

  return x;
};

export const fetchUser = async (username) => {
  await connectDB();

  let uu = await User.findOne({ username: username });

  if (!uu) {
    throw new Error("User not found");
  }

  let user = uu.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchPayments = async (username) => {
  await connectDB();

  // Fetch payments and convert ObjectId and Date fields to strings
  const payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  // Serialize the data (convert _id and date fields)
  const serializedPayments = payments.map((payment) => ({
    ...payment,
    _id: payment._id.toString(), // Convert ObjectId to string
    createdAt: payment.createdAt?.toISOString(), // Convert Date to ISO string
    updatedAt: payment.updatedAt?.toISOString(), // Convert Date to ISO string
  }));

  return serializedPayments;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  //   let ndata = Object.fromEntries(data);
  let ndata = data;
  console.log({ data, oldusername });

  // If the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);

    //  Now update all the usernames in the Payments table
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
