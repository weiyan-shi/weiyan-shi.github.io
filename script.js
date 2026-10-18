document.addEventListener("DOMContentLoaded", initNewsToggle);

function initNewsToggle() {
    const newsList = document.getElementById('news-list');
    const newsToggle = document.querySelector('.news-toggle');

    if (!newsList || !newsToggle || newsList.scrollHeight <= newsList.clientHeight) {
        return;
    }

    newsToggle.classList.add('is-visible');
    newsToggle.addEventListener('click', () => {
        const isExpanded = newsList.classList.toggle('is-expanded');
        newsToggle.setAttribute('aria-expanded', String(isExpanded));
        newsToggle.textContent = isExpanded ? 'Show less' : 'Show more';
    });
}

function copyEmail(element) {
    const email = element ? element.dataset.email || element.textContent.trim() : "weiyanshi6@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Error copying email: ", err);
    });
}
