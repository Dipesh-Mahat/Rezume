// Sample resume data — Dipesh Mahat
export const sampleResumeData = {
  personalInfo: {
    fullName: "Dipesh Mahat",
    title: "Full Stack Developer",
    email: "dipesh.mahat@gmail.com",
    phone: "+977 984-1234567",
    location: "Kathmandu, Nepal",
    linkedin: "linkedin.com/in/dipeshmahat",
    website: "dipeshmahat.dev"
  },
  summary: "Passionate Full Stack Developer with expertise in React, TypeScript, and Node.js. Experienced in building fast, user-friendly web applications from concept to deployment. Strong eye for design and commitment to clean, maintainable code.",
  experience: [
    {
      id: "exp1",
      title: "Full Stack Developer",
      position: "Full Stack Developer",
      company: "Freelance",
      startDate: "Jan 2023",
      endDate: "Present",
      current: true,
      description: "Built production web applications for clients across e-commerce, SaaS, and portfolio verticals using React, Node.js, and PostgreSQL.",
      achievements: [
        "Delivered 10+ production applications with 100% client satisfaction",
        "Reduced average page load time by 50% through code splitting and caching",
        "Built a resume-builder SaaS tool used by 500+ users monthly"
      ]
    },
    {
      id: "exp2",
      title: "Junior Web Developer",
      position: "Junior Web Developer",
      company: "Tech Solutions Nepal",
      startDate: "Mar 2021",
      endDate: "Dec 2022",
      current: false,
      description: "Developed responsive websites and web applications for local businesses and startups.",
      achievements: [
        "Built 20+ responsive websites using React, HTML/CSS, and JavaScript",
        "Integrated payment gateways and third-party REST APIs",
        "Collaborated with design team to deliver pixel-perfect UIs"
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Information Technology",
      institution: "Tribhuvan University",
      school: "Tribhuvan University",
      graduationYear: "2022",
      startDate: "Nov 2018",
      endDate: "Nov 2022",
      gpa: "3.7"
    }
  ],
  skills: [
    { id: "skill1", name: "React", category: "frontend", level: "expert" },
    { id: "skill2", name: "TypeScript", category: "programming", level: "advanced" },
    { id: "skill3", name: "Node.js", category: "backend", level: "advanced" },
    { id: "skill4", name: "Tailwind CSS", category: "frontend", level: "expert" },
    { id: "skill5", name: "PostgreSQL", category: "database", level: "intermediate" },
    { id: "skill6", name: "Git", category: "tools", level: "advanced" }
  ],
  template: "modern"
};

export default sampleResumeData;
