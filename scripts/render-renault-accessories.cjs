const items=[
 ['Power Cable 1','Power wiring harness for the head unit.',70,40],
 ['Power Cable 2','Additional wiring harness for the vehicle power connection.',380,40],
 ['GPS Antenna','External antenna for GPS signal reception.',690,40],
 ['Camera Input Cable','Video input cable for a rear-view camera.',1000,40],
 ['RCA Input / Output','RCA connections for audio and video input/output.',1310,40],
 ['2 × USB Cables','Two USB extension cables for external USB connections.',70,305],
 ['CANBUS Box','CANBUS decoder for vehicle communication and control integration.',380,305],
 ['Radio Adapter','Antenna adapter for the vehicle radio connection.',690,305]
];
const source='/assets/products/renault-dacia-installation-accessories.webp';
module.exports=()=>'<section id="accessories" class="pd-section"><div class="section-heading"><span>05</span><div><h2>Installation &amp; Accessories</h2><p>Power, signal and connection accessories for the head unit installation.</p></div></div><div class="accessory-grid">'+items.map(([title,description,x,y])=>'<figure class="accessory-card"><div class="accessory-photo"><img src="'+source+'" alt="'+title.replace(/&/g,'&amp;')+' for the Renault / Dacia Android car radio installation" width="1614" height="566" loading="lazy" decoding="async" style="width:'+(1614/265*100).toFixed(5)+'%;left:'+(-x/265*100).toFixed(5)+'%;top:'+(-y/195*100).toFixed(5)+'%;"></div><figcaption><strong>'+title+'</strong><p>'+description+'</p></figcaption></figure>').join('')+'</div><div class="inline-actions"><a class="pd-button outline" href="https://wa.me/8617620780022?text=Hello%20Navlumo%2C%20I%20would%20like%20installation%20information%20for%20the%20Renault%20%2F%20Dacia%20Android%20car%20radio%20and%20its%20accessories." target="_blank" rel="noopener noreferrer">Request Installation Information</a><a class="pd-text-link" href="'+source+'" target="_blank" rel="noopener noreferrer">View Accessory Overview →</a></div></section>';
