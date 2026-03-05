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
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
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
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
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
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
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
