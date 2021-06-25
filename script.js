console.log("I am working...!");
// Globle Variables
let cardArray = [];
let date = new Date();
const itemArray = [];
let currentItem = {};
let currentCard = {};

// *******************************************(create Dom Elements methods)************************************************************** */

const getCardTamplet = (cardData) => {
  // create Elements
  let main = document.querySelector(".main-section");
  let card = document.createElement("div");
  let titleWrapper = document.createElement("div");
  let title = document.createElement("h3");
  let deleteCardBtn = document.createElement("button");
  let addItemWrapper = document.createElement("div");
  let addItem = document.createElement("button");

  //   make Dom hirarchey
  main.appendChild(card);
  card.appendChild(titleWrapper);
  titleWrapper.appendChild(title);
  titleWrapper.append(deleteCardBtn);
  if (cardData.title === "todos" || cardData.title === "todo") {
    card.appendChild(addItemWrapper);
    addItemWrapper.appendChild(addItem);
  }

  //   Set Attributies
  card.setAttribute("class", "card");
  card.setAttribute("id", cardData.id);
  title.innerText = cardData.title;
  deleteCardBtn.innerText = "delete";
  deleteCardBtn.setAttribute("class", "add-task-btn");
  deleteCardBtn.addEventListener("click", () => handleDelete(cardData.id));
  addItemWrapper.setAttribute("class", "add-item-wrapper");
  addItem.innerText = "Add Item";
  addItem.addEventListener("click", modalShow);
};

const getModal = () => {
  let modal = document.getElementById("myModal");
  let btn = document.getElementById("add-item-list");
  let span = document.getElementsByClassName("close")[0];
  return { modal, btn, span };
};

const getInputEle = () => {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let assign = document.getElementById("assign");
  return { title, description, assign };
};
// const getDiv = (className) => {
//   let div = document.createElement("div");
//   if (className) {
//     div.setAttribute("class", className);
//   }
//   return div;
// };

const getItemCard = (itemObj) => {
  const { id } = itemObj;
  // create ele
  let itemwrapper = document.createElement("div");

  let title = document.createElement("h4");
  let description = document.createElement("h4");
  let assign = document.createElement("h4");
  let time = document.createElement("small");

  //   set Attribute
  itemwrapper.setAttribute("class", "item-card");
  itemwrapper.setAttribute("id", id);
  //   set values
  let icon = getIcon("&#128393;", id, OpenUpdateBtn);

  title.innerText = itemObj.title;
  description.innerText = itemObj.description;
  assign.innerText = itemObj.assign;
  time.innerText = itemObj.timeStamp;
  // appand ele
  itemwrapper.appendChild(title);
  itemwrapper.appendChild(description);
  itemwrapper.appendChild(assign);
  itemwrapper.appendChild(time);
  itemwrapper.appendChild(icon);
  return itemwrapper;
};

const getIcon = (code, id, onClick) => {
  let span = document.createElement("span");
  span.setAttribute("class", "icon");
  span.innerHTML = code;
  span.addEventListener("click", onClick);
  span.setAttribute("id", id);

  return span;
};

// ***************************************************( handler events methods )****************************************************** */

const handleClickTitle = () => {
  let input = document.getElementById("id-input");
  let value = input.value;
  if (!value) {
    alert("enter title");
  } else {
    let cardObj = {
      id: cardArray.length + 1 * Math.random(),
      title: value,
      timeStamp: getTimeStamp(),
    };
    cardArray.push(cardObj);
    getCardTamplet(cardObj);
    btnStatus();
  }
};

const handleDelete = (id) => {
  let confirm = window.confirm("Are you sure!");
  let index = cardArray.indexOf(cardArray.find((card) => card.id === id));

  if (confirm) {
    document.getElementById(id).remove();
    cardArray.splice(index, 1);
    btnStatus();
  }
};

