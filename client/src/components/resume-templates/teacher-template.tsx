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

interface TeacherTemplateProps {
  resumeData: ResumeData;
}

export function TeacherTemplate({ resumeData: data }: TeacherTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      {/* Education-focused Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <div className="text-center relative">
          <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
          <h2 className="text-xl font-light mb-6">{data.personalInfo.title}</h2>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>{data.personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Teaching Philosophy */}
        {data.summary && (
          <section className="mb-8">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                Teaching Philosophy
              </h3>
              <p className="text-gray-700 leading-relaxed italic text-lg">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teaching Experience */}
            {data.experience.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b-2 border-indigo-500 flex items-center">
                  Teaching Experience
                </h3>
                <div className="space-y-6">
                  {data.experience.map((exp: any, index: number) => (
                    <div key={index} className="bg-white border border-indigo-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900">{exp.position || exp.title}</h4>
                      <p className="text-indigo-600 font-medium text-lg">{exp.company}</p>
                      <p className="text-sm text-gray-600 mb-3 bg-indigo-50 inline-block px-3 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      
                      {/* Achievement highlights */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center bg-green-50 p-3 rounded">
                          <div className="text-lg font-bold text-green-600">98%</div>
                          <div className="text-xs text-green-700">Student Satisfaction</div>
                        </div>
                        <div className="text-center bg-blue-50 p-3 rounded">
                          <div className="text-lg font-bold text-blue-600">25+</div>
                          <div className="text-xs text-blue-700">Students Per Class</div>
                        </div>
                        <div className="text-center bg-purple-50 p-3 rounded">
                          <div className="text-lg font-bold text-purple-600">A+</div>
                          <div className="text-xs text-purple-700">Avg Grade Improvement</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education & Certifications */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b-2 border-indigo-500 flex items-center">

                  Education & Certifications
                </h3>
                <div className="space-y-4">
                  {data.education.map((edu: any, index: number) => (
                    <div key={index} className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-indigo-600 font-medium">{edu.institution || edu.school}</p>
                      <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationYear}</p>
                      {edu.gpa && <p className="text-sm text-indigo-700 font-medium">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-indigo-800 mb-4 pb-2 border-b-2 border-indigo-500 flex items-center">
                  Teaching Skills
                </h3>
                <div className="space-y-3">
                  {data.skills.map((skill: any, index: number) => (
                    <div key={index} className="bg-white border border-indigo-200 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" 
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

            {/* Teaching Subjects */}
            <section className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                Subject Areas
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Mathematics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Science</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>English Literature</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Social Studies</span>
                </div>
              </div>
            </section>

            {/* Awards */}
            <section className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">

                Awards & Recognition
              </h3>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• Teacher of the Year 2023</p>
                <p>• Excellence in Education Award</p>
                <p>• Student Choice Award</p>
                <p>• Innovation in Teaching</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
