import { Card } from "@/components/ui/card";

interface ModernProTemplateProps {
  resumeData: any;
}

export function ModernProTemplate({ resumeData }: ModernProTemplateProps) {
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
        {/* Header Section with Gradient Background */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
          <div className="relative p-8 text-white">
            <h1 className="text-5xl font-bold mb-3 tracking-tight">
              {personalInfo.fullName}
            </h1>
            <h2 className="text-2xl font-light mb-6 opacity-90">
              {personalInfo.title}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg pl-6">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                </div>
                
                <div className="space-y-8 pl-6">
                  {experience.map((exp: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 top-2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                      {index !== experience.length - 1 && (
                        <div className="absolute -left-6 top-6 w-px h-full bg-gray-200"></div>
                      )}
                      
                      <div className="bg-gray-50 rounded-lg p-6 ml-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                          <span className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-blue-600 mb-3">{exp.company}</h4>
                        {exp.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                        )}
                        {exp.achievements?.length > 0 && (
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                </div>
                
                <div className="space-y-4 pl-6">
                  {education.map((edu: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                          <h4 className="text-lg font-semibold text-blue-600">{edu.school}</h4>
                          {edu.gpa && (
                            <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full mt-2 sm:mt-0">
                          {edu.graduationYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {skills.length > 0 && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                </div>
                
                <div className="space-y-6 pl-6">
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
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.skills.map((skill: any, skillIndex: number) => (
                          <div key={skillIndex}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                              <span className="text-xs text-gray-500 capitalize">{skill.level}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${skill.level === 'beginner' ? 40 : 
                                              skill.level === 'intermediate' ? 60 : 
                                              skill.level === 'advanced' ? 80 : 100}%` 
                                }}
                              ></div>
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
