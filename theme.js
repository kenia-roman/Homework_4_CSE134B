
const themeToggle = document.querySelector("#theme-toggle");

const root = document.documentElement;

let currentTheme = "light";

try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
} catch (error) {
    console.warn("Could not read saved theme.");
}

root.dataset.theme = currentTheme;

function updateButton() {
    if (!themeToggle) return;

    if (root.dataset.theme === "dark") {
        themeToggle.textContent = "Switch to Light Mode";
    } else {
        themeToggle.textContent = "Switch to Dark Mode";
    }
}

function changeTheme() {
    const newTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = newTheme;

    updateButton();

    try {
        localStorage.setItem("theme", newTheme);
    } catch (error) {
        console.warn("Could not save theme preference.");
    }
}

function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}

if (themeToggle) {
    updateButton();

    themeToggle.hidden = false;

    themeToggle.addEventListener("click", function() {

        if (
            !document.startViewTransition ||
            prefersReducedMotion()
        ) {
            changeTheme();
            return;
        }

        document.startViewTransition(function() {
            changeTheme();
        });
    });
}
