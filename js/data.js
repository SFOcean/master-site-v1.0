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
            role: "Internship Trainee",
            company: "THiNK Limited",
            duration: "Jan 2023 - Feb 2023",
            description: "Hands on training on SCADA, PLC, Circuit Design and technique of innovative product design."
        }
    ],

    pmRoadmap: [
        {
            id: 1,
            role: "Product Owner / PM Focus",
            company: "Future Trajectory",
            duration: "2026 and Beyond",
            description: "Acquiring PSPO I certification and leading hyper-scaled product development cycles."
        },
        {
            id: 2,
            role: "Project Manager (Core PM)",
            company: "Sheba & Singularity",
            duration: "2025",
            description: "Transitioned fully into owning product roadmaps, cross-functional team delivery, and B2B SaaS architecture planning."
        },
        {
            id: 3,
            role: "Co-founder & Project Manager",
            company: "WebL Innovation",
            duration: "2020 - 2023",
            description: "Started product journey by launching LMS and EMS startup systems from inception. Won Databird Launchpad 1st Runner up."
        },
        {
            id: 4,
            role: "Project Management Intern",
            company: "Startup Khulna",
            duration: "Feb 2021 - Jun 2021",
            description: "Managed startup events, initial project blueprints, and coordinated co-working space operations."
        }
    ],

    education: [
        {
            id: 1,
            role: "BSc In Mechatronics Engineering",
            company: "Khulna University of Engineering & Technology (KUET)",
            duration: "2019 - Current",
            description: "CGPA: 3.20. Active in leadership: Treasurer of KRIoTIC and Organizing Secretary of Mechatronics Association."
        },
        {
            id: 2,
            role: "Certifications",
            company: "ISCEA & Scrum.org",
            duration: "2025 - 2026",
            description: "Certified Supply Chain Analyst (CSCA™) and expected Professional Scrum Product Owner (PSPO™ I)."
        },
        {
            id: 3,
            role: "Hackathons & Achievements",
            company: "Various Accelerators",
            duration: "2021 - 2022",
            description: "Champion at GP Accelerator 3.0. 1st Runner up at Banglalink SDG Hackathon 3.0. Finalist at Huawei ICT Incubator (won $5K cloud credit). Completed MELBU Summer School."
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
            featured: true,
            image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200",
            overview: "Tower companies rely heavily on continuous power supply to maintain network connectivity. However, managing backup generators during outages is historically a messy, manual process. The Power Genie Platform was conceptualized to 'uberize' portable generator deployment.",
            problem: "When a cell tower goes dark, dispatch times for backup generators averaged several hours due to manual vendor coordination, poor routing, and lack of real-time tracking.",
            solution: "We designed a full-stack platform mapping hardware logistics to software workflows. I drafted the core BRDs (Business Requirement Documents) detailing the architecture that allowed algorithmic dispatching of generators based on distance, traffic, and vendor capacity.",
            results: [
                "Achieved a 45% reduction in average generator dispatch times.",
                "Digitally onboarded 100+ vendor vehicles into the live-tracking ecosystem.",
                "Contributed to winning the prestigious SDG Award 2025."
            ]
        },
        {
            id: 'ai-mvp',
            title: "Automated MVP Framework",
            company: "Singularity Limited",
            duration: "2026",
            description: "A system built to cut down validation engineering hours by 60% through rapidly deploying AI-programmed micro-services for user testing before building full-stack applications.",
            tags: ["Process Engineering", "AI", "Agile"],
            featured: true,
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee5789?auto=format&fit=crop&w=1200",
            overview: "As companies scale, engineering resources become the major bottleneck. Often, months are spent building products that fail at initial user validation.",
            problem: "Engineering teams were spending 4-6 weeks developing MVPs to test hypotheses, resulting in massive wasted capital when feedback was negative.",
            solution: "I implemented a rapid-validation workflow utilizing generative AI and no-code tools to create functional prototypes within 48 hours for immediate beta testing.",
            results: [
                "Reduced 'Time-to-Validation' from 4 weeks to under 3 days.",
                "Decreased wasted engineering hours by an estimated 60%.",
                "Enabled the product team to test 5x as many hypotheses per quarter."
            ]
        },
        {
            id: 'lms-startup',
            title: "Scalable LMS Architecture",
            company: "WebL Innovation",
            duration: "2022",
            description: "Led the product sprint for a lightweight Learning Management System targeted at emerging markets. Ensured minimal bandwidth requirements during architecture planning.",
            tags: ["EdTech", "Startup", "MVP"],
            featured: false,
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200",
            overview: "Educational technology often assumes high-speed internet. In emerging markets, heavy LMS applications fail to load, isolating remote students from digital education.",
            problem: "Existing LMS systems required too much bandwidth, creating a barrier to entry for users in rural areas on 3G networks.",
            solution: "Architected a strictly modular, progressive web application (PWA) with offline-sync capabilities. Pushed for a strictly asynchronous architecture.",
            results: [
                "Successfully loaded core application in under 3 seconds on a 3G connection.",
                "Secured funding and 1st Runner Up position at Databird Launchpad 2021."
            ]
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
