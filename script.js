// For all button

const allBtn = document.getElementsByClassName("add-to-order")

for (const btn of allBtn) {
  btn.addEventListener("click", function (event) {
    const name = event.target.parentNode.childNodes[1].innerText
    const image = event.target.parentNode.parentNode.childNodes[3]
    const price = event.target.parentNode.childNodes[3].childNodes[0].innerText
    // console.log(name, price)
    const selectedContainer = document.getElementById("cart-sidebar")

    const div = document.createElement("div")
    div.classList.add("cart-item-info")

    const p1 = document.createElement("p")
    const p2 = document.createElement("p")

    p1.innerText = name
    p2.innerText = price

    div.appendChild(p1)
    div.appendChild(p2)

    selectedContainer.appendChild(div)
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
