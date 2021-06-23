console.log("I am working...!");
let cardArray = [];
let date = new Date();

const getCardTamplet = (cardData) => {
  // create Elements
  let main = document.querySelector(".main-section");
  let card = document.createElement("div");
  let titleWrapper = document.createElement("div");
  let title = document.createElement("h3");
  let deleteCardBtn = document.createElement("button");

  //   make Dom hirarchey
  main.appendChild(card);
  card.appendChild(titleWrapper);
  titleWrapper.appendChild(title);
  titleWrapper.append(deleteCardBtn);

  //   Set Attributies
  card.setAttribute("class", "card");
  card.setAttribute("id", cardData.id);
  title.innerHTML = cardData.title;
  deleteCardBtn.innerText = "delete";
  deleteCardBtn.setAttribute("class", "add-task-btn");
  deleteCardBtn.addEventListener("click", () => handleDelete(cardData.id));
};
const handleClickTitle = () => {
  let input = document.getElementById("id-input");
  let value = input.value;
  if (!value) {
    alert("enter title");
  } else {
    let cardObj = {
      id: Math.random(2, 5),
      title: value,
      timeStamp: getTimeStamp(date),
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
  console.log(id, index);
  console.log(cardArray);
};

// utility functions

const getTimeStamp = (dateStr) => {
  return `${date.getDate()} / ${date.getMonth()} / ${date.getYear()}`;
};

const btnStatus = () => {
  let btnCard = document.querySelector("#btn-add-list");
  if (cardArray.length === 3) {
    btnCard.disabled = true;
  } else btnCard.disabled = false;
  cardArray.length > 3 ? alert("No more task space is allow! sorry..!") : null;
};
