const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list");
let totalPrice = 0;
function addItem(form) {
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;

  totalPrice += parseInt(itemPrice);
  totalPriceElement.innerText = `Total price: $${totalPrice}`;
  const listElement = document.createElement("li");
  const textNode = document.createTextNode(`${itemName} - ${itemPrice}`);
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
    listElement.remove();
    totalPrice -= parseInt(itemPrice);
    totalPriceElement.innerText = `Total Price: $${totalPrice}`;
  });
  return false;
}
