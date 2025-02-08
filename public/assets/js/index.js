document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById("searchInput");
    const iframe = document.querySelector("#proxy-iframe");
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    document.body.appendChild(loadingScreen);

    iframe.style.display = "none";
    loadingScreen.style.display = "none";

    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSearch(searchInput.value);
        }
    });

    async function handleSearch(query) {
        const searchURL = generateSearchUrl(query);

        loadingScreen.style.display = "flex";
        iframe.style.display = "none"; 
        
        iframe.src = await getUrl(searchURL);

        iframe.onload = () => {
            loadingScreen.style.display = "none"; 
            iframe.style.display = "block"; 
        };
    }

    function generateSearchUrl(query) {
        try {
            const url = new URL(query);
            return url.toString(); 
        } catch {
            try {
                const url = new URL(`https://${query}`);
                if (url.hostname.includes(".")) return url.toString(); 
            } catch {}
        }
        return `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web`;
    }

    function getUrl(url) {
        return Promise.resolve(__uv$config.prefix + __uv$config.encodeUrl(url));
    }
});
