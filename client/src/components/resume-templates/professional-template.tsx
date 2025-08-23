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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="border-b-2 border-slate-800 pb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            {personalInfo.fullName}
          </h1>
          <h2 className="text-xl text-slate-600 font-medium mb-4">
            {personalInfo.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {personalInfo.email && (
              <div>
                <span className="font-semibold text-slate-800 block">Email</span>
                <span className="text-slate-600">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div>
                <span className="font-semibold text-slate-800 block">Phone</span>
                <span className="text-slate-600">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div>
                <span className="font-semibold text-slate-800 block">Location</span>
                <span className="text-slate-600">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div>
                <span className="font-semibold text-slate-800 block">LinkedIn</span>
                <span className="text-slate-600 break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Section */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-4 border-slate-200 pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">{exp.title}</h3>
                        <span className="text-sm text-slate-600 font-medium sm:text-right bg-slate-100 px-2 py-1 rounded">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-700 mb-3">{exp.company}</h4>
                      {exp.description && (
                        <p className="text-slate-700 mb-3 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.achievements?.length > 0 && (
                        <ul className="text-slate-700 space-y-1">
                          {exp.achievements.map((achievement: string, achievementIndex: number) => (
                            <li key={achievementIndex} className="flex items-start">
                              <span className="text-slate-400 mr-2 mt-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu: any, index: number) => (
                    <div key={index} className="border-l-4 border-slate-200 pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                          <h4 className="font-semibold text-slate-700">{edu.school}</h4>
                          {edu.gpa && (
                            <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        <span className="text-sm text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded">
                          {edu.graduationYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Skills */}
          <div className="space-y-8">
            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider">
                  Skills
                </h2>
                <div className="space-y-4">
                  {skills.reduce((acc: any[], skill: any) => {
                    const existingCategory = acc.find(cat => cat.category === skill.category);
                    if (existingCategory) {
                      existingCategory.skills.push(skill);
                    } else {
                      acc.push({ category: skill.category, skills: [skill] });
                    }
                    return acc;
                  }, []).map((category: any, index: number) => (
                    <div key={index}>
                      <h3 className="font-semibold text-slate-800 mb-3 capitalize">
                        {category.category}
                      </h3>
                      <div className="space-y-2">
                        {category.skills.map((skill: any, skillIndex: number) => (
                          <div key={skillIndex} className="flex justify-between items-center">
                            <span className="text-slate-700">{skill.name}</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= (skill.level === 'beginner' ? 2 : 
                                             skill.level === 'intermediate' ? 3 : 
                                             skill.level === 'advanced' ? 4 : 5)
                                      ? 'bg-slate-800'
                                      : 'bg-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}