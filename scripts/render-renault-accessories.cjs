const items=[
  [
    "Power Wiring Harness 1",
    "power-wiring-harness-1",
    "Power and speaker wiring harness with vehicle and head-unit connectors."
  ],
  [
    "Power Wiring Harness 2",
    "power-wiring-harness-2",
    "Alternative power and speaker wiring harness; connector selection depends on the vehicle."
  ],
  [
    "GPS Antenna",
    "gps-antenna",
    "External GPS antenna with cable and threaded connector."
  ],
  [
    "Rear Camera Input Cable",
    "rear-camera-input-cable",
    "Rear camera video input cable with a yellow RCA socket."
  ],
  [
    "RCA Audio / Video Cable",
    "rca-audio-video-cable",
    "Multi-connector RCA cable for audio and video connections."
  ],
  [
    "USB Extension Cables",
    "usb-extension-cables",
    "Two USB extension cables for external USB connections."
  ],
  [
    "CANBUS Decoder Box",
    "canbus-decoder-box",
    "CANBUS interface box; supported vehicle functions require fitment confirmation."
  ],
  [
    "Radio Antenna Adapter",
    "radio-antenna-adapter",
    "Adapter cable for connecting the vehicle radio antenna."
  ]
];
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
module.exports=()=>'<section id="accessories" class="pd-section"><div class="section-heading"><span>05</span><div><h2>Installation &amp; Accessories</h2><p>Wiring harnesses, antennas and connection cables for the Renault / Dacia Android car radio shown. Confirm vehicle connectors, CANBUS functions and the supplied accessory list before ordering.</p></div></div><div class="accessory-grid">'+items.map(([name,slug,description])=>{
const base='/assets/products/renault-accessories/renault-dacia-'+slug;
return '<figure class="accessory-card"><div class="accessory-photo"><img src="'+base+'-800w.webp" srcset="'+base+'-400w.webp 400w, '+base+'-800w.webp 800w" sizes="(max-width: 900px) 50vw, (max-width: 1380px) 25vw, 320px" alt="'+esc(name+' for Renault / Dacia Android car radio')+'" width="800" height="600" loading="lazy" decoding="async"><span class="accessory-image-name">'+esc(name)+'</span></div><figcaption><strong>'+esc(name)+'</strong><p>'+esc(description)+'</p></figcaption></figure>';
}).join('')+'</div><div class="inline-actions"><a class="pd-button outline" href="https://wa.me/8617620780022?text=Hello%20Navlumo%2C%20please%20confirm%20the%20installation%20accessories%20and%20vehicle%20fitment%20for%20your%20Renault%20%2F%20Dacia%20Android%20car%20radio." target="_blank" rel="noopener noreferrer">Request Installation Information</a></div></section>';
