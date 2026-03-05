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

interface FinanceTemplateProps {
  resumeData: ResumeData;
}

export function FinanceTemplate({ resumeData: data }: FinanceTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      {/* Professional Finance Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <h2 className="text-xl font-light text-slate-200">{data.personalInfo.title}</h2>
          </div>
          <div className="text-right">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-end space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{data.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {data.summary && (
          <section className="mb-8">
            <div className="bg-slate-50 border-l-4 border-slate-600 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                Executive Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-slate-600 flex items-center">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{exp.position || exp.title}</h4>
                      <p className="text-slate-600 font-medium text-lg">{exp.company}</p>
                    </div>
                    <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded text-sm font-medium">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                  
                  {/* Key Metrics */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-green-600">+$2.5M</div>
                        <div className="text-xs text-gray-600">Revenue Impact</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-600">25%</div>
                        <div className="text-xs text-gray-600">Cost Reduction</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-600">98.5%</div>
                        <div className="text-xs text-gray-600">Accuracy Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column layout for Education and Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-600 flex items-center">
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-slate-600 font-medium">{edu.institution || edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationYear}</p>
                    {edu.gpa && <p className="text-sm text-slate-700 font-medium">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-600 flex items-center">
                Core Competencies
              </h3>
              <div className="space-y-3">
                {data.skills.map((skill: any, index: number) => (
                  <div key={index} className="bg-white border border-slate-200 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-slate-600 to-slate-800 h-2 rounded-full" 
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

        {/* Professional Certifications */}
        <section className="mt-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>CPA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>CFA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>FRM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>MBA Finance</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
