
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { referralCode } = await req.json();

    // Sostituisci questa parte con la chiamata al bot Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.bottoken}/createChatInviteLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '-1002178794545', // Sostituisci con l'ID o username del canale
        member_limit: 1, // Imposta il limite a un singolo uso
      }),
    });

    if (!telegramResponse.ok) {
      return NextResponse.json({ message: 'Failed to generate Telegram link' }, { status: 500 });
    }

    const data = await telegramResponse.json();
    return NextResponse.json({ telegramLink: data.result.invite_link }, { status: 200 });

  } catch (error) {
    console.error('Error generating Telegram link:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
