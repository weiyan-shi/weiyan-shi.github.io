document.addEventListener("DOMContentLoaded", function () {
    const sections = ["header", "about", "overview", "education", "news", "publications", "experience", "awards", "services", "my", "footer"];

    sections.forEach(section => {
        fetch(`components/${section}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => document.getElementById(section).innerHTML = data)
            .catch(error => console.error(`Error loading ${section}:`, error));
    });
});

function copyEmail() {
    const email = "weiyanshi6@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Error copying email: ", err);
    });
}
