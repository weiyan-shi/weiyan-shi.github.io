document.addEventListener("DOMContentLoaded", initNewsToggle);
document.addEventListener("DOMContentLoaded", initScholarCitations);

async function initScholarCitations() {
    const link = document.querySelector('.scholar-profile');
    const label = link?.querySelector('.scholar-citations');
    if (!label) return;

    const user = new URL(link.href).searchParams.get('user');
    const params = new URLSearchParams({
        url: `https://scholar.google.com/citations?user=${user}`,
        query: "(//td[@class='gsc_rsb_std'])[1]",
        label: 'Scholar',
        suffix: ' Citations',
        cacheSeconds: '86400'
    });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        // Shields caches the public Scholar result; no polling or page-blocking work.
        const response = await fetch(`https://img.shields.io/badge/dynamic/xml?${params}`, {
            signal: controller.signal
        });
        if (!response.ok) return;
        const svg = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
        const match = svg.querySelector('title')?.textContent.match(/^Scholar: (\d[\d,]*) Citations$/);
        if (!match) return;
        const count = Number(match[1].replaceAll(',', ''));
        if (!Number.isSafeInteger(count) || count < 0) return;
        label.textContent = `${count.toLocaleString('en-US')} Citations`;
        link.setAttribute('aria-label', `Google Scholar · ${label.textContent}`);
        link.title = `Google Scholar · ${label.textContent} (daily cached count)`;
    } catch {
        // Keep the dated, verified count if Scholar or Shields is unavailable.
    } finally {
        clearTimeout(timeout);
    }
}

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
