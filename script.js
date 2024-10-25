document.querySelectorAll(".add-to-order").forEach((button) => {
  button.addEventListener("click", function () {
    // Check if the item is already added
    if (!this.classList.contains("added")) {
      // Add 'added' class to disable the button and change text
      this.classList.add("added")
      this.innerText = "Added to Cart"

      // Show the sidebar when an item is added
      const sidebar = document.querySelector(".cart-sidebar")
      sidebar.classList.add("show")
      document.querySelectorAll(".add-to-order").forEach((button) => {
        button.addEventListener("click", function () {
          document.getElementById("cart-sidebar").classList.add("active")
        })
      })

      document
        .getElementById("close-cart")
        .addEventListener("click", function () {
          document.getElementById("cart-sidebar").classList.remove("active")
        })
    }
  })
})
