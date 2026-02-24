// app.js - Render logic connecting data to DOM

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderRoadmap();
    initTabs();

    // Check if we are on the main page or case-studies page
    const isMainPage = document.getElementById('roadmap') !== null;
    renderProjects(isMainPage);

    // Check if on details page
    if (document.getElementById('project-detail-container')) {
        renderProjectDetails();
    }

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
            <a href="project-details.html?id=${project.id}" class="btn btn-secondary" style="margin-top: 24px; display: inline-block;">Read Case Study &rarr;</a>
        </article>
    `).join('');

    container.innerHTML = html;
}

function renderProjectDetails() {
    const container = document.getElementById('project-detail-container');
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        container.innerHTML = '<h2>Project not found</h2><a href="index.html" class="btn btn-primary" style="margin-top: 16px;">Go Back</a>';
        return;
    }

    // Find Project
    const project = portfolioData.projects.find(p => p.id === projectId);

    if (!project) {
        container.innerHTML = '<h2>Project not found</h2><a href="index.html" class="btn btn-primary" style="margin-top: 16px;">Go Back</a>';
        return;
    }

    // Safely map results or use description if results array doesn't exist
    let resultsHtml = '';
    if (project.results && project.results.length > 0) {
        resultsHtml = `
            <h3>Results & Impact</h3>
            <ul class="detail-results">
                ${project.results.map(res => `<li>${res}</li>`).join('')}
            </ul>
        `;
    }

    // Render 
    container.innerHTML = `
        <div class="detail-header" style="text-align:center; margin-bottom: 48px;">
            <p class="eyebrow">${project.company} &bull; ${project.duration}</p>
            <h1>${project.title}</h1>
            <div class="project-tags" style="justify-content:center; margin-top:16px;">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>

        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="detail-img" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 12px; margin-bottom: 48px; border: 1px solid var(--border-color);">` : ''}

        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
            <div>
                <h3>Overview</h3>
                <p style="color: var(--text-secondary); line-height: 1.8;">${project.overview || project.description}</p>
            </div>
            <div>
                ${project.problem ? `
                <div style="margin-bottom: 32px;">
                    <h3 style="color: var(--danger);">The Problem</h3>
                    <p style="color: var(--text-secondary); line-height: 1.8;">${project.problem}</p>
                </div>
                ` : ''}
                ${project.solution ? `
                <div>
                    <h3 style="color: var(--accent);">The Solution</h3>
                    <p style="color: var(--text-secondary); line-height: 1.8;">${project.solution}</p>
                </div>
                ` : ''}
            </div>
        </div>

        <div style="margin-top: 60px; padding: 32px; background-color: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
            ${resultsHtml}
        </div>
        
        <div style="text-align:center; margin-top: 64px;">
            <a href="case-studies.html" class="btn btn-secondary">&larr; Back to Case Studies</a>
        </div>
    `;
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
