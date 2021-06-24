console.log("I am working...!");
// Globle Variables
let cardArray = [];
let date = new Date();
const itemArray = [];

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
const getDiv = (className) => {
  let div = document.createElement("div");
  if (className) {
    div.setAttribute("class", className);
  }
  return div;
};

const getItemCard = (itemObj) => {
  const { id } = itemObj;
  // create ele
  let itemwrapper = document.createElement("div");
  let titleWrapper = getDiv();
  console.log("div by js ", titleWrapper);

  let title = document.createElement("h4");
  let description = document.createElement("h4");
  let assign = document.createElement("h4");
  let time = document.createElement("small");

  //   set Attribute
  itemwrapper.setAttribute("class", "item-card");
  //   set values
  let icon = getIcon("&#128393;", id, updateCard);
  // icon.addEventListener("click", updateCard(itemObj.id));

  //   let span = document.createElement("span");
  //   span.setAttribute("class", "icon");
  //   span.addEventListener("click", () => updateCard(itemObj.id));
  //   span.innerHTML = "&#128393;";

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
      id: Math.random(2, 5),
      title: value,
      timeStamp: getTimeStamp(),
    };
    cardArray.push(cardObj);
    getCardTamplet(cardObj);
    btnStatus();
    console.log(cardArray);
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
  const { title, description, assign } = getInputEle();
  if (title.value === "" || description.value == "" || assign.value === "") {
    alert("Please Fill all input field !");
  } else {
    const itemObj = {
      id: Math.random(10, 15),
      title: title.value,
      description: description.value,
      assign: assign.value,
      timeStamp: getTimeStamp(),
    };

    const todoArray = cardArray.find(
      (card) =>
        card.title === "todos".toLowerCase() ||
        card.title === "todo".toLowerCase()
    );
    let Card = document.getElementById(todoArray.id);
    console.log("main card", Card);
    const itemCard = getItemCard(itemObj);
    Card.appendChild(itemCard);
    itemArray.push(itemObj);
    console.log("item card", itemCard);
    modal.style.display = "none";
  }
};

const updateCard = (e) => {
  debugger;
  console.log("ele", e);
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
