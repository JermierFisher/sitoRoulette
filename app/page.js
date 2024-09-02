"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlotMachine, faDice, faPlane, faBlackjack } from '@fortawesome/free-solid-svg-icons';


export default function HomePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    // Ottieni i parametri della query string dalla URL
    const params = new URLSearchParams(window.location.search);

    // Controlla se c'è un codice referral nella query string
    if (params.has('ref')) {
      setReferrer(params.get('ref'));
    }

    // Genera un codice referral solo lato client
    const generateReferralCode = () => {
      const code = Math.random().toString(36).substring(2, 15);
      setReferralCode(code);
    };
    generateReferralCode();
  }, []);

  const notifyReferral = async () => {
    try {
      await axios.post('/api/notifyTelegram', { email, referralCode, referrer });
    } catch (error) {
      console.error('Error sending to Telegram', error);
      setError('Si è verificato un errore durante l\'invio al canale Telegram. Riprova.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePayment = async () => {
    if (!email) {
      setError('Per favore, inserisci una email valida.');
      return;
    }

    setLoading(true);
    try {
      // Notifica il canale Telegram con email, referralCode e referrer
      await notifyReferral();

      // Crea il link di pagamento usando la tua rotta API
      const response = await axios.post('/api/create-checkout-session', {
        email,
        referralCode,
        referrer,
      });

      const { url } = response.data;
      window.location.href = url; // Reindirizza l'utente al link di pagamento Stripe
    } catch (error) {
      console.error('Error during payment', error);
      setError('Si è verificato un errore durante il pagamento. Riprova.');
      setLoading(false);
    }
  };
  return (
    <>

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8">
          <div className="card w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden mb-8">
            <figure className="px-10 pt-10">
              <img src="./logo.webp" alt="Exclusive Offer" className="rounded-xl shadow-lg" />
            </figure>
            <div className="card-body text-center p-8">
              <h2 className="card-title text-4xl font-extrabold text-gray-900">
                Pre-Order Esclusivo: Accedi al Nuovo Bot Telegram
              </h2>
              <p className="text-gray-700 mt-6 leading-relaxed">
                Il nostro reparto IT ha sviluppato un rivoluzionario Bot Telegram, sfruttando l'intelligenza artificiale e la statistica avanzata per aumentare le tue probabilità di vittoria nei casinò online. Questo bot ti aiuterà a giocare in modo più strategico, offrendo un vantaggio competitivo senza precedenti.
              </p>
              <p className="text-gray-700 mt-6 leading-relaxed">
                Disponibile ora in pre-order a <strong className="text-blue-600 text-2xl">35€</strong> (anziché <span className="line-through">49€</span>).
              </p>
            </div>
          </div>

          <div className="w-full max-w-xl bg-white shadow-2xl rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Giochi Supportati dal Bot</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700"><FontAwesomeIcon icon={faDice} size="2x" /> Roulette</h4>
                <p className="text-gray-600 mt-2">Strategie avanzate per massimizzare le tue vincite.</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-purple-700"><FontAwesomeIcon icon={faPlane} size="2x" /> Aviator</h4>
                <p className="text-gray-600 mt-2">Tattiche mirate per sfruttare al meglio ogni volo.</p>
              </div>
              <div className="p-4 bg-pink-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-pink-700"><FontAwesomeIcon icon={faSlotMachine} size="2x" /> Slot</h4>
                <p className="text-gray-600 mt-2">Ottimizza le tue giocate per aumentare le probabilità di jackpot.</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-yellow-700"><FontAwesomeIcon icon={faBlackjack} size="2x" /> Blackjack</h4>
                <p className="text-gray-600 mt-2">Migliora le tue decisioni per battere il banco.</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl bg-white shadow-2xl rounded-lg p-6 mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Nessuna Registrazione Richiesta</h3>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Con l'acquisto non verrà chiesta nessuna registrazione a nessun sito di casinò: potrai utilizzare il bot su qualsiasi piattaforma desideri, senza vincoli o obblighi.
            </p>
          </div>

          <div className="w-full max-w-xl bg-white shadow-2xl rounded-lg p-6 text-center">
            <p className="text-red-600 font-bold text-lg">
              Attenzione: L'offerta scadrà in un giorno a caso da oggi fino al 10 ottobre!
            </p>
            <p className="text-red-600 font-bold text-lg mt-2">
              Dopo il pre-order, il prezzo sarà di 49€, quindi non perdere l'occasione!
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Riceverai anche un <strong className="text-blue-600 text-2xl">Buono Amazon da 10€</strong> per ogni persona che acquista il pre-order tramite il tuo link di affiliazione!
            </p>
            <p className="text-blue-600 font-bold text-xl mt-4">
              Più condividi, più guadagni: non c'è limite ai buoni che puoi accumulare!
            </p>
            <div className="form-control mt-8">
              <input
                type="email"
                placeholder="Inserisci la tua email"
                className="input input-bordered w-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm"
                value={email}
                onChange={handleEmailChange}
                disabled={loading}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mt-8">
              <button
                className={`btn btn-primary w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none py-3 rounded-lg shadow-lg text-lg font-bold ${loading ? 'loading' : ''}`}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processando...' : `Pre-Order Ora: 35€ (Anziché 49€)`}
              </button>
            </div>
          </div>
        </div>
        </>
  );
}
