// Proxy del feed de precios Vantage MT5 (Solcla).
// Si el repo es público, mové la URL a una variable de entorno FEED_URL en Vercel.
const FEED = process.env.FEED_URL || 'https://solcla-oro.vercel.app/api/precios/142cAB3G-cj5A3PUKdcyAPA4TfIRw7rX0qqvPNMYyiLutUc4.txt';

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { cache: 'no-store' });
    if (!r.ok) throw new Error('feed ' + r.status);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(await r.text());
  } catch (e) {
    res.status(502).send('feed no disponible');
  }
};
