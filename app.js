const ddClose = document.querySelector(".dropdown-close");
      ddOpen = document.querySelector(".dropdown-open");
      dd = document.querySelector(".dropdown");
      btn = document.querySelector(".btn");
      hero = document.querySelector(".hero");
      dd_lts = document.querySelectorAll(".dd-lts");
window.onload = () => {
  const str = "stormitel_yrzk3";
  if(localStorage.getItem(str)){
    location.href = "/dashboard/";
  }
}
fetch("/assets/img/a.jpg").then(res => res.blob()).then(blob => {
  hero.src = URL.createObjectURL(blob);
})
ddOpen.addEventListener("click", () => {
  location.href = "#ddO";
})
ddClose.addEventListener("click", () => {
  history.back();
})
btn.addEventListener("click", () => {
  setTimeout(() => {
    location.href = "./login/";
  }, 500);
})
dd_lts.forEach(l => {
  l.addEventListener("click", () => {
    if(l.classList.contains("login")){
      location.href = "./login/";
    } else if(l.classList.contains("signup")){
      location.href = "./signup/";
    } else if(l.classList.contains("about")){
      location.href = "./about/";
    }
  })
})