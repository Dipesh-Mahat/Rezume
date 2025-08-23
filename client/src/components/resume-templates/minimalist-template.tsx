import { Card } from "@/components/ui/card";

interface MinimalistTemplateProps {
  resumeData: any;
}

export function MinimalistTemplate({ resumeData }: MinimalistTemplateProps) {
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
            {personalInfo.fullName}
          </h1>
          <h2 className="text-lg text-gray-600 font-light mb-6 tracking-wide">
            {personalInfo.title}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin}</span>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed text-lg font-light max-w-3xl mx-auto">
              {summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 text-center tracking-wide">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.title}</h3>
                  <h4 className="text-lg text-gray-600 font-light mb-2">{exp.company}</h4>
                  <p className="text-sm text-gray-500 mb-4 font-light">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mb-4 max-w-2xl mx-auto font-light">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                      {exp.achievements.map((achievement: string, achievementIndex: number) => (
                        <p key={achievementIndex} className="text-gray-700 text-sm mb-2 font-light">
                          {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 text-center tracking-wide">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h3>
                  <h4 className="text-lg text-gray-600 font-light mb-2">{edu.school}</h4>
                  <div className="text-sm text-gray-500 font-light">
                    <span>{edu.graduationYear}</span>
                    {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 text-center tracking-wide">
              Skills
            </h2>
            
            {/* Group skills by category */}
            {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
              <div key={category} className="mb-6 text-center">
                <h4 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">
                  {String(category)}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {skills
                    .filter((skill: any) => skill.category === category)
                    .map((skill: any, index: number) => (
                      <span key={index} className="text-gray-700 font-light">
                        {skill.name}
                        {index < skills.filter((s: any) => s.category === category).length - 1 && (
                          <span className="text-gray-400 ml-3">•</span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
            ))}

            {/* Uncategorized skills */}
            {skills.some((skill: any) => !skill.category) && (
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-3">
                  {skills
                    .filter((skill: any) => !skill.category)
                    .map((skill: any, index: number) => (
                      <span key={index} className="text-gray-700 font-light">
                        {skill.name}
                        {index < skills.filter((s: any) => !s.category).length - 1 && (
                          <span className="text-gray-400 ml-3">•</span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}