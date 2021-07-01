// Globle Variables
let cardArray = [];
const itemArray = [];
let date = new Date();
let fromCard;
let assignApiData = [];
document.addEventListener("DOMContentLoaded", function (event) {
  let btnSave = document.getElementById("save-item-btn");
  btnSave.addEventListener("click", handleSubmitItem);
  const updateBtn = document.getElementById("u-item-btn");
  updateBtn.addEventListener("click", handleUpdate);
});

window.onload = () => {
  console.log("I am working");
  fetch("https://mocki.io/v1/6744ad1c-df19-43ef-99bc-0a92e9a41669")
    .then((res) => res.json())
    .then((data) => (assignApiData = data))
    .catch((e) => console.log(e));
};
setTimeout(() => {
  console.log(assignApiData);
}, 5000);
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
  const { title, description } = getInputEle();
  let assign = document.getElementById("assign");
  assign.innerHTML = "";
  for (let data of objData) {
    assign.innerHTML += `<option value=${data.name}> ${data.name} </option>`;
  }

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
  debugger;
  let modal = document.getElementById("u-myModal");
  modal.style.display = "block";
  getSelectTag("u-status");
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

const getSelectTag = (id) => {
  let status = document.getElementById(id);
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
    <li onclick=openStatusModal(${cardId}) id=menu-edit><span>&#10148;</span><h4>Move All</h4></li>
    <li onclick=handleSortByName(${cardId}) id=menu-sort-name><span>&#x25B2;</span><h4>Sort by Name</h4></li>
    <li onclick=handleSortRandom(${cardId}) id=menu-random-sort><span>&#x25BC;</span><h4>Sort Random</h4></li>
  </ul>
  `;
  return menuWrapper;
};

const handleSortByName = (cardEle) => {
  //   debugger;
  let cardId = cardEle.getAttribute("id");
  let card = document.getElementById(cardId);
  let filteredItems = itemArray
    .filter((item) => item.cardId === cardId)
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  let cardMenu = document.getElementById(cardId + "-menu");
  cardMenu.style.display = "none";
  let childEle = [...cardEle.childNodes].slice(2);
  let itemObjId = getItemIds(childEle);
  for (let itemId of itemObjId) {
    document.getElementById(itemId).remove();
  }
  console.log(filteredItems);
  for (let item of filteredItems) {
    let itemWrapper = getItemCard(item);
    card.appendChild(itemWrapper);
  }
};
const handleSortRandom = (cardEle) => {
  //   debugger;
  let cardId = cardEle.getAttribute("id");
  let card = document.getElementById(cardId);
  let cardMenu = document.getElementById(cardId + "-menu");
  cardMenu.style.display = "none";
  let filteredItems = itemArray.filter((item) => item.cardId === cardId);

  console.log("filterd item", filteredItems);
  let randomSort = filteredItems.sort(() => Math.random() - 0.5);
  console.log(randomSort);

  let childEle = [...cardEle.childNodes].slice(2);
  let itemObjId = getItemIds(childEle);
  for (let itemId of itemObjId) {
    document.getElementById(itemId).remove();
  }
  console.log(filteredItems);
  for (let item of randomSort) {
    let itemWrapper = getItemCard(item);
    card.appendChild(itemWrapper);
  }
};

const openStatusModal = (cardEle) => {
  debugger;
  getSelectTag("modal-status");
  closeStatusModal();
  fromCard = cardEle;
  let cardId = cardEle.getAttribute("id");
  let cardMenu = document.getElementById(cardId + "-menu");
  cardMenu.style.display = "none";
};

const handleMoveAll = () => {
  debugger;
  closeStatusModal();

  let cardId = fromCard.getAttribute("id");
  let cardEle = document.getElementById(cardId);
  let toCard = document.getElementById("modal-status").value;
  let items = itemArray.filter((item) => item.id === cardId);
  let changeParentId = items.map((item) => {
    if (item.cardId === cardId) item.cardId = toCard;
  });
  // let items = itemArray.filter((item) => item.cardId === cardId);
  let childEle = [...cardEle.childNodes].slice(2);
  let itemObjId = getItemIds(childEle);
  let toCardEle = document.getElementById(toCard);
  // console.log(childEle);
  // console.log(itemObjId);
  for (let itemId of itemObjId) {
    document.getElementById(itemId).remove();
  }
  for (let item of changeParentId) {
    let itemWrapper = getItemCard(item);
    toCardEle.appendChild(itemWrapper);
  }
  console.log("from card", fromCard);
  console.log("To card", toCard);
  console.log("items array", changeParentId);
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

const getItemIds = (childEleArray) => {
  let itemIds = [];
  for (let ele of childEleArray) {
    itemIds.push(ele.id);
  }
  return itemIds;
};

const closeStatusModal = () => {
  console.log("i am here");

  let statusModal = document.getElementById("status-modal-container");

  return statusModal.style.display === "none"
    ? (statusModal.style.display = "flex")
    : (statusModal.style.display = "none");
};

const handleDeleteItem = (e) => {
  let id = e.target.id;
  let itemId = id.split("-")[0];
  console.log("delete icon clicked", id);
  console.log("item id", itemId);
  let itemIndex = itemArray.indexOf(
    itemArray.find((item) => item.id === itemId)
  );

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
      console.log(itemIndex);
      document.getElementById(itemId).remove();
      itemArray.splice(itemIndex, 1);
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};
function getAssign(objData) {
  let seleteTag = "";

  for (let data of objData) {
    seleteTag += `<option value=${data.name}> ${data.name} </option>`;
  }
  return seleteTag;
}

setTimeout(() => {
  console.log(getAssign(assignApiData));
}, 4000);
