const target = document.querySelector(".target");
const targetTxt = document.querySelector(".txt");
document.addEventListener("mousemove", () => {
  target.style.transform =
    "translate(" + event.clientX + "px," + event.clientY + "px)";
  targetTxt.innerHTML = `${event.clientX}, ${event.clientY}`;
});
