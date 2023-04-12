const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list");
let totalPrice = 0;
let cart = [];
const totalpriceStorage = localStorage.getItem("totalPrice");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

if (totalpriceStorage !== null) {
  totalPrice = parseInt(totalpriceStorage);
}
const cartStorage = localStorage.getItem("cart");
if (cartStorage !== null) {
  let newCart = [];

  JSON.parse(cartStorage).forEach((item) => {
    newCart.push(new Item(item.name, item.price));
  });
  cart = newCart;
}
refreshUI();

function updateStorage() {
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function refreshUI() {
  totalPriceElement.innerText = `Total Price: $${totalPrice}`;
  parentListElement.innerHTML = "";
  cart.forEach((item, index) => {
    const listElement = document.createElement("li");
    const textNode = document.createTextNode(`${item.name} - ${item.price}`);
    listElement.appendChild(textNode);
    parentListElement.appendChild(listElement);
    listElement.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between"
    );
    const deleteButton = document.createElement("button");
    const deleteTextNode = document.createTextNode("Delete");
    deleteButton.appendChild(deleteTextNode);
    deleteButton.classList.add("btn", "btn-danger");
    listElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      cart.splice(index, 1);
      totalPrice -= item.price;
      updateStorage();
      refreshUI();
    });
  });
}

function addItem(form) {
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;
  totalPrice += parseInt(itemPrice);
  const item = new Item(itemName, parseInt(itemPrice));
  cart.push(item);
  updateStorage();
  refreshUI();
  return false;
}
