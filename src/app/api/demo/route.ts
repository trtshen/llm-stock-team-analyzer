import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker, analysis_date } = body;

    // Validate input
    if (!ticker || !analysis_date) {
      return NextResponse.json(
        { error: 'Missing required fields: ticker and analysis_date' },
        { status: 400 }
      );
    }

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock analysis result
    const mockResult: AnalysisResult = {
      ticker: ticker.toUpperCase(),
      date: analysis_date,
      market_analysis: `**Market Analysis for ${ticker.toUpperCase()}**

**Technical Overview:**
- Current Price: $150.25 (+2.4%)
- RSI (14): 58.2 (Neutral momentum)
- SMA(20): $147.80 (Price above moving average - Bullish)
- Volume: 45.2M (Above average trading activity)

**Key Technical Levels:**
- Support: $145.00, $142.50
- Resistance: $155.00, $160.00

**Momentum Analysis:**
The stock is showing healthy upward momentum with price trading above key moving averages. RSI indicates room for further upside without being overbought. Volume confirms buying interest.

**Short-term Outlook:**
Technical indicators suggest continued strength with potential for testing $155 resistance level.`,

      news_analysis: `**News Sentiment Analysis for ${ticker.toUpperCase()}**

**Overall Sentiment:** Positive (Score: +0.65)

**Key News Themes:**
- Strong quarterly earnings performance (+15% revenue growth)
- Positive analyst upgrades from major institutions
- Product innovation announcements driving investor optimism
- Market expansion in emerging sectors

**Sentiment Breakdown:**
- Positive: 4 articles (67%)
- Neutral: 2 articles (33%)
- Negative: 0 articles (0%)

**Market Impact Assessment:**
News flow is predominantly positive with earnings beat and forward guidance raise driving institutional buying. Social media sentiment also trending positive. No major negative catalysts identified in recent coverage.`,

      bull_perspective: `**Bull Case for ${ticker.toUpperCase()}**

**Growth Catalysts:**
1. **Revenue Acceleration**: 15% YoY growth with expanding margins
2. **Market Leadership**: Dominant position in key growth segments
3. **Innovation Pipeline**: Strong R&D investments paying off
4. **Financial Strength**: Robust balance sheet with $50B+ cash

**Technical Bullish Signals:**
- Breakout above 200-day moving average
- Golden cross formation (50-day above 200-day MA)
- Increasing volume on price advances
- Momentum oscillators turning positive

**Upside Scenarios:**
- **Conservative Target**: $165 (+10% upside)
- **Optimistic Target**: $180 (+20% upside)
- **Bull Case Target**: $200 (+33% upside)

**Key Advantages:**
- Strong competitive moat and brand recognition
- Expanding addressable market opportunity
- Operational efficiency improvements driving margin expansion`,

      bear_perspective: `**Bear Case for ${ticker.toUpperCase()}**

**Risk Factors:**
1. **Valuation Concerns**: Trading at premium multiples (P/E: 28x)
2. **Market Saturation**: Core markets showing signs of maturity
3. **Competitive Pressure**: Increasing competition from emerging players
4. **Economic Sensitivity**: Vulnerable to broader economic downturn

**Technical Warning Signs:**
- Recent high volume selling on any pullbacks
- Approaching key resistance levels that have held historically
- Divergence in momentum indicators vs. price action

**Downside Scenarios:**
- **Support Break**: $140 (-7% downside)
- **Bear Case**: $125 (-17% downside)
- **Worst Case**: $110 (-27% downside)

**Key Concerns:**
- High expectations priced in leaving little room for disappointment
- Regulatory headwinds in key markets
- Supply chain disruption risks
- Currency exposure in international markets`,

      final_decision: `**TRADING RECOMMENDATION: BUY**

**Confidence Level: 7/10**

**Decision Rationale:**
After comprehensive analysis from our multi-agent framework, the evidence supports a BUY recommendation for ${ticker.toUpperCase()}:

**Key Factors:**
✅ Strong technical momentum with price above key moving averages
✅ Positive news sentiment with earnings beat and guidance raise
✅ Bull case outweighs bear concerns based on fundamental strength
✅ Healthy volume patterns supporting the upward move

**Position Sizing:** 3-5% of portfolio (moderate allocation)

**Risk Management:**
- Stop Loss: $142.50 (5% below current support)
- Take Profit: $165.00 (initial target)
- Time Horizon: 3-6 months

**Key Catalysts to Watch:**
- Quarterly earnings calls
- Product launch announcements
- Regulatory developments
- Broader market sentiment shifts

**Action Plan:**
Consider entering position on any pullback to $147-148 support zone for better risk/reward ratio.`,

      confidence_score: 7,
    };

    return NextResponse.json(mockResult);

  } catch (error) {
    console.error('Demo analysis API error:', error);
    return NextResponse.json(
      { error: 'Demo analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Demo stock analysis API endpoint. Use POST with ticker and analysis_date.',
      note: 'This endpoint provides mock analysis results for demonstration purposes.',
      example: {
        ticker: 'AAPL',
        analysis_date: '2024-12-31'
      }
    },
    { status: 200 }
  );
}