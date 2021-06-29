// Globle Variables
let cardArray = [];
const itemArray = [];
let date = new Date();
let todoArray = [];
let goingArray = [];
let doneArray = [];

document.addEventListener("DOMContentLoaded", function (event) {
  let btnSave = document.getElementById("save-item-btn");
  btnSave.addEventListener("click", handleSubmitItem);
  const updateBtn = document.getElementById("u-item-btn");
  updateBtn.addEventListener("click", handleUpdate);
});

// *******************************************(create Dom Elements methods)************************************************************** */

const getCardTamplet = (cardData) => {
  // create Elements
  let main = document.querySelector(".main-section");
  let card = document.createElement("div");
  let titleWrapper = document.createElement("div");
  let title = document.createElement("h3");
  let addItemWrapper = document.createElement("div");
  let addItem = document.createElement("button");
  let menu = getMenu(cardData.id + "-menu-icon");

  let menuIcon = getIcon("&#x22EE;", cardData.id + "menu-icon", (e) => {
    return menu.style.display === "none"
      ? (menu.style.display = "block")
      : (menu.style.display = "none");
  });

  //   make Dom hirarchey
  main.appendChild(card);
  card.appendChild(titleWrapper);
  titleWrapper.appendChild(title);
  titleWrapper.append(menuIcon);
  titleWrapper.appendChild(menu);
  card.appendChild(addItemWrapper);
  addItemWrapper.appendChild(addItem);

  //   Set Attributies
  card.setAttribute("class", "card");
  card.setAttribute("id", cardData.id);
  menu.setAttribute("id", cardData.id + "-menu");
  menuIcon.setAttribute("class", "menu-icon");
  addItemWrapper.setAttribute("class", "add-item-wrapper");

  title.innerText = cardData.title;

  addItem.innerText = "Add Item";
  addItem.addEventListener("click", () => {
    let btnSave = document.getElementById("save-item-btn");
    btnSave.value = cardData.id;
    modalShow();
  });
  //   let menuDelete = document.getElementById("menu-delete");
  //   menuDelete.addEventListener("click", () => handleDelete(cardData.id));
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
  title.setAttribute("id", "item-title");
  description.setAttribute("id", "item-description");
  assign.setAttribute("id", "item-assign");
  //   set values
  let icon = getIcon("&#x270E;", id, OpenUpdateBtn);

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
  // debugger;

  let input = document.getElementById("id-input");

  let value = input.value;
  if (!value) {
    swal(
      "Enter Title",
      "Are you try to create a Card. Please Fill the Title input!"
    );
  } else {
    let cardObj = {
      id: "cardArray" + (cardArray.length + 1),
      title: value,
      timeStamp: getTimeStamp(),
    };
    cardArray.push(cardObj);
    getCardTamplet(cardObj);
    btnStatus();
    input.value = "";
  }
};

const handleCardDelete = (cardEle) => {
  console.log(cardEle);
  let id = cardEle.getAttribute("id");
  let index = cardArray.indexOf(cardArray.find((card) => card.id === id));
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      let card = document.getElementById(id);
      card.remove();
      cardArray.splice(index, 1);
      btnStatus();
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};

const handleSubmitItem = (e) => {
  let btnSave = document.getElementById("save-item-btn");
  let modal = document.getElementById("myModal");
  const { title, description, assign } = getInputEle();

  if (title.value === "" || description.value == "" || assign.value === "") {
    swal("Please Fill all input field !", "...and here's the text!");
  } else {
    const itemObj = {
      id: "itemObj" + (itemArray.length + 1),
      title: title.value,
      description: description.value,
      assign: assign.value,
      cardId: btnSave.value,
      timeStamp: getTimeStamp(),
    };

    let card = document.getElementById(btnSave.value);
    const itemCard = getItemCard(itemObj);

    card.appendChild(itemCard);

    itemArray.push(itemObj);
    modal.style.display = "none";
  }
  title.value = "";
  description.value = "";
  assign.value = "";
};

const OpenUpdateBtn = (e) => {
  let modal = document.getElementById("u-myModal");
  modal.style.display = "block";
  getSelectTag();
  const updateBtn = document.getElementById("u-item-btn");
  updateBtn.value = e.path[0].id;
  let currentCard = document.getElementById("hidden");
  currentCard.value = e.path[2].id;
  let title = document.getElementById("u-title");
  let description = document.getElementById("u-description");
  let assign = document.getElementById("u-assign");
  let itemObj = itemArray.find((item) => item.id === updateBtn.value);
  title.value = itemObj.title;
  description.value = itemObj.description;
  assign.value = itemObj.assign;
};

const handleUpdate = (e) => {
  debugger;
  let title = document.getElementById("u-title");
  let description = document.getElementById("u-description");
  let assign = document.getElementById("u-assign");
  let status = document.getElementById("u-status");
  let statusValue = status.value;

  let updateTitle = document.getElementById("item-title");
  let updateDescrition = document.getElementById("item-description");
  let updateAssign = document.getElementById("item-assign");

  let updateBtn = document.getElementById("u-item-btn");
  let currentCard = document.getElementById("hidden");
  let fromCard = document.getElementById(currentCard.value);
  let toCard = document.getElementById(statusValue);
  let itemCard = document.getElementById(updateBtn.value);

  let oldItemObj = itemArray.find((item) => item.id === updateBtn.value);

  let updateObj = {
    ...oldItemObj,
    title: title.value,
    description: description.value,
    assign: assign.value,
  };
  itemArray.splice(updateBtn.value, 1, updateObj);
  //   updateTitle.innerText = title.value;
  //   updateDescrition.innerText = description.value;
  //   updateAssign.innerText = assign.value;
  fromCard.removeChild(itemCard);
  toCard.appendChild(itemCard);
  handleModalClose();
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

const modalShow = function (e) {
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

const getMenu = (id) => {
  let menuWrapper = document.createElement("div");
  menuWrapper.setAttribute("class", " menu");
  menuWrapper.style.display = "none";
  let cardId = id.split("-")[0];
  menuWrapper.innerHTML = `
  <ul>
    <li onclick=handleCardDelete(${cardId}) id=menu-delete><span>&#9249;</span><h4>Delete</h4></li>
    <li onclick=handleSortByName(${cardId}) id=menu-edit><span>&#9998;</span><h4>Edit</h4></li>
    <li id=menu-sort-name><span>&#x25B2;</span><h4>Sort by Name</h4></li>
    <li id=menu-random-sort><span>&#x25BC;</span><h4>Sort Random</h4></li>
  </ul>
  `;
  return menuWrapper;
};

const handleSortByName = (cardEle) => {
  let cardId = cardEle.getAttribute("id");
  console.log(cardId);
  let cardMenu = document.getElementById(cardId + "-menu");
  cardMenu.style.display = "none";
  let childEle = cardEle.childNodes;
  let sortChild = [...childEle].slice(2);
  console.log(sortChild);
};
