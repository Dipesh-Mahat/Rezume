import { Card } from "@/components/ui/card";

interface CreativeTemplateProps {
  resumeData: any;
}

export function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = resumeData;

  if (!personalInfo?.fullName) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Start filling out your information to see the preview</p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full p-0 bg-white shadow-lg print:shadow-none print:border-none overflow-hidden">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-indigo-700 text-white p-6 print:bg-gray-800">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold">
                {personalInfo.fullName.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <h1 className="text-xl font-bold mb-2">{personalInfo.fullName}</h1>
            <h2 className="text-purple-200 text-sm font-medium">{personalInfo.title}</h2>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white border-opacity-30 pb-1">
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  <span className="break-all text-xs">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white border-opacity-30 pb-1">
                Skills
              </h3>
              
              {/* Group skills by category */}
              {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
                <div key={category} className="mb-3">
                  <h4 className="text-purple-200 text-xs font-semibold mb-2 uppercase">
                    {String(category)}
                  </h4>
                  <div className="space-y-1">
                    {skills
                      .filter((skill: any) => skill.category === category)
                      .map((skill: any, index: number) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill.name}</span>
                          </div>
                          <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                            <div 
                              className="bg-white rounded-full h-1 transition-all duration-300"
                              style={{ 
                                width: skill.level === 'expert' ? '100%' : 
                                       skill.level === 'advanced' ? '80%' :
                                       skill.level === 'intermediate' ? '60%' : '40%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Uncategorized skills */}
              {skills.some((skill: any) => !skill.category) && (
                <div>
                  <h4 className="text-purple-200 text-xs font-semibold mb-2 uppercase">Other</h4>
                  <div className="space-y-1">
                    {skills
                      .filter((skill: any) => !skill.category)
                      .map((skill: any, index: number) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill.name}</span>
                          </div>
                          <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                            <div 
                              className="bg-white rounded-full h-1 transition-all duration-300"
                              style={{ 
                                width: skill.level === 'expert' ? '100%' : 
                                       skill.level === 'advanced' ? '80%' :
                                       skill.level === 'intermediate' ? '60%' : '40%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {/* Summary Section */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-purple-600 pl-3">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">
                Experience
              </h2>
              {experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 last:mb-0 relative pl-6">
                  <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="absolute left-1.5 top-3 w-0.5 bg-purple-200 h-full"></div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                      <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <h4 className="font-semibold text-purple-600 mb-2">{exp.company}</h4>
                    {exp.description && (
                      <p className="text-gray-700 text-sm mb-3">{exp.description}</p>
                    )}
                    {exp.achievements?.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.achievements.map((achievement: string, achievementIndex: number) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="text-purple-600 mr-2 text-xs">▸</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">
                Education
              </h2>
              {education.map((edu: any, index: number) => (
                <div key={index} className="mb-3 last:mb-0 bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <h4 className="font-semibold text-purple-600">{edu.school}</h4>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <div className="font-medium">{edu.graduationYear}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}