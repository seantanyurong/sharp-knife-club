import { redirect } from 'next/navigation';

import { stripe } from '../../../lib/stripe.js';

import { Button } from '@/components/ui/button';

export default async function Return({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const { status } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <div className="bg-secondary min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-xl text-primary">
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-4">
              Thank you for trusting your blades with Knife Sharpening SG! We
              will send a confirmation message via WhatsApp, shortly.
            </p>
            <p className="mt-2">
              If you have any questions, please drop us a message.
            </p>
            <Button
              asChild
              variant="whatsapp"
              size="lg"
              className="w-full mt-8"
            >
              <a
                href={`https://wa.me/6580684206`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Questions? Ask us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }
}
