import OpenAI from 'openai';
import { getConfig } from '@/lib/config';
import { StockData, NewsItem, AgentState } from '@/types';

export class MarketAnalyst {
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

  async analyze(stockData: StockData, ticker: string): Promise<string> {
    const prompt = `As a Market Analyst, provide a comprehensive technical analysis for ${ticker} based on the following data:

Current Price: $${stockData.price}
Change: ${stockData.change > 0 ? '+' : ''}${stockData.change.toFixed(2)} (${stockData.changePercent.toFixed(2)}%)
Volume: ${stockData.volume.toLocaleString()}
Market Cap: ${stockData.marketCap ? '$' + (stockData.marketCap / 1e9).toFixed(2) + 'B' : 'N/A'}

Technical Indicators:
- RSI: ${stockData.indicators?.rsi?.toFixed(2) || 'N/A'}
- SMA(20): $${stockData.indicators?.sma?.toFixed(2) || 'N/A'}
- EMA(20): $${stockData.indicators?.ema?.toFixed(2) || 'N/A'}

Please provide:
1. Technical analysis of the current price action
2. Key support and resistance levels
3. Momentum indicators assessment
4. Volume analysis
5. Short-term price outlook

Keep the analysis concise but thorough, focusing on actionable insights.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4', // This will be overridden by Azure deployment
        messages: [
          { role: 'system', content: 'You are an expert market analyst with deep knowledge of technical analysis and financial markets.' },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.llm.temperature,
        max_tokens: this.config.llm.max_tokens,
      });

      return response.choices[0]?.message?.content || 'No analysis available';
    } catch (error) {
      console.error('Error in market analysis:', error);
      return 'Market analysis temporarily unavailable due to technical issues.';
    }
  }
}