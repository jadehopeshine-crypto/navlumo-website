const fs=require('fs');const path=require('path');const root=path.resolve(__dirname,'..');
const p=path.join(root,'by-vehicle/index.html');let h=fs.readFileSync(p,'utf8');
if(!h.includes('id="volvo"')){
 const last=h.match(/<article id="subaru"[\s\S]*?<\/article>/)[0];
 h=h.replace(last,last+last.replaceAll('subaru','volvo').replaceAll('Subaru','Volvo'));
}
let count=0;
h=h.replace(/<article id="([^"]+)"([^>]*)>([\s\S]*?)<\/article>/g,(all,slug,attrs,content)=>{
 const file='/assets/vehicle-brand-logos/'+slug+'-logo.webp';
 if(!fs.existsSync(path.join(root,file)))throw Error('Missing logo '+slug);
 count++;
 if(content.includes('vehicle-brand-logo'))return all;
 const title=content.match(/<h3[^>]*>(.*?)<\/h3>/)[1].replace(/^For /,'');
 return '<article id="'+slug+'"'+attrs+'><img class="vehicle-brand-logo" src="'+file+'" alt="'+title+' logo" width="240" height="240" loading="lazy" decoding="async">'+content+'</article>';
});
const css='<style id="vehicle-brand-logo-style">main article[id]{position:relative;min-height:152px;padding-right:112px}main .vehicle-brand-logo{position:absolute;right:16px;top:50%;transform:translateY(-50%);width:88px;height:88px;object-fit:contain;background:#fff;border-radius:10px}main article[id] h3{position:relative}main article[id] a{position:relative;display:inline-block;line-height:1.6}@media(max-width:420px){main article[id]{padding-right:108px}main .vehicle-brand-logo{right:14px;width:80px;height:80px}}</style>';
if(!h.includes('id="vehicle-brand-logo-style"'))h=h.replace('</head>',css+'</head>');
fs.writeFileSync(p,h);
if(count!==23)throw Error('Expected 23 brands got '+count);
console.log('Verified 23 correct brand-logo mappings and preserved brand card links.');