const handleSubmitItem = () => {
  console.log("save item ");
  let modal = document.getElementById("myModal");
  let updateBtn = document.getElementById("u-item-btn");
  const { title, description, assign } = getInputEle();
  if (title.value === "" || description.value == "" || assign.value === "") {
    alert("Please Fill all input field !");
  } else {
    const todoArray = cardArray.find(
      (card) =>
        card.title === "todos".toLowerCase() ||
        card.title === "todo".toLowerCase()
    );
    const itemObj = {
      id: itemArray.length + 1 * Math.random(),
      title: title.value,
      description: description.value,
      assign: assign.value,
      //   cardId: todoArray.id,
      timeStamp: getTimeStamp(),
    };

    let Card = document.getElementById(todoArray.id);
    console.log("main card", Card.getAttribute("id"));
    const itemCard = getItemCard(itemObj);
    Card.appendChild(itemCard);
    itemArray.push(itemObj);
    console.log("item card", itemCard);
    modal.style.display = "none";
    console.log("item array", itemArray);

    currentItem = itemObj;
    currentCard = todoArray;

    handleModalClose();
  }
  //  updateBtn.removeEventListener(handleUpdate(itemObj.id, todoArray.id));
};

const OpenUpdateBtn = (e) => {
  console.log("enevt", e);
  let modal = document.getElementById("u-myModal");
  modal.style.display = "block";
  getSelectTag();
};

const handleUpdate = (itemId, cardId) => {
  //   console.log("update btn is clicked ! ", { itemId, cardId });
  //   const item = itemArray.find((item) => item.id === itemId);
  //   console.log("item array", itemArray);

  console.log(currentCard);
  console.log(currentItem);
  debugger;

  let title = document.getElementById("u-title").value;
  let description = document.getElementById("u-description").value;
  let assign = document.getElementById("u-assign").value;
  let status = document.getElementById("u-status");
  let statusValue = status.value;
  let itemwrapper = document.getElementById(currentItem.id);
  let currentCardEle = document.getElementById(currentCard.id);
  let newCardEle = document.getElementById(statusValue);
  //   let parentNode = currentCardEle.parentNode;
  handleModalClose();

  console.log("item wrapper", itemwrapper);
  console.log("current card", currentCardEle);
  console.log("current item", newCardEle);
  //   parentNode.replaceChild(itemwrapper, newCardEle.appendChild(itemwrapper));
  newCardEle.appendChild(itemwrapper);
  currentCardEle.removeChild(itemwrapper);
};

// *************************************************(utility functions)******************************************************** */

const getTimeStamp = () => {
  return `T ${date.getHours()} : ${date.getMinutes()} D ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  `;
};

const btnStatus = () => {
  let btnCard = document.querySelector("#btn-add-list");
  if (cardArray.length === 3) {
    btnCard.disabled = true;
  } else btnCard.disabled = false;
  cardArray.length > 3 ? alert("No more task space is allow! sorry..!") : null;
};

const getCardNames = () => {
  return cardArray.map((card) => ({ id: card.id, name: card.title }));
};

// *************************************************(Modal)******************************************************** */

const modalShow = function () {
  const { modal } = getModal();
  modal.style.display = "block";
};

const { span } = getModal();
span.onclick = function () {
  getModal().modal.style.display = "none";
};

const modalClose = (event) => {
  const { modal } = getModal();
  if (event.target == modal) {
    getModal().modal.style.display = "none";
  }
};
// window.onclick = modalClose;

setTimeout(() => {
  console.log(itemArray);
}, 10000);

const handleModalClose = () => {
  const modal = document.getElementById("u-myModal");
  modal.style.display = "none";
};

const getSelectTag = () => {
  let status = document.getElementById("u-status");
  status.innerHTML = "";
  for (card of cardArray) {
    status.innerHTML += `<option value="${card.id}">${card.title}</option>`;
  }

  return status;
};

const updateBtn = document.getElementById("u-item-btn");
updateBtn.onclick = () => handleUpdate(currentItem.id, currentCard.id);

console.log(updateBtn);
