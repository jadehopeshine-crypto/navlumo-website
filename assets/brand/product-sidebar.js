(() => {
  const start = () => {
    const main = document.querySelector('main');
    if (!main || document.querySelector('.catalog-sidebar')) return;
    const camera = '/products/rear-view-camera/';
    const android = '/products/android-car-radio/';
    const isVehicle = location.pathname.startsWith('/by-vehicle/');
    const rootUrl = isVehicle ? '/by-vehicle/' : '/products/';
    const brands = ['Audi','BMW','Benz','Tesla','Toyota','Honda','Lexus','Hyundai','Nissan','VW','Kia','Ford','Mazda','Chevrolet','Buick','Suzuki','Mitsubishi','Peugeot','Fiat','Jeep','Renault','Subaru','Volvo'];
    const groups = isVehicle ? brands.map(brand => brand === 'Renault'
      ? ['Renault / Dacia', '/by-vehicle/renault/']
      : [brand, brand === 'Jeep' ? '/by-vehicle/jeep/' : `/by-vehicle/#${brand.toLowerCase()}`]) : [
      ['Android Car Radio', android, [
        ['WIFI Core Car Radio 1 DIN', android + '#wifi-core-car-radio-1-din'],
        ['WIFI Core Car Radio 2 DIN', android + '#wifi-core-car-radio-2-din'],
        ['4G LTE Car Radio 1 DIN', android + '#4g-lte-car-radio-1-din'],
        ['4G LTE Car Radio 2 DIN', android + '#4g-lte-car-radio-2-din']]],
      ['Portable CarPlay Screen', '/products/#portable-carplay-screen'],
      ['Car MP5 Player', '/products/#car-mp5-player'],
      ['Dash Cam/Car DVR', '/products/#dash-cam-car-dvr'],
      ['Rear View Camera', camera, [
        ['Universal Car Camera', camera + 'universal-car-camera/'],
        ['Original Brake Light Camera', camera + '#original-brake-light-camera'],
        ['Tailgate Handle Camera', camera + '#tailgate-handle-camera'],
        ['Original Car Rear Camera', camera + '#original-car-rear-camera'],
        ['360 Panoramic View', camera + '#360-panoramic-view']]],
      ['Car Reversing Aid', '/products/#car-reversing-aid', [
        ['Car Monitor', '/products/#car-monitor'],
        ['Rear View Camera & Monitor Kit', '/products/#rear-view-camera-monitor-kit']]],
      ['Automotive Lighting', '/products/#automotive-lighting']
    ];
    const layout = document.createElement('div');
    layout.className = 'catalog-layout';
    const content = document.createElement('div');
    content.className = 'catalog-content';
    const wrap = main.querySelector(':scope > .pd-wrap');
    if (wrap) {
      wrap.classList.add('catalog-host');
      content.append(...wrap.childNodes);
      wrap.append(layout);
    } else {
      const hero = main.querySelector(':scope > .unified-hero, :scope > .hero');
      [...main.childNodes].filter(n => n !== hero).forEach(n => content.append(n));
      main.append(layout);
    }
    const aside = document.createElement('aside');
    aside.className = 'catalog-sidebar';
    const panel = document.createElement('details');
    panel.className = 'catalog-panel';
    const heading = document.createElement('summary');
    heading.textContent = isVehicle ? 'Browse by Vehicle' : 'Product Categories';
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', isVehicle ? 'Vehicle categories' : 'Product categories');
    const createLink = (label, href) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      return a;
    };
    const all = createLink(isVehicle ? 'All Vehicles' : 'All Products', rootUrl);
    all.className = 'catalog-all';
    nav.append(all);
    groups.forEach(([label, href, children], i) => {
      const row = document.createElement('div');
      row.className = 'catalog-row';
      row.append(createLink(label, href));
      nav.append(row);
      if (!children) return;
      const list = document.createElement('div');
      list.className = 'catalog-children';
      list.id = `catalog-children-${i}`;
      children.forEach(([name, target]) => list.append(createLink(name, target)));
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = '⌄';
      button.setAttribute('aria-label', `Expand ${label}`);
      button.setAttribute('aria-controls', list.id);
      const expand = value => {
        list.hidden = !value;
        button.setAttribute('aria-expanded', String(value));
        button.setAttribute('aria-label', `${value ? 'Collapse' : 'Expand'} ${label}`);
        button.textContent = value ? '⌃' : '⌄';
      };
      row.append(button);
      row.after(list);
      expand(false);
      button.addEventListener('click', () => expand(list.hidden));
      row.expand = expand;
      row.categoryHref = href;
    });
    panel.append(heading, nav);
    aside.append(panel);
    layout.append(aside, content);
    const desktop = matchMedia('(min-width:1100px)');
    const sizePanel = () => { panel.open = desktop.matches; };
    sizePanel();
    desktop.addEventListener('change', sizePanel);
    const update = () => {
      const path = location.pathname.replace(/\/?$/, '/');
      const candidates = [...nav.querySelectorAll('a')];
      candidates.forEach(a => { a.removeAttribute('aria-current'); a.classList.remove('catalog-active'); });
      const matches = candidates.filter(a => {
        const u = new URL(a.href);
        return u.hash ? u.pathname === path && u.hash === location.hash
          : path === u.pathname || (u.pathname !== rootUrl && path.startsWith(u.pathname));
      });
      const selected = matches.sort((a,b) => b.getAttribute('href').length - a.getAttribute('href').length)[0];
      if (selected) { selected.classList.add('catalog-active'); selected.setAttribute('aria-current', 'location'); }
      nav.querySelectorAll('.catalog-row').forEach(row => {
        if (!row.expand) return;
        const list = row.nextElementSibling;
        const u = new URL(row.categoryHref, location.origin);
        const relevant = u.hash ? path === u.pathname && (location.hash === u.hash || list.contains(selected)) : path.startsWith(u.pathname);
        row.classList.toggle('catalog-parent-active', relevant);
        if (relevant) row.expand(true);
      });
    };
    update();
    window.addEventListener('hashchange', update);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
