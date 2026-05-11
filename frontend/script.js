let cart = [];

const productsContainer =
  document.getElementById("products");

let allProducts = [];

async function fetchProducts() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/products"
    );

    const products = await response.json();

    allProducts = products;

    displayProducts(products);

  } catch (error) {

    console.log(error);

  }

}

function displayProducts(products) {

  productsContainer.innerHTML = products
    .map(
      (product) => `

      <div class="card">

        <img 
          src="${product.image}" 
          alt="${product.title}" 
          onclick="showProductDetails('${product.title}')"
        />

        <div class="card-content">

          <h3 onclick="showProductDetails('${product.title}')">
            ${product.title}
          </h3>

          <p>${product.description}</p>

          <div class="price-row">

            <span class="price">
              ₹${product.price}
            </span>

            <button 
              class="buy-btn"
              onclick="addToCart('${product.title}')"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    `
    )
    .join("");

}

function showProductDetails(productTitle) {

  const product = allProducts.find(
    (p) => p.title === productTitle
  );

  const modal =
    document.getElementById("product-modal");

  const modalContent =
    document.getElementById("product-details");

  modalContent.innerHTML = `

    <img 
      src="${product.image}" 
      style="
        width:100%;
        border-radius:20px;
        margin-bottom:20px;
      "
    />

    <h2>${product.title}</h2>

    <p style="margin:20px 0;">
      ${product.description}
    </p>

    <h3 style="color:#38bdf8;">
      ₹${product.price}
    </h3>

    <button
      class="buy-btn"
      style="
        margin-top:20px;
        width:100%;
      "
      onclick="addToCart('${product.title}')"
    >
      Add To Cart
    </button>

  `;

  modal.classList.add("active");

}
function closeProductModal() {

  document
    .getElementById("product-modal")
    .classList.remove("active");

}
function addToCart(productName) {

  cart.push(productName);

  alert(productName + " added to cart");

}

function goToProducts() {

  document
    .getElementById("products-section")
    .scrollIntoView({
      behavior: "smooth",
    });

}

function openCart() {

  const cartModal =
    document.getElementById("cart-modal");

  const cartItems =
    document.getElementById("cart-items");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>Your cart is empty</p>";

  } else {

    cart.forEach((item) => {

      total += 999;

      cartItems.innerHTML += `

        <div class="cart-item">

          <p>${item}</p>

          <h4>₹999</h4>

        </div>

      `;

    });

    cartItems.innerHTML += `

      <div style="
        margin-top:20px;
        padding-top:20px;
        border-top:1px solid #444;
      ">

        <h3>Total: ₹${total}</h3>

        <button 
          onclick="buyNow()"
          class="close-btn"
          style="margin-top:15px;"
        >
          Buy Now
        </button>

      </div>

    `;

  }

  cartModal.style.right = "0";

}

function closeCart() {

  document.getElementById(
    "cart-modal"
  ).style.right = "-100%";

}

function buyNow() {

  alert(
    "Order placed successfully 🚀"
  );

  cart = [];

  closeCart();

}
function showCollection(collectionName) {

  const productsSection =
    document.getElementById("products");

  let collectionProducts = [];

  if (collectionName === "Sneakers Collection") {

    collectionProducts = [

      {
        title: "Nike Air Max",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        description: "Premium sneakers for sports and fashion",
        price: "4999"
      },

      {
        title: "Adidas Sneakers",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
        description: "Comfortable stylish sneakers",
        price: "5999"
      }

    ];

  }

  else if (collectionName === "Gaming Collection") {

    collectionProducts = [

      {
        title: "Gaming Headset",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        description: "RGB gaming headset",
        price: "3499"
      },

      {
        title: "Gaming Keyboard",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
        description: "Mechanical RGB keyboard",
        price: "4999"
      }

    ];

  }

  else if (collectionName === "Mobile Collection") {

    collectionProducts = [

      {
        title: "iPhone 16 Pro",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
        description: "Apple flagship smartphone",
        price: "149999"
      },

      {
        title: "Samsung Galaxy Ultra",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
        description: "Premium Android smartphone",
        price: "119999"
      }

    ];

  }

  else {

    collectionProducts = [

      {
        title: collectionName,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
        description: "Premium collection products",
        price: "2999"
      }

    ];

  }

  allProducts = collectionProducts;

  displayProducts(collectionProducts);

  document
    .getElementById("products-section")
    .scrollIntoView({
      behavior: "smooth"
    });

}

fetchProducts();