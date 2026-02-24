// app.js - Render logic connecting data to DOM
import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderCredentials();
});

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const html = portfolioData.projects.map(project => `
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
