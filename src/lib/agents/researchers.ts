import OpenAI from 'openai';
import { getConfig } from '@/lib/config';

export class BullResearcher {
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

  async analyze(marketAnalysis: string, newsAnalysis: string, ticker: string): Promise<string> {
    const prompt = `As a Bull Researcher, analyze the investment opportunity for ${ticker} from an optimistic perspective:

Market Analysis:
${marketAnalysis}

News Analysis:
${newsAnalysis}

Please provide a bull case argument that includes:
1. Growth opportunities and positive catalysts
2. Competitive advantages and market position strengths
3. Technical indicators supporting upward momentum
4. Positive sentiment drivers from news and market data
5. Potential upside scenarios and price targets

Focus on the most compelling reasons to be bullish on this stock while maintaining analytical rigor.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an optimistic but analytical investment researcher who identifies growth opportunities and positive investment themes. You look for upside potential while maintaining professional skepticism.' },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.llm.temperature,
        max_tokens: this.config.llm.max_tokens,
      });

      return response.choices[0]?.message?.content || 'No bull analysis available';
    } catch (error) {
      console.error('Error in bull research:', error);
      return 'Bull research temporarily unavailable due to technical issues.';
    }
  }
}

export class BearResearcher {
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

  async analyze(marketAnalysis: string, newsAnalysis: string, ticker: string): Promise<string> {
    const prompt = `As a Bear Researcher, analyze the investment risks for ${ticker} from a cautious perspective:

Market Analysis:
${marketAnalysis}

News Analysis:
${newsAnalysis}

Please provide a bear case argument that includes:
1. Risk factors and potential headwinds
2. Competitive threats and market challenges
3. Technical indicators suggesting downward pressure
4. Negative sentiment drivers and concerns from news
5. Potential downside scenarios and risk assessment

Focus on the most significant risks and challenges while providing balanced analysis.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a cautious but analytical investment researcher who identifies risks and potential downsides. You focus on risk management and downside protection while maintaining objectivity.' },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.llm.temperature,
        max_tokens: this.config.llm.max_tokens,
      });

      return response.choices[0]?.message?.content || 'No bear analysis available';
    } catch (error) {
      console.error('Error in bear research:', error);
      return 'Bear research temporarily unavailable due to technical issues.';
    }
  }
}