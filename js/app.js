// app.js - Render logic connecting data to DOM

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initActiveNav();
    renderUpdates();

    // Check if we are on the main page or case-studies page
    const isMainPage = document.getElementById('roadmap') !== null;
    renderProjects(isMainPage);

    // Check if on details page
    if (document.getElementById('project-detail-container')) {
        renderProjectDetails();
    }

    if (document.getElementById('work-full-container')) {
        renderWork();
        initWorkNavSlider();
    }

    if (document.getElementById('education-container')) {
        renderEducation();
    }

    if (document.getElementById('blog-list-container')) {
        renderBlogs();
    }

    if (document.getElementById('blog-detail-container')) {
        renderBlogDetails();
    }

    renderCredentials();
});

function initWorkNavSlider() {
    const sliderLinks = document.querySelectorAll('.work-nav-slider a');
    if (sliderLinks.length === 0) return;

    // Define the sections to observe
    const sections = Array.from(sliderLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(section => section !== null);

    if (sections.length === 0) return;

    // Options for the IntersectionObserver
    // Set rootMargin such that a section is considered "active" when it crosses the top to mid portion of screen
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the link corresponding to this section
                const targetId = entry.target.getAttribute('id');
                sliderLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                        // Optional: automatically scroll the slider to ensure the active link is visible
                        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        });
    }, observerOptions);

    // Start observing sections
    sections.forEach(section => observer.observe(section));

    // For smooth manual clicking
    sliderLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            sliderLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

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

