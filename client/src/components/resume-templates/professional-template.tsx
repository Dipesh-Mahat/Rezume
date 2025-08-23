import { Card } from "@/components/ui/card";

interface ProfessionalTemplateProps {
  resumeData: any;
}

export function ProfessionalTemplate({ resumeData }: ProfessionalTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = resumeData;

  if (!personalInfo?.fullName) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Start filling out your information to see the preview</p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full p-8 bg-white shadow-lg print:shadow-none print:border-none">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="border-b-2 border-blue-600 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName}
          </h1>
          <h2 className="text-xl text-blue-600 font-medium mb-4">
            {personalInfo.title}
          </h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center">
                <span className="font-medium">Email:</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <span className="font-medium">Phone:</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <span className="font-medium">Location:</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center">
                <span className="font-medium">LinkedIn:</span> {personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-300 pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Section */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 border-b border-gray-300 pb-2 mb-4">
                  Professional Experience
                </h2>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600 sm:text-right">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <h4 className="font-medium text-blue-600 mb-2">{exp.company}</h4>
                    {exp.description && (
                      <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                    )}
                    {exp.achievements?.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.achievements.map((achievement: string, achievementIndex: number) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 border-b border-gray-300 pb-2 mb-4">
                  Education
                </h2>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <h4 className="font-medium text-blue-600">{edu.school}</h4>
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        <div>{edu.graduationYear}</div>
                        {edu.gpa && <div>GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Skills */}
          {skills.length > 0 && (
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-blue-600 border-b border-gray-300 pb-2 mb-4">
                Skills & Expertise
              </h2>
              
              {/* Group skills by category */}
              {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
                <div key={category} className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 uppercase">
                    {String(category)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => skill.category === category)
                      .map((skill: any, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}

              {/* Uncategorized skills */}
              {skills.some((skill: any) => !skill.category) && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 uppercase">Other Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => !skill.category)
                      .map((skill: any, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}