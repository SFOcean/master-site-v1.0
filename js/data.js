// data.js - The Pseudo-CMS for Portfolio Data

const portfolioData = {
    experience: [
        {
            id: 1,
            role: "Sr. Executive - Project Management",
            company: "Singularity Limited",
            duration: "Dec 2025 - Present",
            description: "Leading 5 simultaneous product lifecycles. Owning product roadmap planning, sprint delivery for complex Scrum-based projects, and rapid AI-programmed MVP validation."
        },
        {
            id: 2,
            role: "MTO - Project Coordinator",
            company: "Sheba Platform Limited",
            duration: "Apr 2025 - Dec 2025",
            description: "Managed the Power Genie Project (A Digital TowerCo Solution Uberizing Portable Generator backup). Liaised with EDOTCO, designed solid BRDs, and contributed to winning the SDG Award 2025."
        },
        {
            id: 3,
            role: "Co-founder & Project Manager",
            company: "WebL Innovation",
            duration: "2020 - 2023",
            description: "Led two startup products (LMS and EMS Systems) from inception. Won multiple national and international grants, including Databird Launchpad 1st Runner up."
        }
    ],

    projects: [
        {
            id: 'power-genie',
            title: "Power Genie Platform",
            company: "Sheba Platform x EDOTCO",
            duration: "2025",
            description: "A comprehensive B2B solution 'uberizing' portable generator backups for TowerCo operations. I designed the solution architecture, managed the execution phase, and drafted the core Business Requirement Documents connecting API logic with hardware logistics.",
            tags: ["Hardware+Software", "B2B", "Logistics MVP"],
            featured: true
        },
        {
            id: 'ai-mvp',
            title: "Automated MVP Framework",
            company: "Singularity Limited",
            duration: "2026",
            description: "A system built to cut down validation engineering hours by 60% through rapidly deploying AI-programmed micro-services for user testing before building full-stack applications.",
            tags: ["Process Engineering", "AI", "Agile"],
            featured: true
        },
        {
            id: 'lms-startup',
            title: "Scalable LMS Architecture",
            company: "WebL Innovation",
            duration: "2022",
            description: "Led the product sprint for a lightweight Learning Management System targeted at emerging markets. Ensured minimal bandwidth requirements during architecture planning.",
            tags: ["EdTech", "Startup", "MVP"],
            featured: false
        }
    ],

    credentials: [
        {
            id: 'csca',
            title: "CSCA™ (Certified Supply Chain Analyst)",
            issuer: "ISCEA",
            date: "2025",
            icon: "📦"
        },
        {
            id: 'pspo',
            title: "PSPO™ I (Professional Scrum Product Owner)",
            issuer: "Scrum.org",
            date: "Expected Q3 2026",
            icon: "🎯"
        }
    ]
};
