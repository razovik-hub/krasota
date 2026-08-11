// Приём заявок с лендинга → сообщение в Telegram.
//
// Работает как serverless-функция Vercel. Нужны два env в настройках проекта
// (Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN — токен бота из @BotFather
//   TELEGRAM_CHAT_ID   — id чата, куда слать (личка Сергея или общий с Мариной)
// Плейсхолдеры этих же переменных уже были в .env.local.example проекта Molodost.
//
// CORS открыт: формы стоят и на vercel.app, и на github.io.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { name = '', contact = '', source = '' } = req.body ?? {};
  if (!String(contact).trim()) return res.status(400).json({ error: 'contact required' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return res.status(503).json({ error: 'telegram is not configured' });

  const lines = [
    '🌸 Заявка: «Алхимия красоты»',
    '',
    `Имя: ${String(name).slice(0, 200) || '—'}`,
    `Контакт: ${String(contact).slice(0, 200)}`,
    `Со страницы: ${String(source).slice(0, 200) || '—'}`,
  ];

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text: lines.join('\n') }),
  });
  if (!tg.ok) return res.status(502).json({ error: 'telegram error' });

  return res.status(200).json({ ok: true });
}
