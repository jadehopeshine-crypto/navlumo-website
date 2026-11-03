const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
for(const [route,title] of [['android-car-radio','8 Inch Car Radio Renault Android Auto For Dacia 2013-2017'],['dacia-8-inch-medianav-android-car-stereo','8 Inch Touch Screen Car Stereo Medianav Android Auto for Dacia']]){
const p=path.join(root,'by-vehicle/renault',route,'index.html');if(!fs.existsSync(p))continue;let h=fs.readFileSync(p,'utf8');
const mail='mailto:sales@navlumo.com?subject='+encodeURIComponent(title+' Inquiry');
const wa='https://wa.me/8617620780022?text='+encodeURIComponent('Hello Navlumo, I would like a quote for '+title+'. Vehicle model: __. Year: __. Quantity: __. Country: __. Please confirm fitment and available configurations.');
if(h.includes('<aside id="product-inquiry"')){
h=h.replace(/<aside id="product-inquiry"[\s\S]*?<\/aside>/,'');
const section=h.match(/<section class="product-overview"[\s\S]*?<\/section>/)[0];
let updated=section.replace(/<a class="pd-text-link" href="#compatibility"/,'<div class="inline-actions" id="product-contact"><a class="pd-button" href="'+mail+'">Email Us</a><a class="pd-button outline" href="'+wa+'" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div><a class="pd-text-link" href="#compatibility"');
h=h.replace(section,updated);
}
h=h.replaceAll('href="#product-inquiry"','href="'+mail+'"').replaceAll("document.getElementById('product-quote-form').addEventListener", "document.getElementById('product-quote-form')?.addEventListener");
if(!h.includes('id="direct-contact-layout"'))h=h.replace('</head>','<style id="direct-contact-layout">.product-overview{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr)}@media(max-width:767px){.product-overview{grid-template-columns:minmax(0,1fr)}}</style></head>');
fs.writeFileSync(p,h);
if(h.includes('<aside id="product-inquiry"')||!h.includes('>Email Us</a>'))throw Error('Contact validation failed');
}
console.log('Both Renault pages use direct email and WhatsApp buttons; enquiry panels removed.');
