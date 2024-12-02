const main = {
    init: () => {
        main.navigation();
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
};

document.addEventListener("DOMContentLoaded", main.init);
