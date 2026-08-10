"use strict";


/*
    Mobile Navigation
*/

const menuToggle =
    document.querySelector("#menu-toggle");

const mainNavigation =
    document.querySelector("#main-navigation");


if (menuToggle && mainNavigation) {


    menuToggle.addEventListener(
        "click",
        function () {


            const isExpanded =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            /*
                Update ARIA state
            */

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );


            /*
                Update accessible name
            */

            menuToggle.setAttribute(
                "aria-label",
                isExpanded
                    ? "Open navigation menu"
                    : "Close navigation menu"
            );


            /*
                Open / close menu
            */

            mainNavigation.classList.toggle(
                "open"
            );

        }
    );


    /*
        Close mobile menu after
        selecting a navigation link.
    */

    const navigationLinks =
        mainNavigation.querySelectorAll("a");


    navigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNavigation.classList.remove(
                        "open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        }
    );

}
/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");

    const formStatus = document.getElementById("form-status");


    function clearErrors() {

        const inputs = [
            nameInput,
            emailInput,
            subjectInput,
            messageInput
        ];

        const errors = [
            nameError,
            emailError,
            subjectError,
            messageError
        ];


        inputs.forEach(function(input) {

            input.classList.remove("invalid");

        });


        errors.forEach(function(error) {

            error.textContent = "";

        });


        formStatus.textContent = "";

        formStatus.className = "form-status";

    }


    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        clearErrors();

        let valid = true;


        /* Name */

        if (nameInput.value.trim().length < 2) {

            nameInput.classList.add("invalid");

            nameError.textContent =
                "Please enter your name.";

            valid = false;

        }


        /* Email */

        if (!validateEmail(emailInput.value.trim())) {

            emailInput.classList.add("invalid");

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* Subject */

        if (subjectInput.value.trim().length < 3) {

            subjectInput.classList.add("invalid");

            subjectError.textContent =
                "Please enter a subject.";

            valid = false;

        }


        /* Message */

        if (messageInput.value.trim().length < 10) {

            messageInput.classList.add("invalid");

            messageError.textContent =
                "Message should contain at least 10 characters.";

            valid = false;

        }


        if (!valid) {

            formStatus.textContent =
                "Please correct the highlighted fields.";

            formStatus.classList.add("error");

            return;

        }


        /*
         * This is frontend validation only.
         * The form will be connected to a real
         * email service during the final setup.
         */

        formStatus.textContent =
            "Your message is ready to be sent.";

        formStatus.classList.add("success");

        contactForm.reset();

    });

}