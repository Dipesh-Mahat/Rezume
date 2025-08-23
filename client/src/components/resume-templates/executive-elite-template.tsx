import { Card } from "@/components/ui/card";

interface ExecutiveEliteTemplateProps {
  resumeData: any;
}

export function ExecutiveEliteTemplate({ resumeData }: ExecutiveEliteTemplateProps) {
  const { personalInfo, education, experience, skills, summary } = resumeData;

  if (!personalInfo?.fullName) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Start filling out your information to see the preview</p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full p-0 bg-white shadow-lg print:shadow-none print:border-none">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        {/* Letterhead Style Header */}
        <div className="border-b border-gray-700 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-wide mb-2">
                {personalInfo.fullName}
              </h1>
              <h2 className="text-xl font-light text-gray-300">
                {personalInfo.title}
              </h2>
            </div>
            <div className="text-right text-sm space-y-1 text-gray-300">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div className="truncate max-w-48">{personalInfo.linkedin}</div>}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-300 mb-4">
              Executive Summary
            </h3>
            <p className="text-gray-100 leading-relaxed text-lg">{summary}</p>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Professional Experience */}
          {experience.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
                PROFESSIONAL EXPERIENCE
              </h3>
              
              <div className="space-y-8">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="border-l-4 border-gray-300 pl-8 pb-8">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-900 rounded-full border-4 border-white"></div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">{exp.title}</h4>
                            <h5 className="text-xl font-semibold text-gray-700">{exp.company}</h5>
                          </div>
                          <div className="text-right">
                            <span className="inline-block bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium">
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </span>
                          </div>
                        </div>
                        
                        {exp.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed text-lg">{exp.description}</p>
                        )}
                        
                        {exp.achievements?.length > 0 && (
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-2">Key Achievements:</h6>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                                  <span className="text-gray-700 leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
                  EDUCATION
                </h3>
                
                <div className="space-y-6">
                  {education.map((edu: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                          <h5 className="text-lg font-semibold text-gray-700">{edu.school}</h5>
                          {edu.gpa && (
                            <p className="text-gray-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
                          )}
                        </div>
                        <span className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-medium">
                          {edu.graduationYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Competencies */}
            {skills.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
                  CORE COMPETENCIES
                </h3>
                
                <div className="space-y-6">
                  {skills.reduce((acc: any[], skill: any) => {
                    const existingCategory = acc.find(cat => cat.category === skill.category);
                    if (existingCategory) {
                      existingCategory.skills.push(skill);
                    } else {
                      acc.push({ category: skill.category, skills: [skill] });
                    }
                    return acc;
                  }, []).map((category: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        {category.category}
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {category.skills.map((skill: any, skillIndex: number) => (
                          <div key={skillIndex} className="flex items-center justify-between p-3 bg-white rounded border">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-3 h-3 rounded-full ${
                                    level <= (skill.level === 'beginner' ? 2 : 
                                             skill.level === 'intermediate' ? 3 : 
                                             skill.level === 'advanced' ? 4 : 5)
                                      ? 'bg-gray-900'
                                      : 'bg-gray-300'
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

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="text-center text-gray-600 text-sm">
              <p className="font-medium">{personalInfo.fullName}</p>
              <p>Professional Resume</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
