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
    initResumeLinks();
    renderLinkedInSlider();
});

function initResumeLinks() {
    if (portfolioData.resumeUrl) {
        document.querySelectorAll('a[data-resume-btn]').forEach(a => {
            const fileName = portfolioData.resumeUrl.split('/').pop();
            a.href = portfolioData.resumeUrl;
            a.setAttribute('download', fileName);
            a.setAttribute('target', '_blank');
        });
    }
}

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
        <div class="update-item ${item.link ? 'has-link' : ''}">
            <div class="update-date">${item.date}</div>
            <div class="update-content">
                ${item.link ? `<a href="${item.link}" target="_blank" class="update-link" style="text-decoration: none; display: flex; align-items: flex-start; gap: 12px; width: 100%;">` : '<div style="display: flex; align-items: flex-start; gap: 12px; width: 100%;">'}
                    <p class="update-desc">${item.description}</p>
                    <span class="update-tag">${item.category}</span>
                ${item.link ? `</a>` : '</div>'}
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
                    ${portfolioData.experience.slice(0, 2).map(item => `
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

                    ${portfolioData.experience.length > 2 ? `
                        <details class="exp-continuous-details" style="margin-top: 0; margin-bottom: 48px;">
                            <summary style="cursor: pointer; padding: 16px 0; font-weight: 500; font-size: 0.95rem; color: var(--text-secondary); outline: none; margin: 0; display: flex; align-items: center; gap: 8px; user-select: none;">
                                <span style="border-bottom: 1px dashed var(--text-muted);">Unlock ${portfolioData.experience.length - 2} earlier chapters</span>
                                <span class="exp-details-icon" style="color: var(--text-muted); font-size: 1.1rem; transition: transform 0.2s; display: inline-block;">↓</span>
                            </summary>
                            <div style="padding: 0;">
                                <div style="display: flex; flex-direction: column; gap: 0;">
                                    ${portfolioData.experience.slice(2).map(item => `
                                        <div class="work-item" style="border-top: 1px solid var(--border-color); padding-top: 32px; padding-bottom: 0;">
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
                        </details>
                    ` : ''}
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
                                    <h3 style="font-size: 1.25rem; margin: 0; line-height: 1.3;"><a href="project-details.html?id=${project.id}" style="text-decoration: none; color: inherit;">${project.title}</a></h3>
                                </div>
                                <p style="font-size: 0.95rem; margin-bottom: 24px; line-height: 1.6; color: var(--text-secondary); flex: 1;">${project.description} <a href="project-details.html?id=${project.id}" style="color: var(--primary); text-decoration: underline; text-underline-offset: 4px; font-weight: 500;">see more in case study &rarr;</a></p>
                                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                    ${(project.tags || []).slice(0, 3).map(tag => `<span style="font-size: 0.75rem; color: var(--text-muted); padding: 4px 10px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 100px;">${tag}</span>`).join('')}
                                </div>
                            </article>
                        `).join('')}
                    </div>
                    <div style="margin-top: 16px; margin-bottom: 24px;">
                        <a href="case-studies.html" style="font-size: 0.95rem; color: var(--text-primary); text-decoration: underline; text-underline-offset: 4px; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: color 0.2s;">Explore all case studies &rarr;</a>
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
                <div class="work-items" style="display: flex; flex-direction: column; gap: 16px;">
                    ${portfolioData.skills.map((skillGroup, index) => `
                        <details class="skill-group-details" ${index === 0 ? 'open' : ''} style="border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                            <summary style="cursor: pointer; padding: 12px 0; font-weight: 500; font-size: 1.05rem; color: var(--text-primary); outline: none; margin: 0; display: flex; justify-content: space-between; align-items: center; user-select: none; list-style: none;">
                                ${skillGroup.category}
                                <span class="skill-exp-icon" style="color: var(--text-muted); font-size: 1.2rem; transition: transform 0.2s; font-family: monospace;">${index === 0 ? '−' : '+'}</span>
                            </summary>
                            <div class="skills-container" style="padding-top: 16px; padding-bottom: 24px;">
                                ${skillGroup.items.map(skill => `
                                    <div class="skill-pill">${skill}</div>
                                `).join('')}
                            </div>
                        </details>
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

    // Add animation to the Work Experience native details expander
    const expDetails = document.querySelector('.exp-continuous-details');
    if (expDetails) {
        expDetails.addEventListener('toggle', (e) => {
            const icon = expDetails.querySelector('.exp-details-icon');
            if (icon) {
                icon.style.transform = e.target.open ? 'rotate(180deg)' : 'none';
            }
        });
    }

    // Add toggle icons to Skills native details expander
    const skillDetailsList = document.querySelectorAll('.skill-group-details');
    skillDetailsList.forEach(detail => {
        detail.addEventListener('toggle', (e) => {
            const icon = detail.querySelector('.skill-exp-icon');
            if (icon) {
                icon.textContent = e.target.open ? '−' : '+';
            }
        });
    });
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
        <article class="project-card" style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
            ${project.image ? `
                <a href="project-details.html?id=${project.id}" style="flex: 0 0 220px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); display: block;">
                    <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 140px; object-fit: cover; transition: transform 0.3s ease; display: block;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                </a>
            ` : ''}
            <div style="flex: 1; min-width: 280px; max-width: 480px;">
                <div class="project-meta" style="margin-bottom: 8px; font-size: 0.8rem;">
                    <span class="company">${project.company}</span>
                    <span class="duration">${project.duration}</span>
                </div>
                <h3 style="margin-bottom: 8px; font-size: 1.2rem;"><a href="project-details.html?id=${project.id}" style="text-decoration: none; color: inherit;">${project.title}</a></h3>
                <p class="desc" style="margin-bottom: 16px; font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${project.description}</p>
                <div style="margin-bottom: 20px;">
                    <a href="project-details.html?id=${project.id}" style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 14px; border: 1px solid var(--border-color); border-radius: 100px; color: var(--text-primary); text-decoration: none; font-size: 0.8rem; font-weight: 500; transition: all 0.2s ease;" onmouseover="this.style.borderColor='var(--text-primary)'; this.style.backgroundColor='var(--text-primary)'; this.style.color='var(--bg-primary)';" onmouseout="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='transparent'; this.style.color='var(--text-primary)';">View Case Study &rarr;</a>
                </div>
                <div class="project-tags" style="margin-top: 0; gap: 6px;">
                    ${project.tags.map(tag => `<span class="tag" style="font-size: 0.7rem; padding: 2px 8px;">${tag}</span>`).join('')}
                </div>
            </div>
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
        <article class="project-card" style="padding-bottom: 24px;">
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


function renderLinkedInSlider() {
    const container = document.getElementById('linkedin-slider');
    if (!container || !portfolioData.linkedinPosts) return;

    if (portfolioData.linkedinPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); width: 100%;">Stay tuned for new insights.</p>';
        return;
    }

    const html = portfolioData.linkedinPosts.map(post => {
        return `
            <div class="linkedin-slide">
                <div class="linkedin-card-wrapper" style="padding: 32px; height: 320px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
                    <h3 style="margin-bottom: 24px; font-size: 1.25rem; line-height: 1.4; font-weight: 500;">${post.title}</h3>
                    <a href="${post.link}" target="_blank" class="btn btn-secondary" style="margin-top: auto; font-size: 0.85rem; padding: 10px 20px; border-radius: 100px;">Read More &rarr;</a>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}
