export const personalInfo = {
    name: "Karthikeyan T",
    title: "AI Engineer • SaaS Architect",

    location: "India",
    phone: "+91 94867 72206",
    email: "tkarthikeyan@gmail.com",

    linkedin: "www.linkedin.com/in/carthworks",
    github: "github.com/carthworks",
    behance: "www.behance.net/carthworks",
    flickr: "www.flickr.com/photos/carthworks",
    resume: "/resume.pdf",

    bio: "I’m a problem solver at heart with 15+ years of hands-on experience and over two decades in the software industry. I design and build production-ready, scalable SaaS platforms by deeply understanding how systems work, identifying real business pain points, and turning them into practical, maintainable solutions. My work focuses on clean architecture, performance, security, and AI systems that ship to real users—not demos.",

    summary:
        "AI Engineer and SaaS Architect with 20+ years of engineering experience building and scaling multi-tenant web and SaaS platforms. I specialize in full-stack systems using Next.js and .NET, and in integrating practical AI using LLMs such as Qwen3, Llama3, GPT, Claude, and Mistral via Ollama, LangChain, LlamaIndex, and custom RAG pipelines. Strong focus on architecture, reliability, and real-world AI adoption."
};


export const skills = {
    "AI & LLM Engineering": [
        "a/ollama + Qwen3 / Llama models integration",
        "RAG pipelines with LangChain, ChromaDB, Faiss, pgVector",
        "AI agents for workflow automation and penetration testing",
        "Secure prompt pipelines, autonomous agent chaining",
    ],
    "SaaS Architecture": [
        "Multi-tenant architecture (isolation, RBAC, API gateway)",
        "Next.js, .NET Core, Node.js, PostgreSQL systems design",
        "Serverless functions, edge APIs, observability, tracing",
    ],
    "Full-Stack Engineering": [
        "Next.js, React, Angular, Node.js, .NET Core",
        "Prisma ORM, PostgreSQL schema optimization",
        "REST/GraphQL secure API development",
    ],
    "AI Ecosystem": [
        "APIs: OpenAI, Claude, Cohere, Hugging Face, Together.ai",
        "Libraries: LangChain, LlamaIndex, Transformers",
    ],
    "Cloud & DevOps": [
        "CI/CD: GitHub Actions, Azure DevOps",
        "Docker deployments on Vercel, Azure, AWS",
    ],
    "UI/UX": [
        "Figma, Tailwind, design systems, accessibility",
    ],
};

export const experience = [
    {
        company: "Virtusa",
        role: "Lead Consultant / Senior Lead Engineer (AI & Full-Stack)",
        period: "2023 – 2026",
    },
    {
        company: "Buckman",
        role: "Senior Digital Innovation Engineer",
        period: "2021 – 2023",
    },
    {
        company: "PushPros",
        role: "Senior Full-Stack Developer",
        period: "2020 – 2021",
    },
    {
        company: "AURISS Technologies",
        role: "Senior Engineer (AI & Cybersecurity SaaS)",
        period: "2017 – 2020",
    },
    {
        company: "Pacific Controls , Dubai, UAE",
        role: "UI/Web Developer (IoT Platforms)",
        period: "2015 – 2016",
    },
];

export const education = {
    degree: "B.Sc – Computer Science",
    institution: "Bharathiar University",
};

export const certifications = [
    {
        name: "Gen AI Assisted Engineer",
        issuer: "Virtusa",
        date: "Feb 2025",
    },
];

