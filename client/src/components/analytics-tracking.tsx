import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText,
  Users,
  Target,
  Lightbulb
} from "lucide-react";

interface ResumeAnalytics {
  completionScore: number;
  strengths: string[];
  suggestions: string[];
  sectionScores: {
    personalInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
  };
  wordCounts: {
    total: number;
    summary: number;
    experience: number;
  };
  timeSpent: number;
  lastUpdated: Date;
}

interface AnalyticsProps {
  resumeData: any;
  onSuggestionApply?: (suggestion: string) => void;
}

export function ResumeAnalytics({ resumeData, onSuggestionApply }: AnalyticsProps) {
  const [analytics, setAnalytics] = useState<ResumeAnalytics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (resumeData) {
      analyzeResume();
    }
  }, [resumeData]);

  const analyzeResume = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const analysis = generateAnalytics(resumeData);
      setAnalytics(analysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  const generateAnalytics = (data: any): ResumeAnalytics => {
    const personalInfo = data.personalInfo || {};
    const summary = data.summary || '';
    const experience = data.experience || [];
    const education = data.education || [];
    const skills = data.skills || [];

    // Calculate section scores
    const personalInfoScore = calculatePersonalInfoScore(personalInfo);
    const summaryScore = calculateSummaryScore(summary);
    const experienceScore = calculateExperienceScore(experience);
    const educationScore = calculateEducationScore(education);
    const skillsScore = calculateSkillsScore(skills);

    const sectionScores = {
      personalInfo: personalInfoScore,
      summary: summaryScore,
      experience: experienceScore,
      education: educationScore,
      skills: skillsScore
    };

    // Calculate overall completion score (weighted)
    const weights = { personalInfo: 25, summary: 20, experience: 30, education: 15, skills: 10 };
    const completionScore = Math.round(
      (sectionScores.personalInfo * weights.personalInfo + 
       sectionScores.summary * weights.summary + 
       sectionScores.experience * weights.experience + 
       sectionScores.education * weights.education + 
       sectionScores.skills * weights.skills) / 100
    );

    // Generate strengths and suggestions
    const strengths = generateStrengths(sectionScores, data);
    const suggestions = generateSuggestions(sectionScores, data);

    // Calculate word counts
    const wordCounts = {
      total: calculateTotalWords(data),
      summary: summary.split(' ').filter((w: string) => w.length > 0).length,
      experience: experience.reduce((acc: number, exp: any) => 
        acc + (exp.description?.split(' ').filter((w: string) => w.length > 0).length || 0), 0)
    };

    return {
      completionScore,
      strengths,
      suggestions,
      sectionScores,
      wordCounts,
      timeSpent: 0, // Would be tracked in real implementation
      lastUpdated: new Date()
    };
  };

  // Helper functions for scoring
  const calculatePersonalInfoScore = (info: any) => {
    const requiredFields = ['fullName', 'title', 'email', 'phone', 'location'];
    const optionalFields = ['linkedin'];
    
    let score = 0;
    requiredFields.forEach(field => {
      if (info[field]) score += 16; // 80 points for required fields
    });
    optionalFields.forEach(field => {
      if (info[field]) score += 20; // 20 points for optional fields
    });
    
    return Math.min(score, 100);
  };

  const calculateSummaryScore = (summary: string) => {
    if (!summary) return 0;
    const wordCount = summary.split(' ').filter(w => w.length > 0).length;
    
    if (wordCount >= 30 && wordCount <= 60) return 100;
    if (wordCount >= 20) return 80;
    if (wordCount >= 10) return 60;
    return 40;
  };

  const calculateExperienceScore = (experience: any[]) => {
    if (experience.length === 0) return 0;
    
    let score = Math.min(experience.length * 25, 50); // Up to 50 for having experience
    
    experience.forEach(exp => {
      if (exp.description && exp.description.length > 50) score += 10;
      if (exp.achievements && exp.achievements.length > 0) score += 15;
      if (exp.title && exp.company) score += 10;
    });
    
    return Math.min(score, 100);
  };

  const calculateEducationScore = (education: any[]) => {
    if (education.length === 0) return 0;
    return Math.min(education.length * 50, 100);
  };

  const calculateSkillsScore = (skills: any[]) => {
    if (skills.length === 0) return 0;
    if (skills.length >= 8) return 100;
    if (skills.length >= 5) return 80;
    if (skills.length >= 3) return 60;
    return 40;
  };

  const calculateTotalWords = (data: any) => {
    let total = 0;
    if (data.summary) total += data.summary.split(' ').filter((w: string) => w.length > 0).length;
    if (data.experience) {
      data.experience.forEach((exp: any) => {
        if (exp.description) total += exp.description.split(' ').filter((w: string) => w.length > 0).length;
      });
    }
    return total;
  };

  const generateStrengths = (scores: any, data: any) => {
    const strengths = [];
    if (scores.personalInfo >= 80) strengths.push("Complete contact information");
    if (scores.summary >= 80) strengths.push("Well-written professional summary");
    if (scores.experience >= 80) strengths.push("Comprehensive work experience");
    if (scores.skills >= 80) strengths.push("Diverse skill set showcased");
    if (data.experience?.some((exp: any) => exp.achievements?.length > 0)) {
      strengths.push("Quantified achievements included");
    }
    return strengths;
  };

  const generateSuggestions = (scores: any, data: any) => {
    const suggestions = [];
    
    if (scores.personalInfo < 80) {
      suggestions.push("Add missing contact information (LinkedIn profile recommended)");
    }
    if (scores.summary < 60) {
      suggestions.push("Write a compelling professional summary (30-60 words)");
    }
    if (scores.experience < 70) {
      suggestions.push("Add more detailed job descriptions and achievements");
    }
    if (scores.skills < 60) {
      suggestions.push("Include at least 5-8 relevant skills");
    }
    if (data.experience?.some((exp: any) => !exp.achievements || exp.achievements.length === 0)) {
      suggestions.push("Add quantified achievements to your work experience");
    }
    
    return suggestions;
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Analyzing your resume...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Resume Strength Score
          </CardTitle>
          <CardDescription>
            Overall completeness and quality assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{analytics.completionScore}%</span>
              <Badge variant={analytics.completionScore >= 80 ? "default" : analytics.completionScore >= 60 ? "secondary" : "destructive"}>
                {analytics.completionScore >= 80 ? "Excellent" : analytics.completionScore >= 60 ? "Good" : "Needs Work"}
              </Badge>
            </div>
            <Progress value={analytics.completionScore} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Section Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Section Analysis</CardTitle>
          <CardDescription>Detailed breakdown of each resume section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analytics.sectionScores).map(([section, score]) => (
              <div key={section} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={score} className="w-16" />
                  <span className="text-sm font-medium w-10">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      {analytics.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.strengths.map((strength, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {analytics.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                  {onSuggestionApply && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onSuggestionApply(suggestion)}
                      className="ml-2"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Content Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.wordCounts.total}</div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analytics.wordCounts.summary}</div>
              <div className="text-sm text-gray-600">Summary Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.wordCounts.experience}</div>
              <div className="text-sm text-gray-600">Experience Words</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}