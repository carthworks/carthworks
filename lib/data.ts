export const personalInfo = {
    name: "Karthikeyan T",
    title: "AI Engineer | SaaS Architect",

    location: "India",
    phone: "+91 94867 72206",
    email: "tkarthikeyan@gmail.com",

    linkedin: "www.linkedin.com/in/carthworks",
    github: "github.com/carthworks",
    behance: "www.behance.net/carthworks",
    flickr: "www.flickr.com/photos/carthworks",
    resume: "/resume.pdf",

    bio: "I am a problem solver at heart with 15+ years of hands-on experience and over two decades in software. I design and build production-ready SaaS platforms by understanding how systems work, identifying real business pain points, and turning them into practical, maintainable solutions. My work focuses on clean architecture, performance, security, and AI systems that ship to real users.",

    summary:
        "AI Engineer and SaaS Architect with 20+ years of engineering experience building and scaling multi-tenant web and SaaS platforms. I specialize in full-stack systems using Next.js and .NET, and in integrating practical AI using LLMs such as Qwen3, Llama3, GPT, Claude, and Mistral via Ollama, LangChain, LlamaIndex, and custom RAG pipelines. Strong focus on architecture, reliability, and real-world AI adoption.",
};

export const portfolioStats = [
    { value: "20+", label: "Years engineering" },
    { value: "15+", label: "Products shipped" },
    { value: "AI", label: "LLM, RAG, agents" },
    { value: "SaaS", label: "Multi-tenant systems" },
];

export const skills = {
    "AI & LLM Engineering": [
        "Ollama + Qwen3 / Llama models integration",
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
        period: "2023 - 2026",
    },
    {
        company: "Buckman",
        role: "Senior Digital Innovation Engineer",
        period: "2021 - 2023",
    },
    {
        company: "PushPros",
        role: "Senior Full-Stack Developer",
        period: "2020 - 2021",
    },
    {
        company: "AURISS Technologies",
        role: "Senior Engineer (AI & Cybersecurity SaaS)",
        period: "2017 - 2020",
    },
    {
        company: "Pacific Controls, Dubai, UAE",
        role: "UI/Web Developer (IoT Platforms)",
        period: "2015 - 2016",
    },
];

