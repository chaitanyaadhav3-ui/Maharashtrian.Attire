// MAHARASHTRIAN VASTRA WEBSITE

// 1. SHOPPING CART
let cart = [];

const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function updateCart() {
    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-row";

        const name = document.createElement("span");
        name.textContent =
            `${item.name} × ${item.quantity} - ₹${item.price * item.quantity}`;

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "Remove";
        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        row.append(name, remove);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = "Total: ₹" + total.toLocaleString("en-IN");
    checkoutBtn.disabled = cart.length === 0;
}

// Add to Cart buttons
document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        const originalText = button.textContent;
        button.textContent = "✓ Added Successfully!";
        button.classList.add("added");

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove("added");
        }, 1200);
    });
});

// Open shopping cart
document.querySelector(".cart-icon").addEventListener("click", () => {
    cartModal.classList.add("show");
    updateCart();
});

// 2. PRODUCT DETAILS
const productModal = document.getElementById("productModal");

document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", () => {

        document.getElementById("modalProductName").textContent =
            button.dataset.name;

        document.getElementById("modalProductDescription").textContent =
            button.dataset.description;

        document.getElementById("modalProductPrice").textContent =
            "Price: ₹" +
            Number(button.dataset.price).toLocaleString("en-IN");

        productModal.classList.add("show");
    });
});

// 3. CLOSE MODALS
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.close).classList.remove("show");
    });
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// 4. CHECKOUT DEMO
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    alert("Thank you for shopping with Maharashtrian Vastra! ❤️");

    cart = [];
    updateCart();
    cartModal.classList.remove("show");
});

// 5. CATEGORY FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const womenProducts = document.querySelectorAll("#women .product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        womenProducts.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === "all" || category === cardCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// 6. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// 7. CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!mobilePattern.test(mobile)) {
        alert("Please enter a valid 10-digit Indian mobile number.");
        return;
    }

    if (message === "") {
        alert("Please enter your message.");
        return;
    }

    alert("Thank you " + name + "! Your enquiry has been submitted successfully.");

    contactForm.reset();
});

// Initial cart display
updateCart();