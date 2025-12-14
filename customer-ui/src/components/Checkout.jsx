import React, {useContext, useState} from 'react';
import axios from '../api/axios.js';
import {toast} from "react-toastify";
import ThemeContext from "../context/ThemeContext.jsx";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Checkout = () => {
    const {PRIMARY_COLOR} = useContext(ThemeContext);
    const [orderId, amount, name, email, phone] = ["order-1", 1000.00, "Sabareesh S", "sabareeshs786@gmail.com", "+91 9150471488"];
    const [loading, setLoading] = useState(false);
    const totalAmountInPaise = amount;



    const handlePayment = async () => {
        setLoading(true);

        try {
            const orderResponse = await axios.post(`/payment/initiate`, {
                orderId: orderId,
                amount: totalAmountInPaise,
                currency: 'INR'
            });

            const { razorpayOrderId, currency } = orderResponse.data;

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: totalAmountInPaise,
                currency: currency,
                name: 'Bite',
                description: `Payment for Order #${orderId}`,
                order_id: razorpayOrderId,
                handler: async function (response) {

                    const verificationData = {
                        orderId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    try {
                        const verifyResponse = await axios.post(`/payment/verify`, verificationData);
                    } catch (error) {
                        toast.error(error);
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: PRIMARY_COLOR
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on('payment.failed', async function (response) {
                try {
                    const verifyResponse = await axios.put(`/payment/failed`, {
                        orderId,
                        razorpayOrderId
                    });
                } catch (error) {
                    toast.error(error);
                }
            });

        } catch (error) {
            console.error('Error initiating payment:', error);
            toast.error('Could not initiate payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
            {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
        </button>
    );
};

export default Checkout;