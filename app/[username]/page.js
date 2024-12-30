"use client";
import React from "react";
import PaymentPage from "@/components/paymentPage";

const UserName = ({ params }) => {
  let { username } = React.use(params);

  return (
    <>
      <PaymentPage u={username} />
    </>
  );
};
export default UserName;
