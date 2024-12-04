const main = {
    init: () => {
        main.navigation();
        main.handleMenu();
        main.validateForm();
    },
    navigation: () => {
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll("main section");

        navLinks.forEach((link) => {
            link.addEventListener("click", (e) => {

                // Update active state in navigation
                navLinks.forEach((nav) => {
                    nav.classList.remove("active");
                    nav.removeAttribute("aria-current");
                });
                link.classList.add("active");
                link.setAttribute("aria-current", "page");

                // Hide all sections
                sections.forEach((section) => {
                    section.hidden = true;
                });

                // Show the target section
                const targetId = link.getAttribute("href").substring(1); // Remove the `#`
                const targetSection = document.getElementById(targetId);

                if (!targetSection) {
                    console.error(`Section with ID '${targetId}' not found.`);
                    return;
                }

                targetSection.hidden = false;

                // Move focus to the target section heading
                targetSection.querySelector("h1").focus();
            });
        });
    },
    openDialog: (dialogId) => {
        const dialog = document.getElementById(dialogId);
        const overlay = document.getElementById("overlay");

        dialog.classList.remove("hidden");
        overlay.classList.add("visible");

        dialog.querySelector(".dialog_label").focus();

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const dialog = document.querySelector('[role="alertdialog"]:not(.hidden)');
                if (dialog) {
                    main.closeDialog(dialog.querySelector('button'));
                }
            }
        });
    },
    closeDialog: (button) => {
        const dialog = button.closest('[role="alertdialog"]');
        const overlay = document.getElementById("overlay");

        dialog.classList.add("hidden");
        overlay.classList.remove("visible");

        document.getElementById("modalOpenBtn").focus();

    },
    currentIndex: 0,
    handleMenu: () => {
        const menuItems = document.querySelectorAll('.menubar-navigation a');

        // Function to handle keydown events for navigation
        document.querySelector('.menubar-navigation').addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowRight':
                    // Move focus to the next item
                    main.focusMenuItem(menuItems, (main.currentIndex + 1) % menuItems.length);
                    break;
                case 'ArrowLeft':
                    // Move focus to the previous item
                    main.focusMenuItem(menuItems, (main.currentIndex - 1 + menuItems.length) % menuItems.length);
                    break;
                default:
                    break;
            }
        });


    },
    focusMenuItem: (menuItems, index) => {
        if (index >= 0 && index < menuItems.length) {
            menuItems[index].focus();
            main.currentIndex = index;
        }
    },
    validateForm: () => {
        const submitButton = document.querySelector('#submit-schedule-call');
        const form = document.querySelector('form');

        submitButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission by default

            // Clear previous error messages
            main.clearErrors();

            // Validate each input field
            main.validateInput("business-name", "Please enter your business name!");
            main.validateInput("phone", "Please tell us your phone number!");
            main.validateInput("email", "Please tell us your email!");
            main.validateInput("topic", "Please choose a topic!");

            // If no errors were found, submit the form
            if ($("fieldset.errors").length === 0) {
                form.submit(); // Only submit if all fields are valid
                alert("Form submitted successfully!");
            }
        });
    },
    validateInput: (input, message) => {
        const $input = $('[name="' + input + '"]');
        const isCheckbox = $input.is(':checkbox');
        let isValid = false;

        if (isCheckbox) {
            // For checkboxes, check if at least one is checked
            isValid = $input.is(':checked');
        } else {
            // For other input types, check if the value is non-empty
            const value = $input.val()?.trim();
            isValid = !!value;
        }

        if (!isValid) {
            // Create an error message if input is invalid
            if ($("fieldset.errors").length === 0) {
                $("form").prepend('<fieldset aria-label="errors" class="errors"><legend>Errors</legend><ul></ul></fieldset>');
            }

            const $errorContainer = $("fieldset.errors ul");
            const $error = $('<a href="#">' + message + "</a>");
            $error.click(function (e) {
                // Focus the first invalid input
                $input.first().focus();
                e.preventDefault();
            });

            $errorContainer.append("<li>").find("li:last").append($error);
            $input.attr("aria-describedby", input + "_description"); // Accessible error description

            return false; // Input is invalid
        } else {
            // If input is valid, remove any previous error message
            const $control = $input.closest('.control'); // Adjust as needed to target the right parent
            const existingError = $control.find('.error-message'); // Use jQuery to find the error element
            if (existingError.length) {
                existingError.remove();
            }
            return true; // Input is valid
        }
    },
    clearErrors: () => {
        // Clear all previous error messages
        $("fieldset.errors").remove();
    },
};

document.addEventListener("DOMContentLoaded", main.init);

// Switch code
// Reference: https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-button/
const toggle = document.getElementById('email-updates-switch');

toggle.addEventListener('click', function () {
    const isChecked = this.getAttribute('aria-checked') === 'true';
    this.setAttribute('aria-checked', !isChecked);

    console.log('Email updates preference:', !isChecked);
});

// Add keyboard support
toggle.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.click();
    }
});

// Form checking code
function validateForm() {
    const form = document.querySelector('form');
    return form.checkValidity();
}

// Submit "schedule a call" form
document.querySelector('#submit-schedule-call').addEventListener('click', (e) => {
    const form = e.target.closest('form');
    const formFeedback = document.querySelector('#form-feedback');

    // Let the browser handle validation if the form is invalid
    if (!form.checkValidity()) {
        formFeedback.textContent = 'Please review the form and correct any errors before submitting.';
        formFeedback.classList.add('error-message');
        return;
    }

    // Only prevent default and handle submission if form is valid
    e.preventDefault();

    // Clear previous content
    formFeedback.textContent = '';
    formFeedback.classList.remove('error-message');

    // Handle valid submission
    formFeedback.textContent = 'Form submitted successfully!';
});

const speakerToggle = document.querySelector('#invite-speaker');
const speakerSection = document.querySelector('#event-description-section');

// Event checkbox code
speakerToggle.addEventListener('change', (e) => {
    if (speakerToggle.checked) {
        console.log('Speaker section is visible');
        // Show the section
        speakerSection.classList.remove('hidden');
        speakerSection.setAttribute('aria-hidden', 'false');
        speakerToggle.setAttribute('aria-expanded', 'true');
    } else {
        // Hide the section
        speakerSection.classList.add('hidden');
        speakerSection.setAttribute('aria-hidden', 'true');
        speakerToggle.setAttribute('aria-expanded', 'false');
    }
});

// Enter key support for checkboxes
document.querySelectorAll('fieldset input[type=checkbox]').forEach((checkbox) => {
    checkbox.addEventListener('keydown', (e) => {
        // Add Enter key support
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            checkbox.click();
        }
    });
});
