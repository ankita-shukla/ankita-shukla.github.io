const pageLinks = [...document.querySelectorAll("[data-page]")];
const panels = [...document.querySelectorAll(".page-panel")];
const nav = document.querySelector(".main-nav");
const menuToggle = document.querySelector(".menu-toggle");

function activatePage(pageId) {
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === pageId);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  document.title =
    pageId === "home"
      ? "MAGI Lab | Ankita Shukla"
      : `${pageId[0].toUpperCase()}${pageId.slice(1)} | MAGI Lab`;
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.dataset.page;
    if (!pageId || !document.getElementById(pageId)) return;

    event.preventDefault();
    activatePage(pageId);
    history.replaceState(null, "", `#${pageId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const initialPage = window.location.hash.replace("#", "") || "home";
if (document.getElementById(initialPage)) {
  activatePage(initialPage);
}
