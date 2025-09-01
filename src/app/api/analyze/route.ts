import { NextRequest, NextResponse } from 'next/server';
import { TradingAgentsOrchestrator } from '@/lib/tradingOrchestrator';
import { validateConfig, getConfig } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    const config = getConfig();
    if (!validateConfig(config)) {
      return NextResponse.json(
        { error: 'Invalid configuration. Please check your Azure OpenAI credentials.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { ticker, analysis_date } = body;

    // Validate input
    if (!ticker || !analysis_date) {
      return NextResponse.json(
        { error: 'Missing required fields: ticker and analysis_date' },
        { status: 400 }
      );
    }

    // Validate ticker format (basic check)
    if (!/^[A-Z]{1,10}$/.test(ticker.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid ticker format. Must be 1-10 uppercase letters.' },
        { status: 400 }
      );
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(analysis_date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Must be YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Run analysis
    const orchestrator = new TradingAgentsOrchestrator();
    const result = await orchestrator.runAnalysis({
      ticker: ticker.toUpperCase(),
      analysis_date,
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again or check your configuration.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Stock analysis API endpoint. Use POST with ticker and analysis_date.',
      example: {
        ticker: 'AAPL',
        analysis_date: '2024-12-31'
      }
    },
    { status: 200 }
  );
}