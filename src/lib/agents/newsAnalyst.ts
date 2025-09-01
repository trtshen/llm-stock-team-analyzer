import OpenAI from 'openai';
import { getConfig } from '@/lib/config';
import { NewsItem } from '@/types';
import { analyzeNewsSentiment } from '@/lib/utils/newsData';

export class NewsAnalyst {
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

  async analyze(newsData: NewsItem[], ticker: string): Promise<string> {
    const sentiment = analyzeNewsSentiment(newsData);
    
    const newsContext = newsData.map(item => 
      `Title: ${item.title}\nSource: ${item.source}\nDate: ${new Date(item.publishedAt).toLocaleDateString()}\nSummary: ${item.snippet || 'No summary available'}`
    ).join('\n\n');

    const prompt = `As a News Analyst, analyze the sentiment and market impact of recent news for ${ticker}:

${newsContext}

Sentiment Analysis Summary:
${sentiment.summary}

Please provide:
1. Overall sentiment assessment and its market implications
2. Key themes and trends in the news coverage
3. Potential impact on stock price and investor sentiment
4. Notable events or announcements that could affect trading
5. Risk factors mentioned in the news

Focus on how this news might influence investor behavior and stock performance.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert financial news analyst specializing in sentiment analysis and market impact assessment.' },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.llm.temperature,
        max_tokens: this.config.llm.max_tokens,
      });

      return response.choices[0]?.message?.content || 'No news analysis available';
    } catch (error) {
      console.error('Error in news analysis:', error);
      return 'News analysis temporarily unavailable due to technical issues.';
    }
  }
}