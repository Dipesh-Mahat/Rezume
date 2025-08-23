export interface AIEnhancementResult {
  improvedDescription?: string;
  correctedText?: string;
  suggestions?: string[];
  keywordsToAdd?: string[];
  improvements?: {
    summary?: string;
    skills?: string[];
  };
}

export class AIService {
  static async enhanceDescription(description: string, apiKey: string): Promise<AIEnhancementResult> {
    const response = await fetch('/api/ai/enhance-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, apiKey })
    });

    if (!response.ok) {
      throw new Error(`AI enhancement failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async improveGrammar(text: string, apiKey: string): Promise<AIEnhancementResult> {
    const response = await fetch('/api/ai/improve-grammar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, apiKey })
    });

    if (!response.ok) {
      throw new Error(`Grammar improvement failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async tailorResume(resume: any, jobDescription: string, apiKey: string): Promise<AIEnhancementResult> {
    const response = await fetch('/api/ai/tailor-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDescription, apiKey })
    });

    if (!response.ok) {
      throw new Error(`Resume tailoring failed: ${response.statusText}`);
    }

    return response.json();
  }

  static validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-') && apiKey.length > 20;
  }
}
