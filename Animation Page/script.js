document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("title");
    if (title) {
        const text = title.textContent;
        title.innerHTML = "";

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.textContent = text[i];
            span.style.setProperty("--i", i);
            title.appendChild(span);
        }
    }

    const bounceText = document.getElementById("bounce-text");
    if (bounceText) {
        const bounceContent = bounceText.textContent;
        bounceText.innerHTML = "";

        for (let i = 0; i < bounceContent.length; i++) {
            const span = document.createElement("span");
            span.textContent = bounceContent[i];
            span.style.setProperty("--i", i);
            bounceText.appendChild(span);
        }
    }

    const hamburgerMenu = document.getElementById("hamburger-menu");
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function () {
            this.classList.toggle("open");
        });
    }
});