export const projects = {
    websites: [
        {
            name: "Royal Albatross Exports",
            description: "Premium-quality fresh exports with reliable sourcing and global distribution.",
            url: "https://royalalbatrossexports.in/",
            image: "/images/royal_albatross.png",
        },
        {
            name: "Nesam Radio",
            description: "Live Tamil music, devotional songs, latest hits, news & podcasts – straight from the heart of Tamil Nadu. Listen anytime, anywhere.",
            url: "https://nesammedia.royalalbatrossexports.in/",
            image: "/images/nesam_radio.png",
        },

        {
            name: "DSR Photos & Videos",
            description: "Professional photography and videography for destination weddings, editorial shoots, and portrait sessions.",
            url: "https://dsr-photos-web.vercel.app/",
            image: "/images/dsr.png",
        },
        {
            name: "Chennai Braiding Company",
            description: "Specialized manufacturers of high-quality shoe laces and industrial ropes.",
            url: "https://cbclaces.com/",
            image: "/images/cbclacs.png",
        },
        {
            name: "HIRENCH HR Solutions",
            description: "Leading recruitment and HR consulting firm in Chennai, Tamil Nadu. Specializing in permanent staffing, temporary recruitment, executive search, and comprehensive HR services across 15+ industries.",
            url: "https://hirench.vercel.app/",
            image: "/images/hirench.png",
        },

        {
            name: "Ark Veterinary Clinic",
            description: "Comprehensive veterinary care with a focus on preventive and clinical services.",
            url: "https://ark-veterinary-clinics.vercel.app/",
            image: "/images/ark.png",
        },
        {
            name: "Sri Kaliamman Textiles",
            description: "Leading textile manufacturer in Chennai, Tamil Nadu. Specializing in permanent staffing, temporary recruitment, executive search, and comprehensive HR services across 15+ industries.",
            url: "https://srikaliamman-textiles.vercel.app/",
            image: "/images/srikaliamman.png",
        },


        {
            name: "30-Day Ethical Hacking Bootcamp",
            description: "Hands-on ethical hacking training designed to build real-world offensive security skills in 30 days.",
            url: "https://hacklab30.netlify.app/",
            image: "/images/hacklab30.png",
        },
        {
            name: "IntraChat",
            description: "Private, internal communication platform built for teams that value control and privacy.",
            url: "https://intra-chat-eight.vercel.app/",
            image: "/images/intrachat.png",
        },
    ],
    aiApplications: [
        {
            name: "RAG System for Your Documents",
            description: "Ask questions and retrieve insights from your own documents using a Retrieval-Augmented Generation system.",
            url: "https://ask-mydocs.vercel.app/",
            image: "/images/askmydocs.png",
            status: "poc"
        },

        {
            name: "LibraDigitAI",
            description: "AI-powered digitization and digital archive builder for libraries. A production-grade desktop application that converts scanned documents into searchable, metadata-rich archives through a guided workflow.",
            // url: "https://github.com/carthworks/LibraDigitAI",
            url: "https://libra-digit-web.vercel.app/",
            image: "/images/ad_librDigitIT_2026.png",
            status: "poc"


        },
        {
            name: "ModelMeter: AI FinOps & Observability",
            description: "ModelMeter is a generic, provider-agnostic AI FinOps and observability platform designed to help organizations monitor, analyze, and optimize their AI/LLM services. ",
            // It provides real-time insights into usage, costs, performance, and security across different AI providers and models, enabling data-driven decision-making and efficient resource management.
            url: "https://model-meter.vercel.app/",
            image: "/images/hero_dashboard.png",
            status: "idea"
        },
        {
            name: "Professional Web Security Scanner",
            description: "A lightweight web security scanner for quick vulnerability and configuration checks.",
            url: "https://scanova-web.vercel.app/",
            image: "/images/scanova.png",
            status: "poc"
        },
        {
            name: "ActSMS",
            description: "Automatically converts transactional SMS into reminders, tasks, and alerts — fully on your device with 6 smart pattern types.",
            url: "https://actsms.vercel.app/",
            image: "/images/act-sms.png",
            status: "idea"
        },

        {
            name: "Research Agent ",
            description: "A modern, full-stack AI research agent that allows you to upload documents (PDF/TXT), analyze them using local LLMs, view relationship graphs, and chat with your documents.",
            url: "https://research-agent-web.vercel.app/",
            image: "/images/researchAgent.gif",
            status: "poc"
        },
        {
            name: "SolarFlow",
            description: "Track solar projects from lead to payment. Give customers real-time updates. Get paid on time. All in one place.",
            url: "https://solarflow-web-beta.vercel.app/",
            image: "/images/solarflow.png",
            status: "idea"
        },
        {
            name: "PaperPublish IQ",
            description: "A comprehensive platform that guides your research from draft to publication-ready with expert mentoring and blind peer review.",
            url: "https://paperpublish-iq.vercel.app/",
            image: "/images/paperpublish.png",
            status: "idea"
        },
        {
            name: "WingzAI Platform",
            description: "One platform to manage multiple connectors and services, build AI agents, and automate workflows.Access security, compliance, automation, and other capabilities from a single, unified workspace.",
            url: "https://wingzai.deltaphi.in/login",
            image: "/images/wingzai.png",
            status: "live"
        },
        // {
        //     name: "Cybersecurity Workshop",
        //     description: "AI-Assisted Cybersecurity Workshop",
        //     url: "https://cyber2daytraining.vercel.app/",
        //     image: "/images/cyber2daytraining.png",
        // },
        // {
        //     name: "Kapan",
        //     description: "Private, internal communication platform built for teams that value control and privacy.",
        //     url: "https://kapan01.vercel.app/",
        //     image: "/images/kapan.png",
        // },
        {
            name: "AI-Powered Crop Intelligence Assistant",
            description: "AgriAidAI is an open-source agricultural intelligence platform that uses computer vision and machine learning to detect crop diseases instantly, provide expert treatment plans, and help farmers protect their harvests with data-driven confidence.",
            url: "https://crop-shield-dusky.vercel.app/",
            image: "/images/hero-picture.png",
            status: "poc"
        },

        {
            name: "CodeShield Local ",
            description: "Your Code Deserves a Security Expert.Now you have one — right on your machine. A 100% local AI-powered code security auditor that scans, explains, and fixes vulnerabilities without sending a single byte to the cloud.Start Secure Scan.",
            url: "https://code-shield-local.vercel.app/",
            image: "/images/codeshieldai.png",
            status: "poc"
        },
        {
            name: "Hyperlocal-Heat-Intelligence-Platform",
            description: "The Hyperlocal Heat Intelligence Platform bridges this gap. By combining physical weather forecasting, satellite intelligence, GIS terrain data, and an AI-based downscaling engine, the platform transforms coarse weather data into highly actionable, 100m-resolution predictive heat grids.",
            url: "https://hyperlocal-heat-intelligence-platfo.vercel.app/",
            image: "/images/gis_dashboard_1779014141485.png",
            status: "poc"
        },
        {
            name: "AI-Augmented Security Posture Intelligence Platform",
            description: "An AI-augmented vulnerability management and security posture platform that unifies vulnerability, container/SCA, and secret scanning into a single multi-tenant SaaS. It enriches findings with real-world risk signals and generates plain-English explanations and remediation plans using Anthropic Claude..",
            url: "https://github.com/cybersigmaINC/security-platform",
            image: "/images/security-platform01.jpeg",
            status: "poc"

        },
        {
            name: "ThreatLens",
            description: "ThreatLens is an AI-powered Security Posture Intelligence Platform that enables organizations to continuously discover assets, assess attack surfaces, model threats, prioritize risk, and improve cybersecurity posture.",
            url: "https://carthworks.vercel.app/",
            image: "/images/threatlens.png",
            status: "idea"

        }
    ],

    tools: [
        {
            name: "SecuTools.io",
            description: "Practical, no-nonsense utilities for cybersecurity engineers and security researchers.",
            url: "https://secutools-io.vercel.app/",
            image: "/images/sectools_io.png",
            status: "live"
        },
        {
            name: "AI & LLM Handy Tools",
            description: "A curated toolbox of practical utilities for AI engineers, researchers, and prompt engineers.",
            url: "https://aitoolsbox-io.vercel.app/",
            image: "/images/aitoolsvox.png",
            status: "live"
        },
        {
            name: "MyTeleprompter",
            description: "A powerful, easy-to-use teleprompter designed for speakers, presenters, and content creators. Upload your script and deliver flawless performances every time",
            url: "https://teleprompt-seven.vercel.app/",
            image: "/images/teleprompt.png",
            status: "live"
        }

    ],
    extensions: [
        {
            name: "Chrome Web Store Developer Console Extension",
            description: "Developer-focused Chrome extension published on the Chrome Web Store.",
            url: "https://chrome.google.com/webstore/devconsole/af690ea9-bcfb-4342-9a04-0bdecfbbc7b7",
            image: "/images/chrome_extension.png"
        }, {
            name: "TrustLens – Website Trust & Risk Checker",
            description: "Instant website trust and risk analysis using real-time domain intelligence.",
            url: null,
        },
        {
            name: "AI Image Signal Analyzer",
            description: "Analyzes visual and metadata signals to estimate the probability of AI-generated images (no absolute claims).",
            url: null,
        },
        {
            name: "Gantto – Project Timeline Manager",
            description: "AI-assisted Gantt chart tool with progress tracking and smart task suggestions.",
            url: null,
        },
        {
            name: "AppSec Inspector",
            description: "Local-first application security inspection tool. Scan headers, detect secrets, and audit authentication—no data collection.",
            url: null,
        },
        {
            name: "Auto Formatter Pro",
            description: "Advanced code formatter with syntax highlighting, format conversion, and diff view for structured data.",
            url: null,
        },
        {
            name: "Screenshotify",
            description: "Offline-first Chrome extension for capturing, annotating, blurring, cropping, and zooming screenshots—privacy guaranteed.",
            url: null,
        }

    ],
    creative: [
        {
            name: "Aether – Gestural Focus Engine",
            description: "An interactive meditation and breathing experience using particle-based visualizations to improve focus and mindfulness. Designed for children, educators, and yoga practitioners.",
            url: "https://aether-gestural-engine.vercel.app/",
            image: "/images/aether.png",
        },
        {
            name: "Enhanced Audio Visualizer",
            description: "Cinematic 3D · Real-time · Beat-Reactive- Transform your music into mesmerizing visual experiences",
            url: "https://audio-visualizer-six-inky.vercel.app/",
            image: "/images/audio-visualizer.png",
        },
    ],
};
