class AppLogo extends HTMLElement {
  connectedCallback() {
    const devSrc = this.getAttribute("src-dev");
    const prodSrc = this.getAttribute("src-prod");
    const alt = this.getAttribute("alt") || "logo";

    const isLocal = location.protocol === "file:" || location.hostname === "localhost";
    const src = isLocal ? devSrc : prodSrc;

    const img = document.createElement("img");
    img.className = "logo-img";
    img.alt = alt;
    img.loading = "eager";
    img.decoding = "async";
    img.src = src;

    img.onerror = () => {
      this.innerHTML = `
        <svg width="120" height="80" viewBox="0 0 120 80">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stop-color="#2b6cff"/>
              <stop offset="1" stop-color="#ffd43b"/>
            </linearGradient>
          </defs>
          <text x="10" y="55" font-size="60" font-weight="700" fill="url(#g)">M</text>
        </svg>`;
    };

    this.appendChild(img);
  }
}

customElements.define("app-logo", AppLogo);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
