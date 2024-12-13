"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchPayments, fetchUser, initiate } from "@/actions/userAction";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentPage = (props) => {
  const { data: session } = useSession();
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [release, setRelease] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [paymentDone, setPaymentDone] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let totalAmount = release;
    payments.map((donates) => {
      return (totalAmount += donates.amount);
    });

    setRelease(totalAmount);
  }, [payments]);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isNameValid =
      paymentForm.name.length >= 3 && paymentForm.name.length <= 18;
    const isMessageValid =
      paymentForm.message.length >= 3 && paymentForm.message.length <= 100;
    const isAmountValid = paymentForm.amount > 0;

    setIsDisabled(!(isNameValid && isMessageValid && isAmountValid));
  }, [paymentForm]);

  const getData = async () => {
    try {
      let uu = await fetchUser(props.u);
      setCurrentUser(uu);
      if (uu) {
        setUserExists(true);
      }

      let DbPayments = await fetchPayments(props.u);
      setPayments(DbPayments);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [props.u]); // changed, run when props.u changes

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      setPaymentDone(true);

      setTimeout(() => {
        setPaymentDone(false);
        router.push(`/${props.u}`);
      }, 5000);
    }
  }, []);

  const pay = async (amount) => {
    if (!session) {
      alert("You have to sign in for payment.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      let a = await initiate(amount, props.u, paymentForm);
      let orderId = a.id;

      var options = {
        key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Fundora", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[415px]">
        <div
          className="flex flex-col items-center p-8 rounded-lg shadow-md bg-white"
          style={{ boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 text-center mb-6">
            We encountered an unexpected error. Please try again later or
            contact support.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition duration-200"
            >
              Retry
            </button>
            <button
              onClick={() => (window.location.href = "/")} // Replace with your homepage route
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <div className="text-center h-[260px] mt-8">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-14 h-14 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (!userExists) {
    return (
      <div className="flex flex-col items-center justify-center h-[415px]">
        <div
          className="flex flex-col items-center p-8 rounded-lg shadow-md bg-white"
          style={{ boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            User Not Found
          </h1>
          <p className="text-gray-600 text-center mb-6">
            The user you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => (window.location.href = "/")} // Replace with your homepage route
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />

      {paymentDone && (
        <div className="flex justify-end">
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mx-8 mt-8 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">
              Payment done successfully.
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#toast-success"
              aria-label="Close"
              onClick={() => {
                setPaymentDone(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center w-[98vw] mt-12">
        <div
          className=" flex flex-col items-center justify-center gap-3 h-96 p-12 rounded-3xl"
          style={{ boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-20 h-20 rounded-full">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={currentUser.profilePic}
              alt="User-Avatar"
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">{`@${props.u}`}</h1>
            <p className="text-sm text-gray-700">{currentUser.role}</p>
          </div>

          <div className="flex gap-10 text-center mt-5">
            <div>
              <h4 className="font-bold">{payments.length}</h4>
              <p className="text-gray-800">Supporters</p>
            </div>
            <div>
              <h4 className="font-bold">
                {/* {payments[0].name} - &#8377;{payments[0].amount}
                {payments[0].name} - &#8377;{payments[0].amount} */}
                {payments.length === 0
                  ? "No Top Supporter"
                  : `${payments[0].name} - ₹${payments[0].amount}`}
              </h4>
              <p className="text-gray-800">Top Supporter</p>
            </div>
            <div>
              <h4 className="font-bold">&#8377;{release}/-</h4>
              <p className="text-gray-800">Release</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex">
        <div className="flex justify-center w-[50vw]">
          <div className="relative overflow-x-auto w-[43vw]">
            <h1 className="text-lg font-bold mb-4 text-center">
              Top Supporters
            </h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 border-[1px] border-gray-200 border-solid">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Donation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {}
                {payments.length > 0 ? (
                  payments.slice(0, 3).map((donates) => {
                    return (
                      <tr key={donates._id} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {donates.name}
                        </th>
                        <td className="px-6 py-4">₹{donates.amount}</td>
                        <td className="px-6 py-4">{donates.message}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">No Data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center w-[50vw]">
          <div className="w-[40vw]">
            <h1 className="text-lg font-bold mb-4 text-center">
              Make a Payment
            </h1>
            <div className="mb-2">
              <input
                autoComplete="off"
                required
                onChange={handleChange}
                value={paymentForm.name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name (between 3-18 characters)"
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-2">
              <input
                autoComplete="off"
                required
                onChange={handleChange}
                value={paymentForm.message}
                type="text"
                name="message"
                id="message"
                placeholder="Enter Message (between 3-100 characters)"
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-2">
              <input
                autoComplete="off"
                required
                onChange={handleChange}
                value={paymentForm.amount}
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter Amount (at least 1 rupee)"
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* {isDisabled && (
              <p className="text-[red] text-xs mb-2">
                Name must be between 3-18 characters. Message must be between
                3-100 characters. And amount at least 1 rupees.
              </p>
            )} */}

            <button
              className={
                isDisabled
                  ? "w-[100%] text-center text-white bg-blue-800 font-medium rounded-lg text-base px-7 py-2 me-2 mb-2 cursor-pointer"
                  : "w-[100%] text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2 me-2 mb-2 cursor-pointer"
              }
              onClick={() => {
                let a = parseInt(paymentForm.amount);
                pay(a);
              }}
              type="submit"
              disabled={isDisabled}
            >
              Pay
            </button>

            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  pay(10);
                }}
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg px-2.5 py-2 duration-100 ease-in hover:bg-gray-200"
              >
                Pay ₹10
              </button>
              <button
                onClick={() => {
                  pay(20);
                }}
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg px-2.5 py-2 duration-100 ease-in hover:bg-gray-200"
              >
                Pay ₹20
              </button>
              <button
                onClick={() => {
                  pay(50);
                }}
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg px-2.5 py-2 duration-100 ease-in hover:bg-gray-200"
              >
                Pay ₹50
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
