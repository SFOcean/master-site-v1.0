// app.js - Render logic connecting data to DOM

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderRoadmap();
    initTabs();

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

function renderRoadmap(category = 'experience') {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // Check if category exists in portfolioData
    const dataArray = portfolioData[category] || portfolioData.experience;

    const html = dataArray.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${item.duration}</div>
            <h3 class="timeline-title">${item.role}</h3>
            <div class="timeline-company">${item.company}</div>
            <p class="timeline-desc">${item.description}</p>
        </div>
    `).join('');

    container.innerHTML = html;
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');

            // Render matching data
            const target = e.target.getAttribute('data-target');
            renderRoadmap(target);
        });
    });
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
