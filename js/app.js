// app.js - Render logic connecting data to DOM

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderRoadmap();

    // Check if we are on the main page or case-studies page
    const isMainPage = document.getElementById('roadmap') !== null;
    renderProjects(isMainPage);

    renderCredentials();
});

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateIcons(newTheme);
        });
    }

    function updateIcons(theme) {
        if (!sunIcon || !moonIcon) return;
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}

function renderRoadmap() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const html = portfolioData.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-date">${exp.duration}</div>
            <h3 class="timeline-title">${exp.role}</h3>
            <div class="timeline-company">${exp.company}</div>
            <p class="timeline-desc">${exp.description}</p>
        </div>
    `).join('');

    container.innerHTML = html;
}

function renderProjects(featuredOnly = false) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    let projects = portfolioData.projects;
    if (featuredOnly) {
        projects = projects.filter(p => p.featured);
    }

    const html = projects.map(project => `
        <article class="project-card">
            <div class="project-meta">
                <span class="company">${project.company}</span>
                <span class="duration">${project.duration}</span>
            </div>
            <h3>${project.title}</h3>
            <p class="desc">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </article>
    `).join('');

    container.innerHTML = html;
}

function renderCredentials() {
    const container = document.getElementById('credentials-container');
    if (!container) return;

    const html = portfolioData.credentials.map(cred => `
        <div class="credential-item">
            <div class="credential-icon">${cred.icon}</div>
            <div class="credential-info">
                <h4>${cred.title}</h4>
                <p>${cred.issuer} &bull; ${cred.date}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}
