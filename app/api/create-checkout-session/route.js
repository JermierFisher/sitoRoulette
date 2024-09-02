import Stripe from 'stripe';

const stripe = new Stripe(process.env.Stripe);

export async function POST(req) {
  const { email, referralCode } = await req.json();

  // Fallback per l'URL di origine, nel caso in cui req.headers.origin non sia definito
  const origin = req.headers.origin || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pre-Order Bot Telegram AI Casino',
            },
            unit_amount: 3500, // L'importo è in centesimi, quindi 5000 equivale a $50.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&referralCode=${referralCode}`,
      cancel_url: `${origin}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), { status: 500 });
  }
}
