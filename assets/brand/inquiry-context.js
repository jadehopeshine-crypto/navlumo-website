(() => {
  const start = () => {
    const detail = /^\/(?:by-vehicle\/[^/]+\/[^/]+|products\/rear-view-camera\/universal-car-camera\/[^/]+)\/$/.test(location.pathname);
    const title = document.querySelector('h1')?.textContent.trim().replace(/\s+/g, ' ');
    if (detail && title) {
      document.querySelectorAll('a').forEach(link => {
        let url;
        try { url = new URL(link.href, location.origin); } catch { return; }
        if (url.origin === location.origin && url.pathname === '/contact/') {
          url.searchParams.set('product', title);
          url.searchParams.set('source', location.pathname);
          url.hash = 'inquiry';
          link.href = url.pathname + url.search + url.hash;
        }
        if (url.hostname === 'wa.me') {
          let message = url.searchParams.get('text') || `Hello Navlumo, I would like a quote for ${title}.`;
          if (!message.includes(title)) message += ` Product: ${title}.`;
          if (!/quantity/i.test(message)) message += ' Quantity: __.';
          if (!/country|market/i.test(message)) message += ' Country / market: __.';
          url.searchParams.set('text', message);
          link.href = url.href;
        }
      });
    }
    // Conversion hooks contain no customer input. A click is never a successful inquiry.
    document.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      let channel;
      if (link.href.startsWith('https://wa.me/')) channel = 'whatsapp_click';
      if (link.href.startsWith('mailto:')) channel = 'email_click';
      if (channel) {
        const payload = { event: channel, page_path: location.pathname };
        window.dataLayer?.push(payload);
        document.dispatchEvent(new CustomEvent('navlumo:conversion', { detail: payload }));
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
