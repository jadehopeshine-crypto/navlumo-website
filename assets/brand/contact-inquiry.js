(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('inquiry-status');
  const submit = form.querySelector('[type="submit"]');
  const note = document.getElementById('inquiry-delivery-note');
  const emailButton = document.getElementById('inquiry-email');
  const waButton = document.getElementById('inquiry-whatsapp');
  const query = new URLSearchParams(location.search);
  const field = name => form.elements.namedItem(name);
  const validateContact = () => {
    const value = field('contact').value.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const phone = /^\+?[\d\s().-]{7,30}$/.test(value) && value.replace(/\D/g, '').length >= 7;
    field('contact').setCustomValidity(value && !email && !phone ? 'Please enter a valid email or WhatsApp number with country code.' : '');
  };
  field('contact').addEventListener('input', validateContact);
  field('product').value = (query.get('product') || '').slice(0, 250);
  field('vehicle').value = (query.get('vehicle') || '').slice(0, 150);
  const source = query.get('source');
  field('source').value = source && /^\/(?!\/)[^?#]*$/.test(source) ? source : '';
  let endpoint = '';
  let busy = false;
  const message = () => [...new FormData(form)].filter(([key,value]) => value && key !== '_gotcha').map(([key,value]) => `${key}: ${value}`).join('\n');
  const updateLinks = () => {
    const body = message();
    emailButton.href = 'mailto:sales@navlumo.com?subject=' + encodeURIComponent('Navlumo inquiry: ' + (field('product').value || field('vehicle').value || 'Product selection')) + '&body=' + encodeURIComponent(body);
    waButton.href = 'https://wa.me/8617620780022?text=' + encodeURIComponent('Hello Navlumo,\n' + body);
  };
  form.addEventListener('input', updateLinks);
  updateLinks();
  fetch('/assets/brand/inquiry-config.json?v=20261109-1', { cache: 'no-store' }).then(r => r.ok ? r.json() : {}).then(config => {
    if (/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.formspreeEndpoint || '')) {
      endpoint = config.formspreeEndpoint;
      submit.textContent = 'Send Inquiry';
      note.textContent = 'Your inquiry will be sent through Formspree to our sales team. Please share business requirements only. Photos can be sent later by WhatsApp or email.';
    }
  }).catch(() => {});
  form.addEventListener('submit', async event => {
    event.preventDefault();
    validateContact();
    if (busy || !form.reportValidity()) return;
    updateLinks();
    if (!endpoint) {
      location.href = emailButton.href;
      status.textContent = 'Your email app has been requested. Please press Send there to deliver your inquiry. If it does not open, use WhatsApp below. Your inquiry has not been submitted on this website.';
      return;
    }
    busy = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = 'Sending your inquiry…';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const data = new FormData(form);
      if (field('contact').value.includes('@')) data.set('email', field('contact').value.trim());
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Submission was not confirmed');
      status.textContent = 'Thank you. Your inquiry was submitted successfully. Our team will review your requirements and contact you.';
      window.dataLayer?.push({ event: 'inquiry_submit_success', page_path: location.pathname });
      document.dispatchEvent(new CustomEvent('navlumo:conversion', { detail: { event: 'inquiry_submit_success', page_path: location.pathname } }));
      form.reset();
      updateLinks();
    } catch {
      status.textContent = 'We could not confirm submission. Your details are still here. Please try again or use WhatsApp / email below. If you already received confirmation, avoid resending.';
    } finally {
      clearTimeout(timer);
      busy = false;
      submit.disabled = false;
      submit.textContent = 'Send Inquiry';
    }
  });
})();
