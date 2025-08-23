interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  education: Array<{
    id?: string;
    degree: string;
    institution?: string;
    school?: string;
    startDate?: string;
    endDate?: string;
    graduationYear?: string;
    gpa?: string;
  }>;
  experience: Array<{
    id?: string;
    position?: string;
    title?: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    current?: boolean;
  }>;
  skills: Array<{
    id?: string;
    name: string;
    level: string;
    category?: string;
  }>;
  summary?: string;
  template?: string;
}

interface MarketingTemplateProps {
  data: ResumeData;
}

export function MarketingTemplate({ data }: MarketingTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      {/* Creative Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-8">
        <div className="relative">
          <div className="absolute top-0 right-0 opacity-20">
            <div className="text-6xl">📈</div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
          <h2 className="text-xl font-light mb-6">{data.personalInfo.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300">📧</span>
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300">📱</span>
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300">📍</span>
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">💼</span>
                <span>LinkedIn</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Brand Statement */}
        {data.summary && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Brand Statement
              </h3>
              <p className="text-gray-700 leading-relaxed italic text-lg">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Experience with Metrics Focus */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 pb-2 border-b-2 border-purple-500 flex items-center">
              <span className="mr-2">🚀</span>
              Marketing & Sales Achievements
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.position || exp.title}</h4>
                        <p className="text-purple-600 font-medium text-lg">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    
                    {/* Metrics placeholder */}
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">150%</div>
                          <div className="text-xs text-gray-600">Revenue Growth</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-pink-600">$2.5M</div>
                          <div className="text-xs text-gray-600">Sales Generated</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">45%</div>
                          <div className="text-xs text-gray-600">Lead Conversion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Layout for Education and Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b-2 border-purple-500 flex items-center">
                <span className="mr-2">🎓</span>
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-purple-600 font-medium">{edu.institution || edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationYear}</p>
                    {edu.gpa && <p className="text-sm text-purple-700 font-medium">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b-2 border-purple-500 flex items-center">
                <span className="mr-2">⚡</span>
                Core Competencies
              </h3>
              <div className="space-y-3">
                {data.skills.map((skill: any, index: number) => (
                  <div key={index} className="bg-white border border-purple-200 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                        style={{ 
                          width: skill.level === 'Expert' ? '95%' : 
                                 skill.level === 'Advanced' ? '80%' : 
                                 skill.level === 'Intermediate' ? '65%' : '50%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Tools & Platforms */}
        <section className="mt-8">
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
              <span className="mr-2">🛠️</span>
              Marketing Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>HubSpot</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Salesforce</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <span>Google Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Facebook Ads</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
