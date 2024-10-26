// For all button
const allBtn = document.getElementsByClassName("add-to-order")

for (const btn of allBtn) {
  btn.addEventListener("click", function (event) {
    const name = event.target.parentNode.childNodes[1].innerText
    const imageSrc = event.target.parentNode.parentNode.childNodes[3].src
    const price = parseFloat(
      event.target.parentNode.childNodes[3].childNodes[0].innerText.replace(
        "$",
        ""
      )
    ) // Parse price

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
    pricePara.innerText = `$${price.toFixed(2)}` // Format price
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
    quantityInput.value = "1" // Initial quantity
    quantityInput.min = "1" // Minimum quantity
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

    // Create and append delete button
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-btn")
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4.5 4 4.382V4.5H3V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5h-1v-.118l-.118-.118H4.118zM6.5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V2h-3V1z"/>
      </svg>`

    deleteButton.addEventListener("click", function () {
      cartItemDiv.remove() // Remove the item from the cart
      updateCartTotal() // Update the cart total after deletion
    })
    cartItemDiv.appendChild(deleteButton)

    // Event listeners for quantity buttons
    minusButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = --currentValue // Decrease quantity
        updateCartTotal() // Update the total price
      }
    })

    plusButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value)
      quantityInput.value = ++currentValue // Increase quantity
      updateCartTotal() // Update the total price
    })

    // Update or add the cart total and place order button if not already present
    if (!document.querySelector(".cart-total")) {
      const cartTotalDiv = document.createElement("div")
      cartTotalDiv.classList.add("cart-total")
      const totalPara = document.createElement("p")
      totalPara.innerHTML = "Total: <span>$0.00</span>" // Placeholder value
      cartTotalDiv.appendChild(totalPara)
      cartSidebar.appendChild(cartTotalDiv)
    }

    if (!document.querySelector(".place-order")) {
      const placeOrderButton = document.createElement("button")
      placeOrderButton.classList.add("place-order")
      placeOrderButton.innerText = "Place Order"
      cartSidebar.appendChild(placeOrderButton)
    }

    updateCartTotal() // Update cart total when a new item is added
  })
}

// Function to update the cart total
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-item")
  let total = 0

  cartItems.forEach((item) => {
    const priceText = item.querySelector("p").innerText // Get the price text
    const quantity = parseInt(item.querySelector("input[type='number']").value) // Get the quantity
    const price = parseFloat(priceText.replace("$", "")) // Convert to float
    total += price * quantity // Calculate total price
  })

  // Update the total displayed in the cart
  const totalPara = document.querySelector(".cart-total p span")
  if (totalPara) {
    totalPara.innerText = `$${total.toFixed(2)}` // Format the total
  }
}

// Add event listener for the Place Order button
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("place-order")) {
    const totalValue = updateCartTotal() // Update cart total
    alert(`Total Order Value: $${totalValue.toFixed(2)}`) // Show total in alert
  }
})

// Function to update cart total
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-item")
  let total = 0

  cartItems.forEach((item) => {
    const priceElement = item.querySelector(".cart-item-info p")
    const quantityInput = item.querySelector("input[type='number']")

    // Check if the elements exist
    if (priceElement && quantityInput) {
      const priceText = priceElement.innerText
      const price = parseFloat(priceText.replace("$", ""))
      const quantity = parseInt(quantityInput.value)
      total += price * quantity // Calculate total price
    }
  })

  // Update the total display
  const totalPara = document.querySelector(".cart-total p span")

  // Ensure totalPara exists before trying to update it
  if (totalPara) {
    totalPara.innerText = `$${total.toFixed(2)}`
  }
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
