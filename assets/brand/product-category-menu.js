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

  document.querySelectorAll('header a[href="/products/#android-car-radio"]').forEach((link) => {
    if (link.dataset.categoryMenuAdded) return;
    link.dataset.categoryMenuAdded = "true";

    const submenu = document.createElement("div");
    const isMobile = Boolean(link.closest("#mobile-menu"));
    submenu.className = isMobile
      ? "ml-3 mt-2 space-y-2 border-l border-white/25 pl-3 text-[13px] text-white/80"
      : "ml-5 mb-1 border-l border-gray-200 pl-3 text-[13px] text-gray-600";

    categories.forEach(([label, href]) => {
      const categoryLink = document.createElement("a");
      categoryLink.href = href;
      categoryLink.className = isMobile
        ? "block hover:text-white"
        : "block py-1.5 hover:text-teal";
      categoryLink.textContent = label;
      submenu.append(categoryLink);
    });

    link.insertAdjacentElement("afterend", submenu);
    const dropdown = link.closest(".group")?.querySelector(".w-\\[260px\\]");
    if (dropdown) {
      dropdown.classList.remove("w-[260px]");
      dropdown.classList.add("w-[300px]");
    }
  });
})();
