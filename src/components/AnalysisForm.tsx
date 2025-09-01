'use client';

import { useState } from 'react';
import { AnalysisRequest } from '@/types';

interface AnalysisFormProps {
  onSubmit: (request: AnalysisRequest) => void;
  isLoading: boolean;
}

export default function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [ticker, setTicker] = useState('AAPL');
  const [analysisDate, setAnalysisDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker && analysisDate) {
      onSubmit({
        ticker: ticker.toUpperCase(),
        analysis_date: analysisDate,
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl">🔍 Stock Analysis</h2>
        <p className="text-base-content/70">
          Enter a stock ticker and date to analyze market sentiment and trading opportunities.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Stock Ticker</span>
            </label>
            <input
              type="text"
              placeholder="Enter ticker (e.g., AAPL)"
              className="input input-bordered input-primary w-full"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              maxLength={10}
              pattern="[A-Z]{1,10}"
              required
            />
            <label className="label">
              <span className="label-text-alt">Enter 1-10 uppercase letters</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Analysis Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered input-primary w-full"
              value={analysisDate}
              onChange={(e) => setAnalysisDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
            <label className="label">
              <span className="label-text-alt">Choose a date for historical analysis</span>
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || !ticker || !analysisDate}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Analyzing...
                </>
              ) : (
                '🚀 Start Analysis'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}