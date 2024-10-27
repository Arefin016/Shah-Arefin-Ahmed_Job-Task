document.addEventListener("DOMContentLoaded", () => {
  const addToOrderButtons = document.querySelectorAll(".add-to-order")
  const cartSidebar = document.getElementById("cart-sidebar")
  const cartItemsContainer = document.querySelector(".cart-item")
  const cartCount = document.getElementById("cart-count")
  const cartHeader = document.querySelector(".cart-header h2")
  let cart = []

  addToOrderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card")
      const productTitle = productCard.querySelector(".product-title").innerText
      const productPrice = parseFloat(
        productCard.querySelector(".price span").innerText
      )
      const imageSrc = productCard.querySelector("img").src

      // Check if item is already in the cart
      if (!cart.find((item) => item.title === productTitle)) {
        const cartItem = {
          title: productTitle,
          price: productPrice,
          quantity: 1,
          button: button,
          image: imageSrc,
        }
        cart.push(cartItem)

        // Update cart display and count
        renderCartItems()
        updateCartCount()

        // Disable the button
        button.disabled = true
        button.classList.add("disabled")
        button.innerText = "Added to Cart"
      }
    })
  })

  function renderCartItems() {
    cartItemsContainer.innerHTML = "" // Clear previous items

    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div")
      cartItemDiv.classList.add("cart-item-info")

      // Item details and image
      const imgElement = document.createElement("img")
      imgElement.src = item.image
      imgElement.alt = item.title
      imgElement.classList.add("cart-item-image")
      cartItemDiv.appendChild(imgElement)

      const itemName = document.createElement("h3")
      itemName.innerText = item.title
      cartItemDiv.appendChild(itemName)

      const itemPrice = document.createElement("p")
      itemPrice.innerText = `$${item.price.toFixed(2)}`
      cartItemDiv.appendChild(itemPrice)

      // Quantity controls
      const quantityControlDiv = document.createElement("div")
      quantityControlDiv.classList.add("quantity-control")

      const minusButton = document.createElement("button")
      minusButton.classList.add("quantity-btn")
      minusButton.innerText = "-"
      quantityControlDiv.appendChild(minusButton)

      const quantityInput = document.createElement("input")
      quantityInput.classList.add("w-[100px]", "text-black")
      quantityInput.type = "number"
      quantityInput.value = item.quantity
      quantityInput.min = "1"
      quantityControlDiv.appendChild(quantityInput)

      const plusButton = document.createElement("button")
      plusButton.classList.add("quantity-btn")
      plusButton.innerText = "+"
      quantityControlDiv.appendChild(plusButton)

      cartItemDiv.appendChild(quantityControlDiv)

      // Delete button
      const deleteButton = document.createElement("button")
      deleteButton.classList.add("delete-btn")
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4.5 4 4.382V4.5H3V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5h-1v-.118l-.118-.118H4.118zM6.5 1a1 1 0 0 1 1-1h1a1 0 0 1 1 1V2h-3V1z"/>
        </svg>`
      deleteButton.addEventListener("click", () => {
        cart = cart.filter((cartItem) => cartItem.title !== item.title)
        item.button.disabled = false
        item.button.classList.remove("disabled")
        item.button.innerText = "Add to Cart"
        renderCartItems()
        updateCartCount()
        updateTotal()
      })
      cartItemDiv.appendChild(deleteButton)

      cartItemsContainer.appendChild(cartItemDiv)

      // Quantity button listeners
      minusButton.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--
          quantityInput.value = item.quantity
          updateTotal()
        }
      })

      plusButton.addEventListener("click", () => {
        item.quantity++
        quantityInput.value = item.quantity
        updateTotal()
      })
    })

    updateTotal()
  }

  function updateCartCount() {
    cartCount.innerText = cart.length
    cartHeader.innerText = `${cart.length} Item${cart.length > 1 ? "s" : ""}`
  }

  function updateTotal() {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    document.querySelector(".cart-total span").innerText = `$${total.toFixed(
      2
    )}`
  }

  // Open and close cart sidebar
  document
    .querySelector(".cart-icon-container")
    .addEventListener("click", () => {
      cartSidebar.classList.toggle("open")
    })

  document.getElementById("close-cart").addEventListener("click", () => {
    cartSidebar.classList.remove("open")
  })
})

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
