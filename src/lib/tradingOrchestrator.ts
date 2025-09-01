import { MarketAnalyst } from './agents/marketAnalyst';
import { NewsAnalyst } from './agents/newsAnalyst';
import { BullResearcher, BearResearcher } from './agents/researchers';
import { Trader } from './agents/trader';
import { getStockData } from './utils/stockData';
import { getNewsData } from './utils/newsData';
import { AnalysisRequest, AnalysisResult } from '@/types';

export class TradingAgentsOrchestrator {
  private marketAnalyst: MarketAnalyst;
  private newsAnalyst: NewsAnalyst;
  private bullResearcher: BullResearcher;
  private bearResearcher: BearResearcher;
  private trader: Trader;

  constructor() {
    this.marketAnalyst = new MarketAnalyst();
    this.newsAnalyst = new NewsAnalyst();
    this.bullResearcher = new BullResearcher();
    this.bearResearcher = new BearResearcher();
    this.trader = new Trader();
  }

  async runAnalysis(request: AnalysisRequest): Promise<AnalysisResult> {
    const { ticker, analysis_date } = request;

    try {
      // Step 1: Gather market data
      console.log(`🔍 Fetching market data for ${ticker}...`);
      const stockData = await getStockData(ticker);
      
      if (!stockData) {
        throw new Error(`Failed to fetch stock data for ${ticker}`);
      }

      // Step 2: Gather news data
      console.log(`📰 Fetching news data for ${ticker}...`);
      const newsData = await getNewsData(ticker);

      // Step 3: Market Analysis
      console.log(`📊 Running market analysis...`);
      const marketAnalysis = await this.marketAnalyst.analyze(stockData, ticker);

      // Step 4: News Analysis
      console.log(`📰 Running news analysis...`);
      const newsAnalysis = await this.newsAnalyst.analyze(newsData, ticker);

      // Step 5: Bull Research
      console.log(`🐂 Running bull research...`);
      const bullAnalysis = await this.bullResearcher.analyze(marketAnalysis, newsAnalysis, ticker);

      // Step 6: Bear Research
      console.log(`🐻 Running bear research...`);
      const bearAnalysis = await this.bearResearcher.analyze(marketAnalysis, newsAnalysis, ticker);

      // Step 7: Final Trading Decision
      console.log(`🎯 Synthesizing final trading decision...`);
      const finalResult = await this.trader.synthesizeDecision(
        marketAnalysis,
        newsAnalysis,
        bullAnalysis,
        bearAnalysis,
        ticker,
        analysis_date
      );

      console.log(`✅ Analysis complete for ${ticker}`);
      return finalResult;

    } catch (error) {
      console.error('Error in trading analysis:', error);
      throw error;
    }
  }
}