export const education = {
    degree: "B.Sc - Computer Science",
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
            description: "Tamil music, devotional programs, news, and podcasts streamed from Tamil Nadu.",
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
            description: "Recruitment and HR consulting platform for staffing, executive search, and industry hiring workflows.",
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
            description: "Textile manufacturer website focused on product presentation, credibility, and inbound enquiries.",
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
            status: "poc",
            tags: ["RAG", "LLM", "Documents"],
        },
        {
            name: "LibraDigitAI",
            description: "AI-powered digitization system that turns scanned library documents into searchable, metadata-rich archives.",
            url: "https://libra-digit-web.vercel.app/",
            image: "/images/ad_librDigitIT_2026.png",
            status: "poc",
            tags: ["AI", "OCR", "Archives"],
            featured: true,
        },
        {
            name: "Security Posture Intelligence Platform",
            description: "Multi-tenant security platform that unifies vulnerability, SCA, container, and secret scanning with AI remediation guidance.",
            url: "https://security-platform-plan.vercel.app/",
            image: "/images/sec-platform.png",
            status: "poc",
            tags: ["Security", "SaaS", "Claude"],
        },
        {
            name: "ModelMeter: AI FinOps & Observability",
            description: "Provider-agnostic AI FinOps platform for monitoring LLM usage, costs, performance, and reliability.",
            url: "https://model-meter.vercel.app/",
            image: "/images/hero_dashboard.png",
            status: "idea",
            tags: ["FinOps", "Observability", "LLM"],
        },
        {
            name: "Professional Web Security Scanner",
            description: "A lightweight web security scanner for quick vulnerability and configuration checks.",
            url: "https://scanova-web.vercel.app/",
            image: "/images/scanova.png",
            status: "poc",
            tags: ["Security", "Scanner", "Web"],
        },
        {
            name: "ActSMS",
            description: "On-device assistant that converts transactional SMS messages into reminders, tasks, and alerts.",
            url: "https://actsms.vercel.app/",
            image: "/images/act-sms.png",
            status: "idea",
            tags: ["Mobile", "Automation", "Privacy"],
        },
        {
            name: "SolarFlow",
            description: "Track solar projects from lead to payment, customer updates, and collection follow-ups in one workflow.",
            url: "https://solarflow-web-beta.vercel.app/",
            image: "/images/solarflow.png",
            status: "idea",
            tags: ["SaaS", "Workflow", "Solar"],
        },
        {
            name: "PaperPublish IQ",
            description: "Research workflow platform that guides drafts toward publication with mentoring and blind peer review.",
            url: "https://paperpublish-iq.vercel.app/",
            image: "/images/paperpublish.png",
            status: "idea",
            tags: ["Research", "Publishing", "Workflow"],
        },
        {
            name: "WingzAI Platform",
            description: "Unified workspace to manage connectors, build AI agents, and automate security, compliance, and service workflows.",
            url: "https://wingzai.deltaphi.in/login",
            image: "/images/wingzai.png",
            status: "live",
            tags: ["AI Agents", "Automation", "Connectors"],
            featured: true,
        },
        {
            name: "Cybersecurity Workshop",
            description: "AI-assisted cybersecurity workshop site for hands-on training, security learning paths, and practical labs.",
            url: "https://cyber2daytraining.vercel.app/",
            image: "/images/cyber2daytraining.png",
            status: "live",
            tags: ["Training", "Security", "AI"],
        },
        {
            name: "Kapan",
            description: "Private, internal communication platform built for teams that value control and privacy.",
            url: "https://kapan01.vercel.app/",
            image: "/images/kapan.png",
            status: "idea",
            tags: ["Messaging", "Privacy", "Teams"],
        },
        {
            name: "AI-Powered Crop Intelligence Assistant",
            description: "Agricultural intelligence platform using computer vision and ML to detect crop diseases and recommend treatment plans.",
            url: "https://crop-shield-dusky.vercel.app/",
            image: "/images/hero-picture.png",
            status: "poc",
            tags: ["Computer Vision", "Agritech", "ML"],
        },
        {
            name: "CodeShield Local",
            description: "Local AI-powered code security auditor that scans, explains, and helps fix vulnerabilities without sending code to the cloud.",
            url: "https://code-shield-local.vercel.app/",
            image: "/images/codeshieldai.png",
            status: "poc",
            tags: ["Local AI", "AppSec", "Privacy"],
            featured: true,
        },
        {
            name: "Hyperlocal Heat Intelligence Platform",
            description: "AI downscaling platform that combines weather, satellite, and GIS data into 100m-resolution predictive heat grids.",
            url: "https://hyperlocal-heat-intelligence-platfo.vercel.app/",
            image: "/images/gis_dashboard_1779014141485.png",
            status: "poc",
            tags: ["GIS", "Climate", "AI"],
        },
    ],

    tools: [
        {
            name: "SecuTools.io",
            description: "Practical, no-nonsense utilities for cybersecurity engineers and security researchers.",
            url: "https://secutools-io.vercel.app/",
            image: "/images/sectools_io.png",
            status: "live",
            tags: ["Security", "Utilities"],
        },
        {
            name: "AI & LLM Handy Tools",
            description: "A curated toolbox of practical utilities for AI engineers, researchers, and prompt engineers.",
            url: "https://aitoolsbox-io.vercel.app/",
            image: "/images/aitoolsvox.png",
            status: "live",
            tags: ["LLM", "Utilities"],
        },
        {
            name: "MyTeleprompter",
            description: "Easy-to-use teleprompter for speakers, presenters, and creators who need smoother delivery.",
            url: "https://teleprompt-seven.vercel.app/",
            image: "/images/teleprompt.png",
            status: "live",
            tags: ["Creator Tools", "Video"],
        },
    ],
    extensions: [
        {
            name: "Chrome Web Store Developer Console Extension",
            description: "Developer-focused Chrome extension published on the Chrome Web Store.",
            url: "https://chrome.google.com/webstore/devconsole/af690ea9-bcfb-4342-9a04-0bdecfbbc7b7",
            image: "/images/chrome_extension.png",
        },
        {
            name: "TrustLens - Website Trust & Risk Checker",
            description: "Instant website trust and risk analysis using real-time domain intelligence.",
            url: null,
        },
        {
            name: "AI Image Signal Analyzer",
            description: "Analyzes visual and metadata signals to estimate the probability of AI-generated images.",
            url: null,
        },
        {
            name: "Gantto - Project Timeline Manager",
            description: "AI-assisted Gantt chart tool with progress tracking and smart task suggestions.",
            url: null,
        },
        {
            name: "AppSec Inspector",
            description: "Local-first application security inspection tool for headers, secrets, and authentication checks.",
            url: null,
        },
        {
            name: "Auto Formatter Pro",
            description: "Advanced code formatter with syntax highlighting, format conversion, and diff view for structured data.",
            url: null,
        },
        {
            name: "Screenshotify",
            description: "Offline-first Chrome extension for capturing, annotating, blurring, cropping, and zooming screenshots.",
            url: null,
        },
    ],
    creative: [
        {
            name: "Aether - Gestural Focus Engine",
            description: "Interactive meditation and breathing experience using particle-based visualizations for focus and mindfulness.",
            url: "https://aether-gestural-engine.vercel.app/",
            image: "/images/aether.png",
        },
        {
            name: "Enhanced Audio Visualizer",
            description: "Cinematic 3D, real-time, beat-reactive visuals that transform music into immersive motion.",
            url: "https://audio-visualizer-six-inky.vercel.app/",
            image: "/images/audio-visualizer.png",
        },
    ],
};
