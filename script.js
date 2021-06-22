console.log("I am working...!");

const btnClick = (name) => {
  console.log("start");
  let main = document.querySelector(".main-section");
  let card = document.createElement("div");
  let titleWrapper = document.createElement("div");
  let title = document.createElement("h3");
  title.innerHTML = name;
  card.setAttribute("class", "card");
  main.appendChild(card);
  card.appendChild(titleWrapper);
  titleWrapper.appendChild(title);
};

{
  /* <div class="card">
  <div>
    <h3 id="title">Todos</h3>
  </div>
</div>; */
}
