# Inquiry receiving setup

The public `assets/brand/inquiry-config.json` currently has no receiving endpoint. The contact form deliberately retains **Prepare Email Inquiry**, explains that the visitor must press Send in their mail app, and offers WhatsApp. It does not claim to store or submit inquiries.

To enable managed receiving with Formspree:

1. The site owner signs in to their Formspree account (or creates one) and creates a form addressed to `sales@navlumo.com`. Verify the receiving email and enable spam filtering / domain restriction for `navlumo.com` in that service. Check its current plan limits first.
2. Set `formspreeEndpoint` in `assets/brand/inquiry-config.json` to the public form URL, `https://formspree.io/f/FORM_ID`. Never put an API secret in this file. Using a different service requires adapting the response handling and updating the visitor disclosure.
3. Deploy. Submit clearly identified test inquiries from desktop and mobile. Verify the actual saved entries in the provider dashboard and notifications in the receiving mailbox, including spam. The existing local mock test verifies UI behavior only; it does not prove notification delivery.
4. Only after these checks describe direct receiving as operational. Test a failed submission as well: entered details must remain and WhatsApp/email must still work.

## Measurement

`inquiry-context.js` emits `whatsapp_click` and `email_click`. The contact form emits `inquiry_submit_success` only after the service confirms success. Hooks use an existing `window.dataLayer`, if present, and a `navlumo:conversion` DOM event. They do not create a reporting dashboard or send customer-entered data to analytics. Connect an approved analytics service before claiming click totals are recorded. A click is not a delivered message or a qualified lead.

Record qualified B2B inquiries, quotations, samples and orders separately in the owner's private follow-up sheet. Suggested columns:

`Received date | Source | Product/model | Company | Contact | Market | Quantity | Qualification | Stage | Owner | Next follow-up | Notes`

Stages: new inquiry → requirements confirmed → quotation → sample → order / closed. Keep real customer records outside this public repository. Review the private sheet regularly; follow-up reminders are not automatically configured.

## Product facts

HT185 is now identified in the visible product title. Its existing FAQ distinguishes the supplied “Diamond 2K” packaging from the specified AHD 1080P / CCD output. Do not change its resolution, waterproof rating, camera compatibility or other hardware specifications without confirmed product information. Existing Jeep and Renault product content remains intact.
