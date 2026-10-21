(() => {
  const connectRenaultCategory = () => {
    document.querySelectorAll('header a[href="/by-vehicle/#renault"]').forEach((link) => {
      link.href = "/by-vehicle/renault/";
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectRenaultCategory, { once: true });
  } else {
    connectRenaultCategory();
  }
  const categories = [
    ["WIFI Core Car Radio 1 DIN", "/products/android-car-radio/#wifi-core-car-radio-1-din"],
    ["WIFI Core Car Radio 2 DIN", "/products/android-car-radio/#wifi-core-car-radio-2-din"],
    ["4G LTE Car Radio 1 DIN", "/products/android-car-radio/#4g-lte-car-radio-1-din"],
    ["4G LTE Car Radio 2 DIN", "/products/android-car-radio/#4g-lte-car-radio-2-din"]
  ];

  document.querySelectorAll('header a[href="/products/#android-car-radio"]').forEach((link, index) => {
    if (link.dataset.categoryMenuAdded) return;
    link.dataset.categoryMenuAdded = "true";

    const submenu = document.createElement("div");
    const isMobile = Boolean(link.closest("#mobile-menu"));
    submenu.className = isMobile
      ? "ml-3 mt-2 space-y-2 border-l border-white/25 pl-3 text-[13px] text-white/80"
      : "ml-5 mb-1 border-l border-gray-200 pl-3 text-[13px] text-gray-600";
    submenu.id = `android-radio-subcategories-${index}`;
    submenu.hidden = true;
    submenu.style.display = "none";

    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:4px;";
    link.style.flex = "1";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.setAttribute("aria-controls", submenu.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Expand Android Car Radio subcategories");
    toggle.style.cssText = "display:flex;align-items:center;justify-content:center;width:36px;height:36px;flex:none;margin-right:10px;border-radius:6px;color:inherit;cursor:pointer;";
    toggle.innerHTML = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 9 6 6 6-6"/></svg>';
    const setExpanded = (expanded) => {
      submenu.hidden = !expanded;
      submenu.style.display = expanded ? "" : "none";
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.setAttribute("aria-label", `${expanded ? "Collapse" : "Expand"} Android Car Radio subcategories`);
      toggle.querySelector("svg").style.transform = expanded ? "rotate(180deg)" : "";
    };
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setExpanded(toggle.getAttribute("aria-expanded") !== "true");
    });
    submenu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setExpanded(false);
        toggle.focus();
      }
    });

    categories.forEach(([label, href]) => {
      const categoryLink = document.createElement("a");
      categoryLink.href = href;
      categoryLink.className = isMobile
        ? "block hover:text-white"
        : "block py-1.5 hover:text-teal";
      categoryLink.textContent = label;
      submenu.append(categoryLink);
    });

    link.before(row);
    row.append(link, toggle);
    row.after(submenu);
    const dropdown = link.closest(".group")?.querySelector(".w-\\[260px\\]");
    if (dropdown) {
      dropdown.classList.remove("w-[260px]");
      dropdown.classList.add("w-[300px]");
    }
  });
})();
