// Sample resume data used for template previews
export const sampleResumeData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    title: "Senior Software Engineer",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahjohnson",
    website: "sarahjohnson.dev"
  },
  summary: "Experienced software engineer with 8+ years developing scalable web applications. Expertise in React, Node.js, and cloud technologies. Passionate about creating user-centric solutions and leading high-performing teams.",
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: "Lead development of customer-facing web applications serving 1M+ users."
    },
    {
      id: "exp2",
      title: "Software Engineer",
      position: "Software Engineer",
      company: "StartupXYZ",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      current: false,
      description: "Developed full-stack applications using modern web technologies."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      school: "University of California, Berkeley",
      graduationYear: "2018",
      startDate: "Aug 2014",
      endDate: "May 2018",
      gpa: "3.8"
    }
  ],
  skills: [
    { id: "skill1", name: "JavaScript", category: "programming", level: "expert" },
    { id: "skill2", name: "React", category: "frontend", level: "expert" },
    { id: "skill3", name: "Node.js", category: "backend", level: "advanced" },
    { id: "skill4", name: "TypeScript", category: "programming", level: "advanced" },
    { id: "skill5", name: "AWS", category: "cloud", level: "intermediate" },
    { id: "skill6", name: "Docker", category: "devops", level: "intermediate" }
  ],
  template: "modern"
};

export default sampleResumeData;
