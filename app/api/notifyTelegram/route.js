
import axios from 'axios';

export async function POST(req) {
  const { email, referralCode, referrer } = await req.json(); // Estrai anche il referrer

  try {
    // Costruisci il messaggio da inviare a Telegram
    let message = `Nuova iscrizione:\nEmail: ${email}\nCodice Referral: ${referralCode}`;

    // Aggiungi il referrer al messaggio se è presente
    if (referrer) {
      message += `\nReferral da: ${referrer}`;
    }

    // Invia il messaggio al canale Telegram
    await axios.post(`https://api.telegram.org/bot${process.env.bottoken}/sendMessage`, {
      chat_id: '-1002234753608',
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending message to Telegram', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send message to Telegram' }), { status: 500 });
  }
}
