document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-navigation");

    if (menuToggle && navigation) {

        const navLinks = navigation.querySelectorAll("a");

        // Function to close mobile menu
        function closeMenu() {
            navigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        // Function to open mobile menu
        function openMenu() {
            navigation.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        }

        // Open / close menu
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                navigation.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Navigation link click
        navLinks.forEach((link) => {

            link.addEventListener("click", (event) => {

                const href = link.getAttribute("href");

                // Only handle section links
                if (
                    href &&
                    href.startsWith("#") &&
                    href.length > 1
                ) {
                    const target =
                        document.getElementById(
                            href.substring(1)
                        );

                    if (target) {
                        event.preventDefault();

                        closeMenu();

                        // Smooth scroll
                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                        // Update URL without jumping
                        if (history.pushState) {
                            history.pushState(
                                null,
                                "",
                                href
                            );
                        }
                    }
                } else {
                    // Normal links
                    closeMenu();
                }

            });

        });

        // Close when clicking outside
        document.addEventListener("click", (event) => {

            if (
                navigation.classList.contains("active") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close with Escape
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("active")
            ) {
                closeMenu();

                // Return focus to menu button
                menuToggle.focus();
            }

        });

        // Close menu when screen becomes desktop
        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        });

    }


    /* =========================================
       SMOOTH SCROLL FOR ALL INTERNAL LINKS
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        // Avoid attaching duplicate behavior to navbar links
        if (
            navigation &&
            navigation.contains(link)
        ) {
            return;
        }

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
                document.getElementById(
                    targetId.substring(1)
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (history.pushState) {
                    history.pushState(
                        null,
                        "",
                        targetId
                    );
                }

            }

        });

    });


    /* =========================================
       HANDLE BROWSER BACK / FORWARD
    ========================================= */

    window.addEventListener("popstate", () => {

        const hash = window.location.hash;

        if (hash) {

            const target =
                document.getElementById(
                    hash.substring(1)
                );

            if (target) {

                setTimeout(() => {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 50);

            }

        } else {

            // If there is no hash, go to top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });


    /* =========================================
       OPEN CORRECT SECTION WHEN PAGE LOADS
       WITH A HASH
    ========================================= */

    if (window.location.hash) {

        const target =
            document.getElementById(
                window.location.hash.substring(1)
            );

        if (target) {

            setTimeout(() => {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }


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