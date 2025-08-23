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

interface HealthcareTemplateProps {
  resumeData: ResumeData;
}

export function HealthcareTemplate({ resumeData }: HealthcareTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      {/* Header with Medical Theme */}
      <div className="bg-gradient-to-r from-green-700 to-blue-700 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
          <h2 className="text-xl font-light mb-4">{resumeData.personalInfo.title}</h2>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <span>📧</span>
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📱</span>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📍</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <div className="bg-green-50 border-l-4 border-green-600 p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>
          </section>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-600 flex items-center">
                  <span className="mr-2">🏥</span>
                  Clinical Experience
                </h3>
                <div className="space-y-6">
                  {resumeData.experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-4 border-green-300 pl-6 pb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-900">{exp.position || exp.title}</h4>
                        <p className="text-green-600 font-medium text-lg">{exp.company}</p>
                        <p className="text-sm text-gray-600 mb-3 bg-gray-50 inline-block px-3 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-600 flex items-center">
                  <span className="mr-2">🎓</span>
                  Education & Certifications
                </h3>
                <div className="space-y-4">
                  {resumeData.education.map((edu: any, index: number) => (
                    <div key={index} className="bg-green-50 border border-green-200 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-green-600 font-medium">{edu.institution || edu.school}</p>
                      <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationYear}</p>
                      {edu.gpa && <p className="text-sm text-green-700 font-medium">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-green-800 mb-4 pb-2 border-b-2 border-green-600 flex items-center">
                  <span className="mr-2">⚕️</span>
                  Clinical Skills
                </h3>
                <div className="space-y-3">
                  {resumeData.skills.map((skill: any, index: number) => (
                    <div key={index} className="bg-white border border-green-200 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-700 h-2 rounded-full" 
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

            {/* Additional Info Box */}
            <section className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">📋</span>
                Licenses & Credentials
              </h3>
              <div className="text-sm text-blue-700 space-y-2">
                <p>• State Medical License</p>
                <p>• BLS/CPR Certified</p>
                <p>• ACLS Certified</p>
                <p>• DEA Registration</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
