/* =========================================================
   DarkSystems Store - Main JavaScript
   ========================================================= */

const themeToggle = document.getElementById("themeToggle");


/* ---------------------------------------------------------
   Theme laden
   --------------------------------------------------------- */

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


/* ---------------------------------------------------------
   Theme-Symbol
   --------------------------------------------------------- */

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


/* ---------------------------------------------------------
   Theme umschalten
   --------------------------------------------------------- */

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


/* ---------------------------------------------------------
   Warenkorb
   --------------------------------------------------------- */

const cartCountElement =
    document.getElementById("cartCount");

let cartCount =
    parseInt(
        localStorage.getItem("darkSystemsCartCount")
    ) || 0;


function updateCart() {
    cartCountElement.textContent = cartCount;
}

updateCart();


const productButtons =
    document.querySelectorAll(".product-button");


productButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        cartCount++;

        localStorage.setItem(
            "darkSystemsCartCount",
            cartCount
        );

        updateCart();

        const oldText =
            button.textContent;

        button.textContent =
            "✓ Hinzugefügt";

        setTimeout(function () {
            button.textContent = oldText;
        }, 1200);

    });

});


/* ---------------------------------------------------------
   Warenkorb öffnen
   --------------------------------------------------------- */

const cartButton =
    document.querySelector(".cart-button");

cartButton.addEventListener("click", function () {

    alert(
        "Warenkorb: " +
        cartCount +
        " Produkt" +
        (cartCount === 1 ? "" : "e")
    );

});
