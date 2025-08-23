import { Card } from "@/components/ui/card";

interface CreativeBoldTemplateProps {
  resumeData: any;
}

export function CreativeBoldTemplate({ resumeData }: CreativeBoldTemplateProps) {
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
        <div className="w-1/3 bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600 p-8 text-white">
          {/* Profile Photo Placeholder */}
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-6xl font-bold text-white opacity-80">
              {personalInfo.fullName.charAt(0)}
            </span>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-white border-opacity-30 pb-2">
              Contact
            </h3>
            {personalInfo.email && (
              <div className="text-sm">
                <div className="font-semibold opacity-80">Email</div>
                <div className="break-all">{personalInfo.email}</div>
              </div>
            )}
            {personalInfo.phone && (
              <div className="text-sm">
                <div className="font-semibold opacity-80">Phone</div>
                <div>{personalInfo.phone}</div>
              </div>
            )}
            {personalInfo.location && (
              <div className="text-sm">
                <div className="font-semibold opacity-80">Location</div>
                <div>{personalInfo.location}</div>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="text-sm">
                <div className="font-semibold opacity-80">LinkedIn</div>
                <div className="break-all">{personalInfo.linkedin}</div>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wider border-b border-white border-opacity-30 pb-2">
                Skills
              </h3>
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
                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-90 mb-2">
                      {category.category}
                    </h4>
                    <div className="space-y-2">
                      {category.skills.map((skill: any, skillIndex: number) => (
                        <div key={skillIndex} className="text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs opacity-75">
                              {skill.level === 'beginner' ? '★★☆☆☆' :
                               skill.level === 'intermediate' ? '★★★☆☆' :
                               skill.level === 'advanced' ? '★★★★☆' : '★★★★★'}
                            </span>
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

        {/* Right Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">
              {personalInfo.fullName}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mb-4"></div>
            <h2 className="text-2xl text-gray-600 font-light">
              {personalInfo.title}
            </h2>
          </div>

          {/* Professional Summary */}
          {summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  ABOUT ME
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  EXPERIENCE
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
              </h3>
              
              <div className="space-y-6">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                          <h4 className="text-xl font-bold text-gray-900">{exp.title}</h4>
                          <span className="text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <h5 className="text-lg font-semibold text-purple-600 mb-3">{exp.company}</h5>
                        {exp.description && (
                          <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                        )}
                        {exp.achievements?.length > 0 && (
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  EDUCATION
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
              </h3>
              
              <div className="space-y-4">
                {education.map((edu: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                          <h5 className="text-lg font-semibold text-purple-600">{edu.school}</h5>
                          {edu.gpa && (
                            <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 rounded-full">
                          {edu.graduationYear}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
