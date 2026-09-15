/* =========================================================
   DarkSystems Store - Main JavaScript
   ========================================================= */


/* ---------------------------------------------------------
   Theme
   --------------------------------------------------------- */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("darkSystemsTheme");

if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );
} else {
    document.documentElement.setAttribute(
        "data-theme",
        "light"
    );
}


function updateThemeIcon() {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Light Mode"
        );

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Dark Mode"
        );
    }
}


updateThemeIcon();


themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    document.documentElement.setAttribute(
        "data-theme",
        newTheme
    );

    localStorage.setItem(
        "darkSystemsTheme",
        newTheme
    );

    updateThemeIcon();

});


/* =========================================================
   Warenkorb
   ========================================================= */


/* ---------------------------------------------------------
   Elemente
   --------------------------------------------------------- */

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartClose =
    document.getElementById("cartClose");

const cartItems =
    document.getElementById("cartItems");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartTotal =
    document.getElementById("cartTotal");

const cartItemCount =
    document.getElementById("cartItemCount");

const cartCheckout =
    document.getElementById("cartCheckout");

const cartButton =
    document.querySelector(".cart-button");

const cartCountElement =
    document.getElementById("cartCount");


/* ---------------------------------------------------------
   Produkte
   --------------------------------------------------------- */

const products = {

    "darkphone-x1-pro": {
        name: "ALVION X10 Ultra",
        price: 1599,
        image: "images/alvion-x10-ultra.png"
    },

    "darkbook-14": {
        name: "DarkBook 14",
        price: 1099,
        image: "images/darkbook-14.png"
    },

    "darkbuds-3": {
        name: "DarkBuds 3",
        price: 149,
        image: "images/darkbuds-3.png"
    }

};


/* ---------------------------------------------------------
   Warenkorb laden
   --------------------------------------------------------- */

let cart =
    JSON.parse(
        localStorage.getItem("darkSystemsCart")
    ) || {};


/* ---------------------------------------------------------
   Warenkorb speichern
   --------------------------------------------------------- */

function saveCart() {

    localStorage.setItem(
        "darkSystemsCart",
        JSON.stringify(cart)
    );
}


/* ---------------------------------------------------------
   Warenkorb öffnen
   --------------------------------------------------------- */

function openCart() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* ---------------------------------------------------------
   Warenkorb schließen
   --------------------------------------------------------- */

function closeCart() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


/* ---------------------------------------------------------
   Warenkorb Button
   --------------------------------------------------------- */

cartButton.addEventListener("click", function () {

    openCart();

});


/* ---------------------------------------------------------
   Close Button
   --------------------------------------------------------- */

cartClose.addEventListener("click", function () {

    closeCart();

});


/* ---------------------------------------------------------
   Overlay
   --------------------------------------------------------- */

cartOverlay.addEventListener("click", function () {

    closeCart();

});


/* ---------------------------------------------------------
   ESC zum Schließen
   --------------------------------------------------------- */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeCart();

    }

});


/* =========================================================
   Warenkorb Rendering
   ========================================================= */

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let itemCount = 0;


    Object.keys(cart).forEach(function (productId) {

        const quantity = cart[productId];

        const product = products[productId];

        if (!product || quantity <= 0) {
            return;
        }


        const productTotal =
            product.price * quantity;


        total += productTotal;

        itemCount += quantity;


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <div>

                    <h3 class="cart-item-name">
                        ${product.name}
                    </h3>

                    <div class="cart-item-price">
                        ${formatPrice(product.price)}
                    </div>

                </div>


                <div class="cart-item-quantity">

                    <button
                        class="cart-quantity-button"
                        data-action="decrease"
                        data-product="${productId}"
                    >
                        −
                    </button>


                    <span class="cart-quantity">
                        ${quantity}
                    </span>


                    <button
                        class="cart-quantity-button"
                        data-action="increase"
                        data-product="${productId}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="cart-item-remove"
                    data-action="remove"
                    data-product="${productId}"
                >
                    Entfernen
                </button>

            </div>


            <div class="cart-item-total">

                ${formatPrice(productTotal)}

            </div>

        `;


        cartItems.appendChild(item);

    });


    /* -----------------------------------------------------
       Leer / nicht leer
       ----------------------------------------------------- */

    if (itemCount === 0) {

        cartEmpty.style.display = "flex";

    } else {

        cartEmpty.style.display = "none";

    }


    /* -----------------------------------------------------
       Gesamtpreis
       ----------------------------------------------------- */

    cartTotal.textContent =
        formatPrice(total);


    /* -----------------------------------------------------
       Anzahl
       ----------------------------------------------------- */

    cartItemCount.textContent =
        itemCount === 1
            ? "1 Produkt"
            : `${itemCount} Produkte`;


    /* -----------------------------------------------------
       Badge im Header
       ----------------------------------------------------- */

    cartCountElement.textContent =
        itemCount;


    /* -----------------------------------------------------
       Checkout
       ----------------------------------------------------- */

    cartCheckout.disabled =
        itemCount === 0;


    if (itemCount === 0) {

        cartCheckout.style.opacity = "0.5";
        cartCheckout.style.cursor = "not-allowed";

    } else {

        cartCheckout.style.opacity = "1";
        cartCheckout.style.cursor = "pointer";

    }

}


/* ---------------------------------------------------------
   Preis formatieren
   --------------------------------------------------------- */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "de-DE",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(price);

}


/* =========================================================
   Produkt hinzufügen
   ========================================================= */

function addToCart(productId) {

    if (!products[productId]) {
        return;
    }


    if (!cart[productId]) {

        cart[productId] = 1;

    } else {

        cart[productId]++;

    }


    saveCart();

    renderCart();

}


/* =========================================================
   Produkt entfernen
   ========================================================= */

function removeFromCart(productId) {

    delete cart[productId];

    saveCart();

    renderCart();

}


/* =========================================================
   Menge ändern
   ========================================================= */

function changeQuantity(
    productId,
    change
) {

    if (!cart[productId]) {
        return;
    }


    cart[productId] += change;


    if (cart[productId] <= 0) {

        delete cart[productId];

    }


    saveCart();

    renderCart();

}


/* =========================================================
   Buttons der Produkte
   ========================================================= */

const productButtons =
    document.querySelectorAll(".product-button");


productButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productId =
                button.dataset.product;


            if (!productId) {
                return;
            }


            addToCart(productId);


            /* ---------------------------------------------
               Button Feedback
               --------------------------------------------- */

            const oldText =
                button.textContent;

            button.textContent =
                "✓ Hinzugefügt";


            setTimeout(function () {

                button.textContent =
                    oldText;

            }, 1200);

        }
    );

});


/* =========================================================
   Klicks im Warenkorb
   ========================================================= */

cartItems.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const productId =
            button.dataset.product;

        const action =
            button.dataset.action;


        if (!productId || !action) {
            return;
        }


        if (action === "increase") {

            changeQuantity(
                productId,
                1
            );

        }


        if (action === "decrease") {

            changeQuantity(
                productId,
                -1
            );

        }


        if (action === "remove") {

            removeFromCart(
                productId
            );

        }

    }
);


/* =========================================================
   Checkout
   ========================================================= */

cartCheckout.addEventListener(
    "click",
    function () {

        if (
            Object.keys(cart).length === 0
        ) {
            return;
        }


        alert(
            "Demo-Shop\n\n" +
            "Hier würde normalerweise " +
            "der Checkout beginnen.\n\n" +
            "Es wird keine echte Bestellung " +
            "aufgegeben."
        );

    }
);


/* =========================================================
   Initialisieren
   ========================================================= */

renderCart();
