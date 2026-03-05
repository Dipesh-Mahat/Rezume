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

export type AIProvider = 'openai' | 'gemini';

export function detectProvider(apiKey: string): AIProvider {
  if (apiKey.startsWith('AIza')) return 'gemini';
  return 'openai';
}

async function callOpenAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

async function callAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const provider = detectProvider(apiKey);
  if (provider === 'gemini') return callGemini(apiKey, systemPrompt, userPrompt);
  return callOpenAI(apiKey, systemPrompt, userPrompt);
}

export class AIService {
  static async enhanceDescription(description: string, apiKey: string): Promise<AIEnhancementResult> {
    const result = await callAI(
      apiKey,
      'You are an expert resume writer. Improve the given job description to be more impactful, using strong action verbs and quantified achievements where possible. Return only the improved description text, nothing else.',
      description
    );
    return { improvedDescription: result };
  }

  static async improveGrammar(text: string, apiKey: string): Promise<AIEnhancementResult> {
    const result = await callAI(
      apiKey,
      'You are a professional editor. Fix any grammar, spelling, or punctuation errors in the text. Make it clear and professional. Return only the corrected text, nothing else.',
      text
    );
    return { correctedText: result };
  }

  static async tailorResume(resume: any, jobDescription: string, apiKey: string): Promise<AIEnhancementResult> {
    const result = await callAI(
      apiKey,
      'You are an expert resume consultant. Given a resume and a job description, suggest improvements to tailor the resume for the job. Return a JSON object with optional fields: "summary" (improved summary text) and "skills" (array of skill names to add). Return only valid JSON.',
      `Resume:\n${JSON.stringify(resume)}\n\nJob Description:\n${jobDescription}`
    );
    try {
      const parsed = JSON.parse(result);
      return { improvements: parsed };
    } catch {
      return { improvements: { summary: result } };
    }
  }

  static validateApiKey(apiKey: string): boolean {
    if (apiKey.startsWith('AIza') && apiKey.length > 20) return true;
    if (apiKey.startsWith('sk-') && apiKey.length > 20) return true;
    return false;
  }
}
