import { loadStripe } from '@stripe/stripe-js';

export const createStripeSession = async (lang, items) => {
	const { REACT_APP_API_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

	if (!REACT_APP_STRIPE_PUBLISHABLE_KEY) {
		throw new Error('Stripe ключ не заданий у .env файлі');
	}

	try {
		const stripe = await loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

		const res = await fetch(`${REACT_APP_API_URL}/checkout/create-session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ items }),
		});

		if (!res.ok) {
			throw new Error('Не вдалося створити Stripe сесію');
		}

		const data = await res.json();

		if (data.id) {
			localStorage.setItem('donationSuccess', 'true');
			await stripe.redirectToCheckout({ sessionId: data.id });
		}
	} catch (err) {
		console.error('Stripe error:', err);
	}
};
