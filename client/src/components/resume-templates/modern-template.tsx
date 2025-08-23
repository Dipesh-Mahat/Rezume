interface ModernTemplateProps {
  resumeData: any;
}

export function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const personalInfo = resumeData?.personalInfo;
  const education = resumeData?.education || [];
  const experience = resumeData?.experience || [];
  const skills = resumeData?.skills || [];
  const summary = resumeData?.summary;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (!personalInfo) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Start Building Your Resume</h3>
          <p className="text-sm">Fill out the form to see your resume preview here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="template-modern max-w-none bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 text-white p-4 sm:p-6 lg:p-8 mb-4 lg:mb-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3 tracking-tight" data-testid="preview-name">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg sm:text-xl font-light mb-4 lg:mb-6 text-blue-100" data-testid="preview-title">
            {personalInfo.title || 'Your Professional Title'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-blue-100" data-testid="preview-contact">
            {personalInfo.email && (
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-sm sm:text-base">
                <span className="mr-2">✉️</span>
                <span className="font-medium" data-testid="preview-email">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-sm sm:text-base">
                <span className="mr-2">📞</span>
                <span className="font-medium" data-testid="preview-phone">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-sm sm:text-base">
                <span className="mr-2">🌍</span>
                <span className="font-medium" data-testid="preview-location">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center bg-white bg-opacity-20 rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-sm sm:text-base">
                <span className="mr-2">💼</span>
                <a 
                  href={personalInfo.linkedin} 
                  className="font-medium hover:underline text-white"
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="preview-linkedin"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Professional Summary */}
        {summary && (
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center mb-3 lg:mb-4">
              <div className="w-6 lg:w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 mr-2 lg:mr-3"></div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Professional Summary</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <p className="text-gray-700 leading-relaxed font-light" data-testid="preview-summary">
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1" data-testid={`exp-title-${index}`}>
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-indigo-600 mb-2" data-testid={`exp-company-${index}`}>
                        {exp.company}
                      </h4>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed" data-testid={`exp-description-${index}`}>
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements?.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                        Key Achievements
                      </h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement: string, achievementIndex: number) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm leading-relaxed">
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

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            
            <div className="grid gap-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900" data-testid={`edu-degree-${index}`}>
                        {edu.degree}
                      </h3>
                      <h4 className="text-base font-semibold text-indigo-600" data-testid={`edu-school-${index}`}>
                        {edu.school}
                      </h4>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-2 md:mt-0">
                      <div className="font-medium">{edu.graduationYear}</div>
                      {edu.gpa && (
                        <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Technical Skills</h2>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
              {/* Group skills by category */}
              {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                    {String(category)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => skill.category === category)
                      .map((skill: any, index: number) => (
                        <span 
                          key={skill.id || index} 
                          className={`px-3 py-2 rounded-full text-sm font-medium ${
                            skill.level === 'expert' ? 'bg-indigo-600 text-white' :
                            skill.level === 'advanced' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-200 text-gray-800'
                          }`}
                          data-testid={`preview-skill-${index}`}
                        >
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              ))}

              {/* Skills without category */}
              {skills.some((skill: any) => !skill.category) && (
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                    Additional Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => !skill.category)
                      .map((skill: any, index: number) => (
                        <span 
                          key={skill.id || index} 
                          className="bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}