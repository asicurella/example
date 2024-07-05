import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["popover"];

  connect() {
    console.log("Quick Add controller connected");
  }

  addToCart(event) {
    event.preventDefault();
    let productId = this.element.dataset.productId;
    console.log("Add to cart clicked for product ID:", productId);

    // Example: Fetch popover content via AJAX or manipulate it as needed
    let popoverContent = `
      <div class="popover">
        <h3>Select Options</h3>
        <form id="add-to-cart-form">
          <label for="length">Length:</label>
          <select name="length" id="length">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
          
          <label for="size">Size:</label>
          <select name="size" id="size">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          
          <input type="hidden" name="product_id" value="${productId}">
          <input type="hidden" name="quantity" value="1">
          
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    `;

    // Insert popover content into the DOM
    this.popoverTarget.innerHTML = popoverContent;
  }

  // Example: Handle form submission (add to cart action)
  submitForm(event) {
    event.preventDefault();
    
    // Get form data
    let formData = new FormData(event.target);

    // Perform AJAX request to add to cart endpoint
    fetch('/orders/populate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product added to cart!', data);
      // Handle success (e.g., update cart icon)
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    })
    .finally(() => {
      // Example: Hide popover after adding to cart (optional)
      this.popoverTarget.innerHTML = ''; // Clear popover content
    });
  }
}