function renderUpdates() {
    const container = document.getElementById('updates-container');
    if (!container || !portfolioData.updates) return;

    const html = portfolioData.updates.map(item => `
        <div class="update-item">
            <div class="update-date">${item.date}</div>
            <div class="update-content">
                <p class="update-desc">${item.description}</p>
                <span class="update-tag">${item.category}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

function renderWork() {
    // 1. Render Experience
    const expContainer = document.getElementById('work-experience-container');
    if (expContainer && portfolioData.experience) {
        expContainer.innerHTML = `
            <div class="work-block">
                <div class="work-label">Experience</div>
                <div class="work-items">
                    ${portfolioData.experience.map(item => `
                        <div class="work-item">
                            ${item.logo ? `<img class="work-company-logo" src="${item.logo}" alt="${item.company}">` : ''}
                            <div class="work-info">
                                <h3 class="work-title">${item.role}</h3>
                                <div class="work-company">${item.company}</div>
                                <p class="work-desc">${item.description}</p>
                            </div>
                            <div class="work-date">${item.duration}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 2. Render Projects (Horizontal Slider)
    const projContainer = document.getElementById('work-projects-list-container');
    if (projContainer && portfolioData.projects) {
        projContainer.innerHTML = `
            <div class="work-block">
                <div class="work-label">Projects</div>
                <div class="work-items" style="min-width: 0;">
                    <div style="display: flex; gap: 24px; overflow-x: auto; padding-bottom: 24px; margin-bottom: 8px; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: var(--border-color) transparent;">
                        ${portfolioData.projects.map(project => `
                            <article style="flex: 0 0 calc(50% - 12px); min-width: 280px; scroll-snap-align: start; padding: 24px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; display: flex; flex-direction: column; transition: all 0.2s;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                    <h3 style="font-size: 1.25rem; margin: 0; line-height: 1.3;">${project.title}</h3>
                                </div>
                                <p style="font-size: 0.95rem; margin-bottom: 24px; line-height: 1.6; color: var(--text-secondary); flex: 1;">${project.description}</p>
                                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                                    ${(project.tags || []).slice(0, 3).map(tag => `<span style="font-size: 0.75rem; color: var(--text-muted); padding: 4px 10px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 100px;">${tag}</span>`).join('')}
                                </div>
                                <a href="project-details.html?id=${project.id}" class="btn btn-secondary" style="display: block; padding: 10px 16px; font-size: 0.85rem; font-weight: 500; width: 100%; box-sizing: border-box; text-align: center; border-radius: 8px; transition: border-color 0.2s;">View Case Study &rarr;</a>
                            </article>
                        `).join('')}
                    </div>
                    <div style="margin-top: 16px; margin-bottom: 24px;">
                        <a href="case-studies.html" class="btn btn-outline" style="font-size: 0.95rem; color: var(--text-muted); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">Explore all case studies &rarr;</a>
                    </div>
                </div>
            </div>
        `;
    }

    // 3. Render Skills
    const skillsContainer = document.getElementById('work-skills-container');
    if (skillsContainer && portfolioData.skills) {
        skillsContainer.innerHTML = `
            <div class="work-block">
                <div class="work-label">Skills</div>
                <div class="work-items" style="display: flex; flex-direction: column; gap: 32px;">
                    ${portfolioData.skills.map(skillGroup => `
                        <div class="skill-group">
                            <h4 style="margin-bottom: 16px; color: var(--text-secondary); font-size: 1rem; font-weight: 400;">${skillGroup.category}</h4>
                            <div class="skills-container">
                                ${skillGroup.items.map(skill => `
                                    <div class="skill-pill">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 4. Render Education (Reuse education array)
    const eduContainer = document.getElementById('work-education-full-container');
    if (eduContainer && portfolioData.education) {
        eduContainer.innerHTML = `
            <div class="work-block">
                <div class="work-label">Education</div>
                <div class="work-items" style="display: flex; flex-direction: column; gap: 48px;">
                    ${portfolioData.education.map(eduGroup => `
                        <div class="edu-group">
                            <h4 style="margin-bottom: 0px; color: var(--text-secondary); font-size: 1rem; font-weight: 400; padding-bottom: 12px; border-bottom: 1px dotted var(--border-color);">${eduGroup.category}</h4>
                            <div style="display: flex; flex-direction: column;">
                                ${eduGroup.items.map(item => `
                                    <div class="work-item">
                                        ${item.logo ? `<img class="work-company-logo" src="${item.logo}" alt="${item.company}">` : ''}
                                        <div class="work-info">
                                            <h3 class="work-title">${item.role}</h3>
                                            <div class="work-company">${item.company}</div>
                                            <p class="work-desc">${item.description}</p>
                                        </div>
                                        <div class="work-date">${item.duration}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 5. Render Stack
    const stackContainer = document.getElementById('work-stack-container');
    if (stackContainer && portfolioData.stack) {
        stackContainer.innerHTML = `
            <div class="work-block">
                <div class="work-label">Stack</div>
                <div class="work-items">
                    <div class="stack-grid">
                        ${portfolioData.stack.map(tool => `
                            <div class="stack-card">
                                <svg class="stack-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${tool.icon}"></path></svg>
                                <div class="stack-name">${tool.name}</div>
                                <div class="stack-category">${tool.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

function renderEducation() {
    const container = document.getElementById('education-container');
    if (!container || !portfolioData.education) return;

    const html = `
        <div class="work-block">
            <div class="work-label">Education</div>
            <div class="work-items">
                ${portfolioData.education.map(item => `
                    <div class="work-item">
                        <div class="work-info">
                            <h3 class="work-title">${item.role}</h3>
                            <div class="work-company">${item.company}</div>
                            <p class="work-desc">${item.description}</p>
                        </div>
                        <div class="work-date">${item.duration}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

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

function renderBlogs() {
    const container = document.getElementById('blog-list-container');
    if (!container || !portfolioData.blogs) return;

    const html = portfolioData.blogs.map(blog => `
        <article class="project-card" style="padding: 32px;">
            <div class="project-meta" style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 0.85rem;">
                <span class="date" style="color: var(--text-primary); font-weight: 500;">${blog.date}</span>
                <span class="duration" style="color: var(--text-muted);">&bull; ${blog.readTime}</span>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 16px;">
                <a href="blog-details.html?id=${blog.id}" style="text-decoration: none; color: inherit;">${blog.title}</a>
            </h3>
            <p class="desc" style="font-size: 1.05rem; line-height: 1.6;">${blog.summary}</p>
            <div class="project-tags" style="margin-top: 16px;">
                ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="blog-details.html?id=${blog.id}" class="btn btn-secondary" style="margin-top: 24px; display: inline-block;">Read Article &rarr;</a>
        </article>
    `).join('');

    container.innerHTML = html;
}

function renderBlogDetails() {
    const container = document.getElementById('blog-detail-container');
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (!blogId) {
        container.innerHTML = '<h2>Article not found</h2><a href="blog.html" class="btn btn-primary" style="margin-top: 16px;">Go Back</a>';
        return;
    }

    // Find Blog
    const blog = portfolioData.blogs.find(b => b.id === blogId);

    if (!blog) {
        container.innerHTML = '<h2>Article not found</h2><a href="blog.html" class="btn btn-primary" style="margin-top: 16px;">Go Back</a>';
        return;
    }

    // Render 
    container.innerHTML = `
        <div class="detail-header" style="text-align:center; margin-bottom: 48px;">
            <p class="eyebrow" style="margin-bottom: 16px;">${blog.date} &bull; ${blog.readTime}</p>
            <h1 style="font-size: 2.5rem; margin-bottom: 24px;">${blog.title}</h1>
            <div class="project-tags" style="justify-content:center; margin-bottom: 48px;">
                ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" style="width: 100%; max-width: 800px; max-height: 450px; object-fit: cover; border-radius: 16px; margin: 0 auto; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid var(--border-color);">` : ''}
        </div>

        <div class="blog-content" style="max-width: 720px; margin: 0 auto; color: var(--text-secondary); line-height: 1.8; font-size: 1.1rem;">
            ${blog.content}
        </div>
        
        <div style="text-align:center; margin-top: 64px; max-width: 720px; margin-left: auto; margin-right: auto; padding-top: 40px; border-top: 1px solid var(--border-color);">
            <a href="blog.html" class="btn btn-secondary">&larr; Back to Writings</a>
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

function initActiveNav() {
    const currentPath = window.location.pathname;
    let activeKey = 'index.html'; // Default for root path

    if (currentPath.includes('work.html')) {
        activeKey = 'work.html';
    } else if (currentPath.includes('case-studies.html') || currentPath.includes('project-details.html')) {
        activeKey = 'case-studies.html';
    } else if (currentPath.includes('blog.html') || currentPath.includes('blog-details.html')) {
        activeKey = 'blog.html';
    }

    const navItems = document.querySelectorAll('.nav .nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === activeKey) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
