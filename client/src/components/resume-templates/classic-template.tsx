interface ClassicTemplateProps {
  resumeData: any;
}

export function ClassicTemplate({ resumeData }: ClassicTemplateProps) {
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
      month: 'long' 
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
    <div className="template-classic max-w-none bg-white shadow-lg border border-gray-300">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-4 border-gray-800 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide" data-testid="classic-preview-name">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700 mb-4 font-medium" data-testid="classic-preview-title">
            {personalInfo.title || 'Your Professional Title'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-700" data-testid="classic-preview-contact">
            {personalInfo.email && (
              <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="mr-2 text-lg">✉️</span>
                <span className="font-medium">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="mr-2 text-lg">📞</span>
                <span className="font-medium">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="mr-2 text-lg">🌍</span>
                <span className="font-medium">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="mr-2 text-lg">💼</span>
                <a 
                  href={personalInfo.linkedin} 
                  className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
              Professional Summary
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
              <p className="text-gray-700 leading-relaxed font-light text-lg" data-testid="classic-preview-summary">
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-800 pb-2">
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 border-gray-300 pl-6 pb-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1" data-testid={`classic-exp-title-${index}`}>
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-700 mb-2" data-testid={`classic-exp-company-${index}`}>
                        {exp.company}
                      </h4>
                    </div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide border border-gray-400 px-3 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed" data-testid={`classic-exp-description-${index}`}>
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements?.length > 0 && (
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement: string, achievementIndex: number) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="text-gray-800 mr-2 font-bold">•</span>
                            <span className="text-gray-700 leading-relaxed">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-800 pb-2">
              Education
            </h2>
            
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900" data-testid={`classic-edu-degree-${index}`}>
                        {edu.degree}
                      </h3>
                      <h4 className="text-base font-semibold text-gray-700" data-testid={`classic-edu-school-${index}`}>
                        {edu.school}
                      </h4>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-2 lg:mt-0">
                      <div className="font-bold border border-gray-400 px-2 py-1 rounded">{edu.graduationYear}</div>
                      {edu.gpa && (
                        <div className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-800 pb-2">
              Skills & Competencies
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Group skills by category */}
              {Array.from(new Set(skills.map((skill: any) => skill.category).filter(Boolean))).map((category: any) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h4 className="font-bold text-gray-900 text-base mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
                    {String(category)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => skill.category === category)
                      .map((skill: any, index: number) => (
                        <span 
                          key={skill.id || index} 
                          className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium border"
                          data-testid={`classic-preview-skill-${index}`}
                        >
                          {skill.name}
                          {skill.level && skill.level !== 'intermediate' && (
                            <span className="ml-2 text-xs bg-white text-gray-800 px-2 py-1 rounded">
                              {skill.level}
                            </span>
                          )}
                        </span>
                      ))
                    }
                  </div>
                </div>
              ))}

              {/* Skills without category */}
              {skills.some((skill: any) => !skill.category) && (
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
                    Additional Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill: any) => !skill.category)
                      .map((skill: any, index: number) => (
                        <span 
                          key={skill.id || index} 
                          className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium border"
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