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

interface TechTemplateProps {
  resumeData: ResumeData;
}

export function TechTemplate({ resumeData }: TechTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
            <h2 className="text-xl font-light text-blue-200">{resumeData.personalInfo.title}</h2>
          </div>
          <div className="text-right text-sm space-y-1">
            <div className="flex items-center justify-end space-x-2">
              <span>📧</span>
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <span>📱</span>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <span>📍</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
            {resumeData.personalInfo.website && (
              <div className="flex items-center justify-end space-x-2">
                <span>🌐</span>
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Experience
                </h3>
                <div className="space-y-6">
                  {resumeData.experience.map((exp: any, index: number) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-slate-900">{exp.position || exp.title}</h4>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600 mb-3">{exp.startDate} - {exp.endDate}</p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Education
                </h3>
                <div className="space-y-4">
                  {resumeData.education.map((edu: any, index: number) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-slate-900">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium">{edu.institution || edu.school}</p>
                      <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationYear}</p>
                      {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Technical Skills
                </h3>
                <div className="space-y-3">
                  {resumeData.skills.map((skill: any, index: number) => (
                    <div key={index} className="bg-slate-100 p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">{skill.name}</span>
                        <span className="text-sm text-blue-600">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-full" 
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
        </div>
      </div>
    </div>
  );
}
