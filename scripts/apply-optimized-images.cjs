const fs=require('fs'),path=require('path'),cp=require('child_process');process.chdir(path.join(__dirname,'..'));
const records=JSON.parse(fs.readFileSync('scripts/image-optimization-manifest.json','utf8'));
const byUrl=new Map(records.map(r=>[r.url,r]));
const keywords={
 '/assets/products/android-car-stereo-manufacturer-head-unit.webp':'Android car stereo from Navlumo, an automotive electronics manufacturer',
 '/assets/banners/car-radio-manufacturer-product-range.webp':'Android head units, displays and cameras from Navlumo car radio manufacturer',
 '/assets/banners/car-radio-manufacturer-product-range-mobile.webp':'Navlumo car radio manufacturer product range for vehicle multimedia upgrades',
 '/assets/about/car-radio-manufacturer-testing-team.webp':'Car radio manufacturer Navlumo: automotive electronics inspection and testing',
 '/assets/about/car-stereo-manufacturer-rd-team.webp':'Car stereo manufacturer research and development: electronics inspection',
 '/assets/about/android-car-radio-manufacturer.webp':'Automotive electronics assembly at Navlumo car stereo manufacturer',
};
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const files=cp.execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(p=>/\.(html|css|js|cjs|json)$/.test(p)&&!p.startsWith('scripts/optimize-')&&!p.includes('image-optimization-manifest')&&p!=='scripts/apply-optimized-images.cjs');
const imageSet=(r)=>[...r.variants.map(v=>`${v.url} ${v.width}w`),`${r.url} ${r.width}w`].join(', ');
for(const file of files){let text=fs.readFileSync(file,'utf8');const original=text;
 for(const r of records)text=text.split(r.source).join(r.url);
 if(/\.(cjs|js)$/.test(file)){
  for(const r of records){const from=path.posix.basename(r.source),to=path.posix.basename(r.url);if(records.filter(x=>path.posix.basename(x.source)===from).length===1)text=text.split(from).join(to);}
 }
 if(file.endsWith('.html')){
  const english=/<html\b[^>]*lang="en"/.test(text);
  text=text.replace(/<img\b[^>]*>/g,tag=>{const src=tag.match(/\bsrc="([^"]+)"/)?.[1];const r=byUrl.get(src);if(!r)return tag;
   tag=tag.replace(/\s(?:srcset|sizes|width|height|decoding)="[^"]*"/g,'');
   if(english&&keywords[src]&&!/illustrat|preview|not confirmed|to be supplied/i.test(tag))tag=tag.replace(/\balt="[^"]*"/,'alt="'+escape(keywords[src])+'"');
   const alt=tag.match(/\balt="([^"]*)"/)?.[1];if(alt&&!/\btitle=/.test(tag))tag=tag.replace(/>$/,' title="'+alt+'">');
   let sizes='(min-width: 1200px) 600px, (min-width: 768px) 50vw, 100vw';
   if(src.includes('/banners/'))sizes='100vw';
   else if(src.includes('-feature-'))sizes='(min-width: 1200px) 220px, (min-width: 768px) 33vw, 50vw';
   else if(src.includes('/testing/')||src.includes('/vehicle-makes/')||src.includes('/about/team-')||src.includes('-rd-team'))sizes='(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw';
   if(/gallery-thumbs|Illustrative front view/i.test(tag))sizes='76px';
   // Gallery images change source on click; do not leave a stale responsive source.
   const responsive=r.variants.length&&!/id="product-main-image"/.test(tag)?' srcset="'+imageSet(r)+'" sizes="'+sizes+'"':'';
   const eager=/fetchpriority="high"|id="product-main-image"|banner-picture/.test(tag)||src.includes('/banners/');
   if(!/\bloading=/.test(tag)&&!eager)tag=tag.replace(/>$/,' loading="lazy">');
   if(eager)tag=tag.replace(/\sloading="lazy"/g,'');
   return tag.replace(/>$/,' width="'+r.width+'" height="'+r.height+'" decoding="async"'+responsive+'>');
  });
  text=text.replace(/<div class="gallery-thumbs"[\s\S]*?<\/div>/g,block=>block.replace(/sizes="[^"]*"/g,'sizes="76px"'));
  text=text.replace(/<source\b[^>]*>/g,tag=>{const url=tag.match(/srcset="([^"]+)"/)?.[1];const r=byUrl.get(url);if(!r||!r.variants.length)return tag;return tag.replace(/srcset="[^"]*"/,'srcset="'+imageSet(r)+'" sizes="100vw"');});
  text=text.replace(/(<link\b[^>]*rel="icon"[^>]*type=")image\/png("[^>]*href="[^"]+\.webp)/g,'$1image/webp$2');
 }
 if(text!==original)fs.writeFileSync(file,text);
}
console.log('Updated HTML, CSS, metadata and generator references.');
