let prevScrollpos = window.pageYOffset;

const header = document.querySelector("header");
const headerBottom = header.offsetTop + header.offsetHeight;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos || currentScrollPos < headerBottom) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }

  prevScrollpos = currentScrollPos;
};

const navigation = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".nav-toggle");

navToggle.onclick = () => {
  const visibility = navigation.getAttribute("data-visible");

  if (visibility === "false") {
    navigation.setAttribute("data-visible", true);
    navToggle.innerHTML =
      '<i style="color: white;" class="fas fa-window-close"></i>';
    navToggle.style.position = "fixed";
    document.body.style.overflow = "hidden";
  } else if (visibility === "true") {
    navigation.setAttribute("data-visible", false);
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    navToggle.style.position = "absolute";
    document.body.style.overflow = "scroll";
  }
};
