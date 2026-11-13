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
    if (link.dataset.page === pageId) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.title =
    pageId === "home"
      ? "Ankita Shukla | University of Nevada, Reno"
      : `${pageId.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")} | Ankita Shukla`;
}

// Section links such as #join now belong to the lab page.
function showTarget(targetId, behavior = "auto") {
  const target = document.getElementById(targetId);
  const panel = target?.closest(".page-panel");
  if (!panel) return false;
  activatePage(panel.id);
  if (target === panel) {
    window.scrollTo({ top: 0, behavior });
  } else {
    target.scrollIntoView({ block: "start", behavior });
  }
  return true;
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.dataset.page;
    if (!pageId || !document.getElementById(pageId)) return;

    event.preventDefault();
    showTarget(pageId, "smooth");
    history.replaceState(null, "", `#${pageId}`);
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.querySelector(".nav-more")?.removeAttribute("open");
  });
});

document.addEventListener("click", (event) => {
  const more = document.querySelector(".nav-more");
  if (more && !more.contains(event.target)) more.removeAttribute("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const more = document.querySelector(".nav-more[open]");
    if (more) {
      more.removeAttribute("open");
      more.querySelector("summary").focus();
    }
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const initialPage = window.location.hash.replace("#", "") || "home";
if (!showTarget(initialPage)) showTarget("home");

window.addEventListener("hashchange", () => {
  if (!showTarget(window.location.hash.slice(1) || "home")) showTarget("home");
});
