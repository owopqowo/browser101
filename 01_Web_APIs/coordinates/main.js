const target = document.querySelector(".target");
const targetTxt = document.querySelector(".txt");
document.addEventListener("mousemove", () => {
  target.style.top = event.clientY + "px";
  target.style.left = event.clientX + "px";
  targetTxt.innerHTML = `${event.clientX}, ${event.clientY}`;
});
