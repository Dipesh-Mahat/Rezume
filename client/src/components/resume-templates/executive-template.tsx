import { Card } from "@/components/ui/card";

interface ExecutiveTemplateProps {
  resumeData: any;
}

export function ExecutiveTemplate({ resumeData }: ExecutiveTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = resumeData;

  if (!personalInfo?.fullName) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Start filling out your information to see the preview</p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full p-0 bg-gradient-to-br from-slate-50 to-blue-50 shadow-xl print:shadow-none print:border-none overflow-hidden">
      <div className="relative">
        {/* Header with Elegant Background */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white px-8 py-8 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">
              {personalInfo.fullName}
            </h1>
            <h2 className="text-xl font-light text-slate-200 mb-6 tracking-wide">
              {personalInfo.title}
            </h2>
            
            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              {personalInfo.email && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Executive Summary */}
          {summary && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-slate-400"></div>
                <h2 className="text-2xl font-bold text-slate-800 ml-4 tracking-tight">
                  Executive Summary
                </h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <p className="text-gray-700 leading-relaxed text-lg font-light">
                  {summary}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Experience */}
            <div className="lg:col-span-2">
              {experience.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-slate-400"></div>
                    <h2 className="text-2xl font-bold text-slate-800 ml-4 tracking-tight">
                      Professional Experience
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {experience.map((exp: any, index: number) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {exp.title}
                            </h3>
                            <h4 className="text-lg font-semibold text-blue-700 mb-2">
                              {exp.company}
                            </h4>
                          </div>
                          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        
                        {exp.description && (
                          <p className="text-gray-700 mb-4 font-light leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                        
                        {exp.achievements?.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
                              Key Achievements
                            </h5>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement: string, achievementIndex: number) => (
                                <li key={achievementIndex} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                  <span className="text-gray-700 font-light leading-relaxed">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-slate-400"></div>
                    <h2 className="text-2xl font-bold text-slate-800 ml-4 tracking-tight">
                      Education
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {education.map((edu: any, index: number) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {edu.degree}
                            </h3>
                            <h4 className="text-base font-semibold text-blue-700">
                              {edu.school}
                            </h4>
                          </div>
                          <div className="text-right text-sm text-slate-600 mt-2 lg:mt-0">
                            <div className="font-medium">{edu.graduationYear}</div>
                            {edu.gpa && (
                              <div className="text-xs text-slate-500">GPA: {edu.gpa}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Skills */}
            {skills.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-slate-400"></div>
                    <h2 className="text-xl font-bold text-slate-800 ml-3 tracking-tight">
                      Core Competencies
                    </h2>
                  </div>
                  
                  {/* Group skills by category */}
                  {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                        {String(category)}
                      </h4>
                      <div className="grid gap-2">
                        {skills
                          .filter((skill: any) => skill.category === category)
                          .map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 font-medium">
                                {skill.name}
                              </span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-2 h-2 rounded-full ml-1 ${
                                      level <= (skill.level === 'expert' ? 5 : 
                                               skill.level === 'advanced' ? 4 :
                                               skill.level === 'intermediate' ? 3 : 2)
                                        ? 'bg-blue-600' 
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

                  {/* Uncategorized skills */}
                  {skills.some((skill: any) => !skill.category) && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                        Additional Skills
                      </h4>
                      <div className="grid gap-2">
                        {skills
                          .filter((skill: any) => !skill.category)
                          .map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 font-medium">
                                {skill.name}
                              </span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-2 h-2 rounded-full ml-1 ${
                                      level <= (skill.level === 'expert' ? 5 : 
                                               skill.level === 'advanced' ? 4 :
                                               skill.level === 'intermediate' ? 3 : 2)
                                        ? 'bg-blue-600' 
                                        : 'bg-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}