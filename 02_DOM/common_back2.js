const btnAdd = document.querySelector('.btn-add');
const sList = document.querySelector('.s-list');
const itemInput = document.querySelector('.item-input');
btnAdd.addEventListener('click', onAdd);

itemInput.addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    onAdd();
  }
});

sList.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    itemRemove();
  }
});

function onAdd() {
  //1. 텍스트 받아오기
  const text = itemInput.value;
  //2. 새로운 element 만들기
  const item = createElem(text);
  //3. 새로 만든 element 추가하기
  if (itemInput.value) {
    sList.appendChild(item);
  } else {
    alert('입력값이 없습니다!');
    itemInput.focus();
  }
  //4. 새로 추가된 아이템으로 스크롤하기
  item.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
  //5. 인풋 초기화 및 포거스 유지
  itemInput.value = '';
  itemInput.focus();
}

function createElem(text) {
  const sListLi = document.createElement('li');
  const sListName = document.createElement('span');
  const sListBtn = document.createElement('button');
  sListName.setAttribute('class', 'item-name');
  sListName.textContent = text;
  sListBtn.setAttribute('class', 'btn-remove');
  sListBtn.innerHTML = '<i class="fas fa-trash"></i>';
  sListBtn.addEventListener('click', () => {
    sList.removeChild(sListLi);
  });
  sListLi.appendChild(sListName);
  sListLi.appendChild(sListBtn);
  return sListLi;
}
