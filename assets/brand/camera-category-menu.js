(() => {
  const groups = [
    ['Rear View Camera', 'rear-view-camera', [
      ['Universal Car Camera', 'universal-car-camera'],
      ['Original Brake Light Camera', 'original-brake-light-camera'],
      ['Tailgate Handle Camera', 'tailgate-handle-camera'],
      ['Original Car Rear Camera', 'original-car-rear-camera'],
      ['360 Panoramic View', '360-panoramic-view']
    ]],
    ['Car Reversing Aid', 'car-reversing-aid', [
      ['Car Monitor', 'car-monitor'],
      ['Rear View Camera & Monitor Kit', 'rear-view-camera-monitor-kit']
    ]]
  ];
  groups.forEach(([name, id, items]) => {
    const categoryUrl = id === 'rear-view-camera' ? '/products/rear-view-camera/' : `/products/#${id}`;
    document.querySelectorAll(`header a[href="/products/#${id}"], header a[href="${categoryUrl}"]`).forEach((link, index) => {
      if (link.dataset.cameraMenuAdded) return;
      link.dataset.cameraMenuAdded = 'true';
      link.href = categoryUrl;
      const mobile = Boolean(link.closest('#mobile-menu'));
      const submenu = document.createElement('div');
      submenu.id = `${id}-subcategories-${index}`;
      submenu.className = mobile ? 'ml-3 mt-2 space-y-2 border-l border-white/25 pl-3 text-[13px] text-white/80' : 'ml-5 mb-1 border-l border-gray-200 pl-3 text-[13px] text-gray-600';
      submenu.hidden = true;
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:4px';
      link.style.flex = '1';
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.textContent = '⌄';
      toggle.style.cssText = 'width:36px;height:36px;flex:none;margin-right:10px;border-radius:6px;color:inherit;cursor:pointer';
      toggle.setAttribute('aria-controls', submenu.id);
      const expand = value => {
        submenu.hidden = !value;
        submenu.style.display = value ? '' : 'none';
        toggle.setAttribute('aria-expanded', String(value));
        toggle.setAttribute('aria-label', `${value ? 'Collapse' : 'Expand'} ${name} subcategories`);
        toggle.textContent = value ? '⌃' : '⌄';
      };
      expand(false);
      toggle.addEventListener('click', event => {
        event.stopPropagation();
        expand(toggle.getAttribute('aria-expanded') !== 'true');
      });
      submenu.addEventListener('keydown', event => {
        if (event.key === 'Escape') { expand(false); toggle.focus(); }
      });
      items.forEach(([label, anchor]) => {
        const child = document.createElement('a');
        child.href = anchor === 'universal-car-camera'
          ? '/products/rear-view-camera/universal-car-camera/'
          : id === 'rear-view-camera' ? `/products/rear-view-camera/#${anchor}` : `/products/#${anchor}`;
        child.className = mobile ? 'block hover:text-white' : 'block py-1.5 hover:text-teal';
        child.textContent = label;
        submenu.append(child);
      });
      link.before(row); row.append(link, toggle); row.after(submenu);
      if (!mobile) {
        const dropdown = row.parentElement;
        dropdown.style.maxHeight = '70vh';
        dropdown.style.overflowY = 'auto';
        dropdown.style.minWidth = '300px';
      }
    });
  });
})();
