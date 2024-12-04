const main = {
    init: () => {
        main.navigation();
        main.handleHamburger();
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
    },
    closeDialog: (button) => {
        const dialog = button.closest('[role="alertdialog"]');
        const overlay = document.getElementById("overlay");

        dialog.classList.add("hidden");
        overlay.classList.remove("visible");

        document.getElementById("modalOpenBtn").focus();

    },
    handleMenu: () => {
        const menuItems = document.querySelectorAll('.menubar-navigation a');
        let currentIndex = 0;

        // Function to focus the next or previous menu item
        function focusMenuItem(index) {
            if (index >= 0 && index < menuItems.length) {
                menuItems[index].focus();
                currentIndex = index;
            }
        }

        // Function to handle keydown events for navigation
        document.querySelector('.menubar-navigation').addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowRight':
                    // Move focus to the next item
                    focusMenuItem((currentIndex + 1) % menuItems.length);
                    break;
                case 'ArrowLeft':
                    // Move focus to the previous item
                    focusMenuItem((currentIndex - 1 + menuItems.length) % menuItems.length);
                    break;
                default:
                    if (this.isPrintableCharacter(key)) {
                        this.setFocusByFirstCharacter(menuId, tgt, key);
                        flag = true;
                    }
                    break;
            }
        });

        // Focus on the first menu item initially
        focusMenuItem(currentIndex);

        // Optionally handle mouse click to mark the item as active
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
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
