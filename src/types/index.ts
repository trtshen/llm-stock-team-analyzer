export interface AnalysisConfig {
  llm: {
    temperature: number;
    max_tokens: number;
    retry: number;
    max_debate_rounds: number;
    request_timeout: number;
    retry_delay: number;
    max_retries: number;
  };
  azure_openai: {
    endpoint: string;
    api_version: string;
    deployment: string;
    subscription_key: string;
  };
  rate_limiting: {
    enabled: boolean;
    requests_per_minute: number;
    tokens_per_minute: number;
    delay_between_requests: number;
  };
}

export interface AnalysisRequest {
  ticker: string;
  analysis_date: string;
}

export interface AgentState {
  messages: Array<{role: string; content: string}>;
  company_of_interest: string;
  trade_date: string;
  market_report: string;
  news_report: string;
  investment_plan: string;
  investment_debate_state: {
    history: string;
    current_response: string;
    count: number;
    bull_history: string;
    bear_history: string;
    judge_decision: string;
  };
}

export interface AnalysisResult {
  ticker: string;
  date: string;
  market_analysis: string;
  news_analysis: string;
  bull_perspective: string;
  bear_perspective: string;
  final_decision: string;
  confidence_score?: number;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  indicators?: {
    rsi?: number;
    sma?: number;
    ema?: number;
    macd?: number;
  };
}

export interface NewsItem {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  snippet?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}