import { Request, Response } from 'express';

// PAYMENT INTENT
const createIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const mockIntent = {
      id: 'pi_' + Math.random().toString(36).substring(2, 11),
      amount,
      currency,
      client_secret:
        'secret_' + Math.random().toString(36).substring(2, 11),
    };

    return res.status(200).json(mockIntent);
  } catch (err: any) {
    console.log('Create intent error:', err.message);

    return res.status(500).json({
      message: `Create intent error: ${err.message}`,
    });
  }
};

// CONFIRM PAYMENT
const confirmPayment = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (err: any) {
    console.log('Confirm payment error:', err.message);

    return res.status(500).json({
      message: `Confirm payment error: ${err.message}`,
    });
  }
};

// WEBHOOK
const webhook = async (req: Request, res: Response) => {
  try {
    return res.status(200).send('Webhook Received');
  } catch (err: any) {
    console.log('Webhook error:', err.message);

    return res.status(500).json({
      message: `Webhook error: ${err.message}`,
    });
  }
};

export const PaymentController = {
  createIntent,
  confirmPayment,
  webhook,
};