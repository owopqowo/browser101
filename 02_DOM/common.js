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
  const dataId = e.target.dataset.id;
  if (dataId) {
    const deleted = document.querySelector(`.item[data-id="${dataId}"]`);
    deleted.remove();
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

let id = 0;
function createElem(text) {
  const sListLi = document.createElement('li');
  sListLi.setAttribute('class', 'item');
  sListLi.setAttribute('data-id', id);
  sListLi.innerHTML = `
    <span class="item-name">${text}</span>
    <button class="btn-remove">
        <i class="fas fa-trash" data-id="${id}"></i>
    </button>
  `;
  id++;
  return sListLi;
}
