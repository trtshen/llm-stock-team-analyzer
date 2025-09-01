import yahooFinance from 'yahoo-finance2';
import { StockData } from '@/types';

export async function getStockData(symbol: string): Promise<StockData | null> {
  try {
    const quote = await yahooFinance.quote(symbol);
    const historical = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      period2: new Date(),
      interval: '1d',
    });

    if (!quote || !historical || historical.length === 0) {
      return null;
    }

    const latestPrice = historical[historical.length - 1];
    const previousPrice = historical[historical.length - 2];
    
    const change = latestPrice.close - (previousPrice?.close || latestPrice.close);
    const changePercent = ((change / (previousPrice?.close || latestPrice.close)) * 100);

    // Calculate basic technical indicators
    const prices = historical.map(h => h.close);
    const rsi = calculateRSI(prices);
    const sma = calculateSMA(prices, 20);
    const ema = calculateEMA(prices, 20);

    return {
      symbol: symbol.toUpperCase(),
      price: latestPrice.close,
      change,
      changePercent,
      volume: latestPrice.volume || 0,
      marketCap: quote.marketCap,
      indicators: {
        rsi,
        sma,
        ema,
      },
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
}

function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = prices.length - period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;
  
  return 100 - (100 / (1 + rs));
}

function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1];
  
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

function calculateEMA(prices: number[], period: number): number {
  if (prices.length === 0) return 0;
  if (prices.length === 1) return prices[0];
  
  const multiplier = 2 / (period + 1);
  let ema = prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
  }
  
  return ema;
}