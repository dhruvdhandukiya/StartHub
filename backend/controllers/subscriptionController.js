// controllers/subscriptionController.js
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Get subscription plans
exports.getPlans = async (req, res) => {
  try {
    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 299,
        currency: 'INR',
        period: 'month',
        features: [
          'Access to basic startup profiles',
          'Limited messaging (50 messages/month)',
          'Basic analytics',
          'Email support'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 799,
        currency: 'INR',
        period: 'month',
        features: [
          'Full startup profile access',
          'Unlimited messaging',
          'Advanced analytics & insights',
          'Priority support',
          'Video call integration',
          'Investment opportunity alerts'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 1999,
        currency: 'INR',
        period: 'month',
        features: [
          'All Premium features',
          'Dedicated account manager',
          'Custom reporting',
          'API access',
          'White-label solutions',
          '24/7 phone support',
          'Advanced security features'
        ]
      }
    ];

    res.json({
      success: true,
      data: { plans }
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription plans'
    });
  }
};

// Create Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    const planDetails = {
      basic: { amount: 29900, name: 'Basic Plan' },
      premium: { amount: 79900, name: 'Premium Plan' },
      enterprise: { amount: 199900, name: 'Enterprise Plan' }
    };

    const selectedPlan = planDetails[plan];
    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected'
      });
    }

    const shortUserId = (userId || 'user').toString().substring(0, 10);
    const timestamp = Date.now().toString().substring(6);
    const receiptId = `sub_${shortUserId}_${timestamp}`;

    const order = await razorpay.orders.create({
      amount: selectedPlan.amount,
      currency: 'INR',
      receipt: receiptId,
      payment_capture: 1
    });

    res.json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: order,
        plan: selectedPlan
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create subscription order'
    });
  }
};

// Validate payment and activate subscription
exports.validatePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment validation data'
      });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      console.error('❌ Subscription payment validation failed: Invalid signature');
      return res.status(400).json({
        success: false,
        message: 'Payment validation failed - Invalid signature'
      });
    }

    const planDetails = {
      basic: { amount: 29900 },
      premium: { amount: 79900 },
      enterprise: { amount: 199900 }
    };
    const selectedPlan = planDetails[plan] || planDetails.premium;

    const subscription = await Subscription.create({
      user: userId,
      plan: plan || 'premium',
      status: 'active',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: selectedPlan.amount,
      currency: 'INR',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    await User.findByIdAndUpdate(userId, {
      isSubscribed: true,
      'subscription.plan': plan || 'premium',
      'subscription.status': 'active',
      'subscription.currentPeriodEnd': subscription.currentPeriodEnd
    });

    res.json({
      success: true,
      message: 'Payment validated and subscription activated successfully',
      data: { subscription }
    });
  } catch (error) {
    console.error('Error validating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate payment: ' + error.message
    });
  }
};

// Get user's current subscription
exports.getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({ 
      user: userId,
      status: 'active'
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subscription || null
    });
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription'
    });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        status: 'canceled',
        cancelAtPeriodEnd: true
      },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    await User.findByIdAndUpdate(subscription.user, {
      'subscription.status': 'canceled',
      'subscription.cancelAtPeriodEnd': true
    });

    res.json({
      success: true,
      message: 'Subscription will be canceled at the end of billing period',
      data: subscription
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel subscription'
    });
  }
};