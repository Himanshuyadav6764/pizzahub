import axios from 'axios';

const handlePayment = async (selection, confirmOrder) => {
    try {
        console.log('Payment request for selection:', selection);
        
        // Convert USD to INR (1 USD = 80 INR approximately)
        const baseAmount = selection.price || selection.totalPrice || 6.25; // Default to 6.25 USD (500 INR)
        const amountInINR = Math.round(baseAmount * 80); // Convert to INR and round
        console.log('Amount to be charged (INR):', amountInINR);
        
        let response;
        let isUsingMock = false;
        
        try {
            // NOTE: Using mock payment as primary due to Razorpay credential issues
            // To use real Razorpay, uncomment the line below and comment the throw line
            // response = await axios.post('http://localhost:5000/api/payment/order', {
            
            throw new Error('Using mock payment for demonstration');
            
        } catch (realPaymentError) {
            console.warn('Using mock payment due to Razorpay issues:', realPaymentError.message);
            
            // Fallback to mock payment
            response = await axios.post('http://localhost:5000/api/payment/order-mock', {
                amount: amountInINR,
                currency: 'INR'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            isUsingMock = true;
        }

        console.log('Payment order response:', response.data);
        console.log('Using mock payment:', isUsingMock);
        
        const orderData = response.data;
        
        if (isUsingMock) {
            // Handle mock payment - simulate payment success
            console.log('Mock payment simulation starting...');
            
            // Show a confirmation dialog for mock payment
            const proceedWithMock = window.confirm(
                `🎭 MOCK PAYMENT MODE 🎭\n\n` +
                `Amount: ₹${amountInINR}\n` +
                `Order ID: ${orderData.id}\n\n` +
                `This is a simulation for testing purposes.\n` +
                `Click OK to simulate successful payment.`
            );
            
            if (proceedWithMock) {
                console.log('Mock payment confirmed by user');
                alert('🎉 Mock Payment Successful! Order confirmed.');
                confirmOrder();
            } else {
                console.log('Mock payment cancelled by user');
                alert('Payment cancelled.');
            }
            return;
        }
        
        // Real Razorpay payment flow
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'PIZZA_HUB',
            description: 'Pizza Order',
            order_id: orderData.id,
            handler: function (response) {
                console.log('Payment successful:', response);
                alert('Payment successful! Order confirmed.');
                confirmOrder();
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal closed');
                    alert('Payment cancelled by user.');
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#008080'
            }
        };

        const paymentObject = new window.Razorpay(options);
        
        paymentObject.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            alert(`Payment failed: ${response.error.description}`);
        });
        
        paymentObject.open();
    } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
    }
};

export default handlePayment;
