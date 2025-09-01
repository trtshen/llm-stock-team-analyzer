import OpenAI from 'openai';
import { getConfig } from '@/lib/config';
import { AnalysisResult } from '@/types';

export class Trader {
  private openai: OpenAI;
  private config: any;

  constructor() {
    this.config = getConfig();
    this.openai = new OpenAI({
      apiKey: this.config.azure_openai.subscription_key,
      baseURL: `${this.config.azure_openai.endpoint}/openai/deployments/${this.config.azure_openai.deployment}`,
      defaultQuery: { 'api-version': this.config.azure_openai.api_version },
      defaultHeaders: {
        'api-key': this.config.azure_openai.subscription_key,
      },
    });
  }

  async synthesizeDecision(
    marketAnalysis: string,
    newsAnalysis: string,
    bullAnalysis: string,
    bearAnalysis: string,
    ticker: string,
    analysisDate: string
  ): Promise<AnalysisResult> {
    const prompt = `As a Senior Trader, synthesize all available analysis into a final trading decision for ${ticker}:

MARKET ANALYSIS:
${marketAnalysis}

NEWS ANALYSIS:
${newsAnalysis}

BULL CASE:
${bullAnalysis}

BEAR CASE:
${bearAnalysis}

Please provide:
1. Final trading recommendation (BUY/SELL/HOLD)
2. Confidence level (1-10 scale)
3. Key reasoning behind the decision
4. Suggested position size (% of portfolio)
5. Risk management strategy
6. Time horizon for the recommendation
7. Key catalysts to watch

Format your response as a clear, actionable trading decision with specific reasoning.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a senior trader with extensive experience in synthesizing multiple analyses into actionable trading decisions. You balance risk and reward while providing clear, specific recommendations.' },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.llm.temperature,
        max_tokens: this.config.llm.max_tokens,
      });

      const finalDecision = response.choices[0]?.message?.content || 'No trading decision available';

      // Extract confidence score (simple regex to find a number after "confidence")
      const confidenceMatch = finalDecision.match(/confidence[:\s]*(\d+)/i);
      const confidence_score = confidenceMatch ? parseInt(confidenceMatch[1]) : 5;

      return {
        ticker: ticker.toUpperCase(),
        date: analysisDate,
        market_analysis: marketAnalysis,
        news_analysis: newsAnalysis,
        bull_perspective: bullAnalysis,
        bear_perspective: bearAnalysis,
        final_decision: finalDecision,
        confidence_score: Math.min(Math.max(confidence_score, 1), 10), // Clamp between 1-10
      };
    } catch (error) {
      console.error('Error in trader synthesis:', error);
      return {
        ticker: ticker.toUpperCase(),
        date: analysisDate,
        market_analysis: marketAnalysis,
        news_analysis: newsAnalysis,
        bull_perspective: bullAnalysis,
        bear_perspective: bearAnalysis,
        final_decision: 'Trading decision temporarily unavailable due to technical issues.',
        confidence_score: 1,
      };
    }
  }
}