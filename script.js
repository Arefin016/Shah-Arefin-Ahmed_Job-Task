// For all button
const allBtn = document.getElementsByClassName("add-to-order")

for (const btn of allBtn) {
  btn.addEventListener("click", function (event) {
    const name = event.target.parentNode.childNodes[1].innerText
    const imageSrc = event.target.parentNode.parentNode.childNodes[3].src
    const price = event.target.parentNode.childNodes[3].childNodes[0].innerText

    // Find the cart sidebar container
    const cartSidebar = document.getElementById("cart-sidebar")

    // Create cart item container
    const cartItemDiv = document.createElement("div")
    cartItemDiv.classList.add("cart-item", "border", "rounded")

    // Create and append image element
    const imgElement = document.createElement("img")
    imgElement.src = imageSrc
    imgElement.alt = name
    imgElement.classList.add("cart-item-image")
    cartItemDiv.appendChild(imgElement)

    // Create cart item info container
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("cart-item-info")

    // Create and append item name
    const itemName = document.createElement("h3")
    itemName.innerText = name
    infoDiv.appendChild(itemName)

    // Create and append price paragraph
    const pricePara = document.createElement("p")
    pricePara.innerText = price
    infoDiv.appendChild(pricePara)

    // Create quantity control div
    const quantityControlDiv = document.createElement("div")
    quantityControlDiv.classList.add("quantity-control")

    // Create "-" button
    const minusButton = document.createElement("button")
    minusButton.classList.add("quantity-btn")
    minusButton.innerText = "-"
    quantityControlDiv.appendChild(minusButton)

    // Create quantity input
    const quantityInput = document.createElement("input")
    quantityInput.classList.add("w-[100px]", "text-black")
    quantityInput.type = "number"
    quantityInput.value = "1"
    quantityInput.min = "1"
    quantityControlDiv.appendChild(quantityInput)

    // Create "+" button
    const plusButton = document.createElement("button")
    plusButton.classList.add("quantity-btn")
    plusButton.innerText = "+"
    quantityControlDiv.appendChild(plusButton)

    // Append quantity control to info div
    infoDiv.appendChild(quantityControlDiv)

    // Append infoDiv to the main cart item div
    cartItemDiv.appendChild(infoDiv)

    // Append the complete cart item div to the cart sidebar
    cartSidebar.appendChild(cartItemDiv)

    // Update or add the cart total and place order button if not already present
    if (!document.querySelector(".cart-total")) {
      const cartTotalDiv = document.createElement("div")
      cartTotalDiv.classList.add("cart-total")

      const totalPara = document.createElement("p")
      totalPara.innerHTML = "Total: <span>$20.95</span>" // Placeholder value
      cartTotalDiv.appendChild(totalPara)

      cartSidebar.appendChild(cartTotalDiv)
    }

    if (!document.querySelector(".place-order")) {
      const placeOrderButton = document.createElement("button")
      placeOrderButton.classList.add("place-order")
      placeOrderButton.innerText = "Place Order"

      cartSidebar.appendChild(placeOrderButton)
    }
  })
}

document.querySelectorAll(".add-to-order").forEach((button) => {
  button.addEventListener("click", function () {
    // Check if the item is already added
    if (!this.classList.contains("added")) {
      // Add 'added' class to disable the button and change text
      this.classList.add("added")
      this.innerText = "Added to Cart"

      // Show the sidebar when an item is added
      const sidebar = document.getElementById("cart-sidebar")
      sidebar.classList.add("active") // Show the sidebar by adding 'active' class

      // Add event listener for the close button in the sidebar only once
      const closeCartButton = document.getElementById("close-cart")
      closeCartButton.addEventListener("click", function () {
        sidebar.classList.remove("active") // Hide the sidebar
      })
    }
  })
})
