"use client";
import React from "react";
import PaymentPage from "@/components/paymentPage";

const UserName = ({ params }) => {
  const { username } = React.use(params);

  return (
    <>
      <PaymentPage u={username} />
    </>
  );
};
export default UserName;
