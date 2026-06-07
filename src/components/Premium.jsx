import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";

export const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        type,
      },
      { withCredentials: true },
    );
    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other Developer",
      order_id: orderId,
      // callback_url: "http://localhost:3000/payment-success",
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="m-10">
      {isUserPremium ? (
        <h1 className="font-bold text-3xl">You are Already a Premium User</h1>
      ) : (
        <div className="flex w-full">
          <div class="$$card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li> - Chat with other people</li>
              <li> - 100 connection Requests per day</li>
              <li> - Blue Tick</li>
              <li> - 3 Months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-secondary"
            >
              Buy Silver
            </button>
          </div>
          <div class="$$divider $$divider-horizontal">OR</div>
          <div class="$$card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> - Chat with other people</li>
              <li> - Infinite Connection Requests Per day</li>
              <li> - Blue Tick</li>
              <li> - 6 Months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-primary"
            >
              Buy Gold
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
