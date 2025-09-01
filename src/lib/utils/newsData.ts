import axios from 'axios';
import { NewsItem } from '@/types';

export async function getNewsData(company: string): Promise<NewsItem[]> {
  try {
    // Using Google News RSS feed (free alternative)
    const searchQuery = encodeURIComponent(`${company} stock`);
    const rssUrl = `https://news.google.com/rss/search?q=${searchQuery}&hl=en-US&gl=US&ceid=US:en`;
    
    // For this demo, we'll simulate news data since RSS parsing in browser has CORS issues
    // In a real implementation, you'd use a backend service to fetch and parse RSS
    const mockNews: NewsItem[] = [
      {
        title: `${company} Reports Strong Quarterly Earnings`,
        url: 'https://example.com/news1',
        publishedAt: new Date().toISOString(),
        source: 'Financial Times',
        snippet: `${company} has shown remarkable growth in the recent quarter with significant improvements in revenue and market position.`,
        sentiment: 'positive'
      },
      {
        title: `Market Analysis: ${company} Stock Performance`,
        url: 'https://example.com/news2',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: 'Reuters',
        snippet: `Analysts are divided on ${company}'s future prospects amid changing market conditions.`,
        sentiment: 'neutral'
      },
      {
        title: `Concerns Raised Over ${company} Market Strategy`,
        url: 'https://example.com/news3',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: 'Bloomberg',
        snippet: `Some investors express concerns about ${company}'s recent strategic decisions and their potential impact.`,
        sentiment: 'negative'
      }
    ];

    return mockNews;
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}

export function analyzeNewsSentiment(news: NewsItem[]): {
  overall: 'positive' | 'negative' | 'neutral';
  score: number;
  summary: string;
} {
  if (news.length === 0) {
    return {
      overall: 'neutral',
      score: 0,
      summary: 'No news data available for analysis.'
    };
  }

  const sentimentScores = news.map(item => {
    switch (item.sentiment) {
      case 'positive': return 1;
      case 'negative': return -1;
      default: return 0;
    }
  });

  const averageScore = sentimentScores.reduce((a: number, b: number) => a + b, 0) / sentimentScores.length;
  
  let overall: 'positive' | 'negative' | 'neutral';
  if (averageScore > 0.2) overall = 'positive';
  else if (averageScore < -0.2) overall = 'negative';
  else overall = 'neutral';

  const positiveCount = sentimentScores.filter(s => s > 0).length;
  const negativeCount = sentimentScores.filter(s => s < 0).length;
  const neutralCount = sentimentScores.filter(s => s === 0).length;

  const summary = `Analyzed ${news.length} news articles: ${positiveCount} positive, ${negativeCount} negative, ${neutralCount} neutral. Overall sentiment: ${overall}.`;

  return {
    overall,
    score: averageScore,
    summary
  };
}