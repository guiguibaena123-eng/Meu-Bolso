// Envia a dica de investimento do dia como notificação para o iPhone (Web Push).
// Roda todo dia pelo GitHub Actions. Segredos usados: VAPID_PRIVATE_KEY e PUSH_SUBSCRIPTION.
import fs from 'node:fs';
import webpush from 'web-push';

const VAPID_PUBLIC = 'BLisVhIKuRcbup2Cz4EGIswYNhKAhzQ7Z3fOTpQEZYQTXBct855g5Or5Dfb9DXRVkJZsFaRmR5igTUVRuXzMZU0';
const SITE = 'https://guiguibaena123-eng.github.io/Meu-Bolso/';
const dry = process.argv.includes('--dry');

const dicas = JSON.parse(fs.readFileSync(new URL('./dicas.json', import.meta.url), 'utf8'));
const dia = Math.floor((Date.now() - 3 * 3600e3) / 86400e3); // dia no horário de Brasília
const dica = dicas[dia % dicas.length];
const payload = JSON.stringify({
  title: dica.t,
  body: dica.b,
  url: SITE,
});

if (dry) {
  console.log('Dica de hoje (' + (dia % dicas.length + 1) + '/' + dicas.length + '):', dica.t, '-', dica.b);
  process.exit(0);
}

const privateKey = (process.env.VAPID_PRIVATE_KEY || '').trim();
const raw = (process.env.PUSH_SUBSCRIPTION || '').trim();
if (!privateKey || !raw) {
  console.log('Falta configurar o segredo ' + (!privateKey ? 'VAPID_PRIVATE_KEY' : 'PUSH_SUBSCRIPTION') + ' no GitHub. Nada foi enviado.');
  process.exit(0);
}

let subscription;
try { subscription = JSON.parse(raw); } catch { console.error('PUSH_SUBSCRIPTION não é um JSON válido. Copie de novo o código do app.'); process.exit(1); }

webpush.setVapidDetails(SITE, VAPID_PUBLIC, privateKey);
try {
  const r = await webpush.sendNotification(subscription, payload, { TTL: 6 * 3600, urgency: 'normal' });
  console.log('Enviado. Status', r.statusCode);
} catch (e) {
  console.error('Falha ao enviar. Status', e.statusCode, e.body || e.message);
  if (e.statusCode === 404 || e.statusCode === 410) console.error('O iPhone cancelou este código. Ative as dicas de novo no app e atualize o segredo PUSH_SUBSCRIPTION.');
  process.exit(1);
}
