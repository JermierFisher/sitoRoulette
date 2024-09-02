import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <title>Pre-Order Esclusivo: Bot Telegram per Casinò Online</title>
      <meta name="description" content="Acquista il pre-order per accedere al nostro bot Telegram, sviluppato per migliorare le tue probabilità di vittoria nei giochi di casinò. Guadagna 10€ di buono Amazon per ogni referral!" />
      <meta name="keywords" content="pre-order, bot telegram, casinò, roulette, slot, blackjack, aviator, intelligenza artificiale, buono amazon, affiliazione" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="Pre-Order Esclusivo: Bot Telegram per Casinò Online - Guadagna Buoni Amazon!" />
      <meta property="og:description" content="Ottieni accesso al nostro bot Telegram avanzato per casinò online. Migliora le tue probabilità di vincita con AI e statistiche. Guadagna 10€ di buono Amazon per ogni referral!" />
      <meta property="og:image" content="https://sito-roulette.vercel.app/logo.webp" />
      <meta property="og:url" content="https://sito-roulette.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Pre-Order Esclusivo: Bot Telegram per Casinò Online - Guadagna Buoni Amazon!" />
      <meta name="twitter:description" content="Acquista il pre-order per accedere al nostro bot Telegram avanzato per giochi di casinò. Offerta limitata! Guadagna 10€ di buono Amazon per ogni referral!" />
      <meta name="twitter:image" content="https://sito-roulette.vercel.app/logo.webp" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
