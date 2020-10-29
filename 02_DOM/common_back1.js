const btnAdd = document.querySelector(".btn-add");
const sList = document.querySelector(".s-list");
const itemInput = document.querySelector(".item-input");
btnAdd.addEventListener("click", itemAdd);

itemInput.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    itemAdd();
  }
});

sList.addEventListener("click", function (e) {
  if (e.target.tagName == "BUTTON") {
    itemRemove();
  }
});

function itemAdd() {
  const sListLi = document.createElement("li");
  const sListName = document.createElement("span");
  const sListBtn = document.createElement("button");
  sListName.setAttribute("class", "item-name");
  sListName.textContent = itemInput.value;
  sListBtn.setAttribute("class", "btn-remove fas fa-trash");
  sListLi.appendChild(sListName);
  sListLi.appendChild(sListBtn);
  if (itemInput.value) {
    sList.appendChild(sListLi);
    itemInput.value = "";
  } else {
    alert("입력값이 없습니다!");
  }
}

function itemRemove() {
  event.target.parentNode.remove();
}
