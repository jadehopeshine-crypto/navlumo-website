module.exports=(wa)=>{
const rows=[
 ['Vehicle Model','Renault Duster<br>Dacia Duster<br>Dacia Sandero<br>Dacia Logan'],
 ['Model','for Dacia'],
 ['Original Radio','Support'],
 ['Original rear camera','No'],
 ['Steering Wheel Controls','Support'],
 ['Customization','<a href="/oem-odm/">OEM &amp; ODM Options</a>'],
 ['Wholesale','<a href="'+wa+'" target="_blank" rel="noopener noreferrer">Wholesale &amp; Bulk Order Inquiry</a>']
];
const img='/assets/products/dacia-medianav-8-inch/dacia-medianav-before-after-installation-';
return '<section id="compatibility" class="pd-section"><style>#compatibility .dacia-fitment-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:start}#compatibility .dacia-fitment-table{padding:24px;background:#f1f6f3;border-radius:10px;min-width:0}#compatibility .dacia-fitment-table h3{font-size:18px;font-weight:600;margin-bottom:16px}#compatibility .dacia-fitment-table th{width:44%;background:transparent}#compatibility .dacia-fitment-table td{color:#172b23}#compatibility .dacia-fitment-table a{color:#01544b}#compatibility .dacia-install-photo{margin:0;border:1px solid #e2e4e8;border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:center;background:#fff;min-width:0}#compatibility .dacia-install-photo img{display:block;width:100%;max-width:400px;max-height:400px;height:auto;object-fit:contain} @media(max-width:767px){#compatibility .dacia-fitment-grid{grid-template-columns:minmax(0,1fr)}#compatibility .dacia-fitment-table{padding:18px}}</style><div class="section-heading"><span>01</span><div><h2>Vehicle Compatibility</h2><p>Confirm the original dashboard and connections before selecting a configuration.</p></div></div><div class="dacia-fitment-grid"><div class="dacia-fitment-table"><h3>Compatible Vehicles</h3><table><tbody>'+rows.map(([name,value])=>'<tr><th scope="row">'+name+'</th><td>'+value+'</td></tr>').join('')+'</tbody></table><a class="pd-text-link" href="'+wa+'" target="_blank" rel="noopener noreferrer">Ask for a Fitment Check →</a></div><figure class="dacia-install-photo"><img src="'+img+'800w.webp" srcset="'+img+'480w.webp 480w, '+img+'800w.webp 800w, '+img+'1000w.webp 1000w" sizes="(max-width:767px) calc(100vw - 68px), 400px" width="1000" height="1000" alt="Before and after installation of the 8-inch Medianav Android car stereo in a Dacia dashboard" loading="lazy" decoding="async"></figure></div></section>';
};
