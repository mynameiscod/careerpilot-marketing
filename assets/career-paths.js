/* CareerPilot — career path data used by the Career Horizon section (assets/career-horizon.js).
   Add, remove or reorder entries here; the wheel geometry adapts automatically.
   logo: file name (without .svg) in assets/tech-icons/ — the real technology logo shown on the wheel.
   icon: Bootstrap Icons fallback, used when `logo` is missing. skills: 3–5 items. */
window.CareerPilotData = window.CareerPilotData || {};
window.CareerPilotData.careerPaths = [
  {
    id: 'java-full-stack',
    title: 'Java Full Stack',
    shortTitle: 'Java Full Stack',
    tagline: 'Build enterprise applications.',
    skills: ['Java', 'Spring Boot', 'React', 'Microservices', 'SQL'],
    icon: 'bi-cup-hot',
    logo: 'java'
  },
  {
    id: 'mern-full-stack',
    title: 'MERN Full Stack',
    shortTitle: 'MERN',
    tagline: 'Build modern web products.',
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    icon: 'bi-layers',
    logo: 'react'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    shortTitle: 'Data Analytics',
    tagline: 'Turn data into decisions.',
    skills: ['Excel', 'SQL', 'Power BI', 'Python', 'Statistics'],
    icon: 'bi-bar-chart-line',
    logo: 'mysql'
  },
  {
    id: 'data-science',
    title: 'Data Science',
    shortTitle: 'Data Science',
    tagline: 'Find patterns and build predictions.',
    skills: ['Python', 'Statistics', 'Machine Learning', 'Pandas', 'Visualization'],
    icon: 'bi-clipboard-data',
    logo: 'jupyter'
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    shortTitle: 'AI / ML',
    tagline: 'Build intelligent systems.',
    skills: ['Python', 'ML', 'Deep Learning', 'NLP', 'MLOps'],
    icon: 'bi-cpu',
    logo: 'tensorflow'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    shortTitle: 'GenAI',
    tagline: 'Build applications powered by LLMs.',
    skills: ['LLMs', 'RAG', 'Embeddings', 'Vector DB', 'Prompt Engineering'],
    icon: 'bi-stars',
    logo: 'openai'
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    shortTitle: 'Agentic AI',
    tagline: 'Build AI that can reason, plan and act.',
    skills: ['Agents', 'LLMs', 'RAG', 'MCP', 'LangGraph'],
    icon: 'bi-robot',
    logo: 'langchain'
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    shortTitle: 'Cyber Security',
    tagline: 'Protect systems, applications and data.',
    skills: ['Networks', 'Security', 'Cloud Security', 'SOC', 'Ethical Hacking'],
    icon: 'bi-shield-lock',
    logo: 'kalilinux'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud / DevOps',
    tagline: 'Build, deploy and scale systems.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    icon: 'bi-cloud-arrow-up',
    logo: 'docker'
  }
];

/* Skill → logo file in assets/tech-icons/. Skills without an entry show as plain text chips.
   Logos: Devicon (MIT) and Simple Icons (CC0); trademarks belong to their owners. */
window.CareerPilotData.skillLogos = {
  'Java': 'java',
  'Spring Boot': 'spring',
  'React': 'react',
  'SQL': 'mysql',
  'MongoDB': 'mongodb',
  'Express': 'express',
  'Node.js': 'nodejs',
  'TypeScript': 'typescript',
  'Python': 'python',
  'Pandas': 'pandas',
  'LangGraph': 'langchain',
  'AWS': 'aws',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'Terraform': 'terraform'
};

/* Skill → Bootstrap Icons concept icon + colour, for skills that are concepts rather than a
   single branded tool (or whose brand logo can't be redistributed, e.g. Excel / Power BI). */
window.CareerPilotData.skillIcons = {
  'Microservices': ['bi-boxes', '#0284c7'],
  'Excel': ['bi-file-earmark-excel-fill', '#1d6f42'],
  'Power BI': ['bi-bar-chart-fill', '#d9a400'],
  'Statistics': ['bi-graph-up', '#2563eb'],
  'Machine Learning': ['bi-cpu-fill', '#7c3aed'],
  'ML': ['bi-cpu-fill', '#7c3aed'],
  'Visualization': ['bi-pie-chart-fill', '#f97316'],
  'Deep Learning': ['bi-diagram-3-fill', '#db2777'],
  'NLP': ['bi-chat-text-fill', '#0891b2'],
  'MLOps': ['bi-arrow-repeat', '#16a34a'],
  'LLMs': ['bi-chat-square-dots-fill', '#4f46e5'],
  'RAG': ['bi-journal-text', '#0d9488'],
  'Embeddings': ['bi-grid-3x3-gap-fill', '#9333ea'],
  'Vector DB': ['bi-database-fill', '#2563eb'],
  'Prompt Engineering': ['bi-terminal-fill', '#334155'],
  'Agents': ['bi-robot', '#0ea5e9'],
  'MCP': ['bi-plug-fill', '#7c3aed'],
  'Networks': ['bi-hdd-network-fill', '#0284c7'],
  'Security': ['bi-shield-lock-fill', '#dc2626'],
  'Cloud Security': ['bi-cloud-check-fill', '#2563eb'],
  'SOC': ['bi-activity', '#ea580c'],
  'Ethical Hacking': ['bi-bug-fill', '#16a34a'],
  'CI/CD': ['bi-infinity', '#0ea5e9']
};
