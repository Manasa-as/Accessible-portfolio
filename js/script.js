document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-navigation");

    if (menuToggle && navigation) {

        const navLinks = navigation.querySelectorAll("a");

        // Open / close mobile menu
        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        // Close menu when a navigation link is clicked
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Close menu when clicking outside navigation
        document.addEventListener("click", (event) => {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNavigation &&
                !clickedMenuButton &&
                navigation.classList.contains("active")
            ) {

                navigation.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        // Close menu when pressing Escape
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("active")
            ) {

                navigation.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.focus();

            }

        });


        // Close menu automatically if screen becomes desktop size
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                navigation.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            const name =
                contactForm.querySelector("#name");

            const email =
                contactForm.querySelector("#email");

            const message =
                contactForm.querySelector("#message");


            let isValid = true;


            // Name validation
            if (name && name.value.trim() === "") {

                name.setCustomValidity(
                    "Please enter your name."
                );

                isValid = false;

            } else if (name) {

                name.setCustomValidity("");

            }


            // Email validation
            if (email && email.value.trim() === "") {

                email.setCustomValidity(
                    "Please enter your email address."
                );

                isValid = false;

            } else if (email) {

                email.setCustomValidity("");

            }


            // Message validation
            if (message && message.value.trim() === "") {

                message.setCustomValidity(
                    "Please enter your message."
                );

                isValid = false;

            } else if (message) {

                message.setCustomValidity("");

            }


            if (!isValid) {

                event.preventDefault();

            }

        });

    }


    /* =========================================
       FADE-IN ANIMATION
    ========================================= */

    const animatedElements =
        document.querySelectorAll(
            ".skill-card, .project-card, .core-skill"
        );

    if (
        "IntersectionObserver" in window &&
        animatedElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        animatedElements.forEach((element) => {

            observer.observe(element);

        });

    }

});