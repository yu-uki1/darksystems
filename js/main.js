/* =========================================================
   DarkSystems Store
   Main JavaScript
   ========================================================= */


/* ---------------------------------------------------------
   1. Theme
   --------------------------------------------------------- */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("darkSystemsTheme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
} else {
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
    );
}


/* Theme icon aktualisieren */

function updateThemeIcon() {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (!themeToggle) {
        return;
    }

    themeToggle.textContent =
        currentTheme === "dark"
            ? "☀️"
            : "🌙";
}


/* Theme wechseln */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

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
}

updateThemeIcon();



/* ---------------------------------------------------------
   2. Cart
   --------------------------------------------------------- */

const cartCountElement =
    document.getElementById("cartCount");


let cartCount =
    parseInt(
        localStorage.getItem("darkSystemsCartCount"),
        10
    ) || 0;


function updateCartCount() {

    if (!cartCountElement) {
        return;
    }

    cartCountElement.textContent = cartCount;
}

updateCartCount();



/* ---------------------------------------------------------
   3. Add to Cart
   --------------------------------------------------------- */

const productButtons =
    document.querySelectorAll(
        ".product-button"
    );


productButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product =
            button.dataset.product ||
            "Produkt";


        cartCount++;

        localStorage.setItem(
            "darkSystemsCartCount",
            cartCount
        );

        updateCartCount();


        /* Button Feedback */

        const originalText =
            button.textContent;

        button.textContent =
            "✓ Hinzugefügt";


        button.disabled = true;


        setTimeout(() => {

            button.textContent =
                originalText;

            button.disabled = false;

        }, 1200);


        console.log(
            `${product} wurde zum Warenkorb hinzugefügt.`
        );
    });

});



/* ---------------------------------------------------------
   4. Cart Button
   --------------------------------------------------------- */

const cartButton =
    document.querySelector(
        ".cart-button"
    );


if (cartButton) {

    cartButton.addEventListener("click", () => {

        alert(
            `Euer Warenkorb enthält aktuell ${cartCount} Produkt${cartCount === 1 ? "" : "e"}.`
        );

    });

}



/* ---------------------------------------------------------
   5. Search
   --------------------------------------------------------- */

const searchButton =
    document.querySelector(
        '[aria-label="Suche"]'
    );


if (searchButton) {

    searchButton.addEventListener("click", () => {

        const searchTerm =
            prompt(
                "Wonach möchtet Ihr suchen?"
            );


        if (!searchTerm) {
            return;
        }


        const products =
            document.querySelectorAll(
                ".product-card"
            );


        const normalizedSearch =
            searchTerm
                .trim()
                .toLowerCase();


        let found = false;


        products.forEach((product) => {

            const productName =
                product
                    .querySelector(".product-name")
                    ?.textContent
                    .toLowerCase() || "";


            if (
                productName.includes(
                    normalizedSearch
                )
            ) {

                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                product.style.outline =
                    "3px solid var(--accent)";

                product.style.outlineOffset =
                    "5px";


                setTimeout(() => {

                    product.style.outline =
                        "";

                    product.style.outlineOffset =
                        "";

                }, 2000);


                found = true;
            }

        });


        if (!found) {

            alert(
                `Kein Produkt für „${searchTerm}“ gefunden.`
            );

        }

    });

}



/* ---------------------------------------------------------
   6. Mobile Menu
   --------------------------------------------------------- */

const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-button"
    );


const mainNav =
    document.querySelector(
        ".main-nav"
    );


if (
    mobileMenuButton &&
    mainNav
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle(
                    "mobile-nav-open"
                );


            mobileMenuButton.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );


    /* Menü nach Klick auf Link schließen */

    mainNav
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "mobile-nav-open"
                    );

                    mobileMenuButton.textContent =
                        "☰";

                }
            );

        });

}



/* ---------------------------------------------------------
   7. Console
   --------------------------------------------------------- */

console.log(
    "%cDarkSystems Store",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "Demo-Shop erfolgreich geladen."
);
