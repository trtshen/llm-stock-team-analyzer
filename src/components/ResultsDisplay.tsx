'use client';

import { AnalysisResult } from '@/types';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export default function ResultsDisplay({ result, onNewAnalysis }: ResultsDisplayProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  const getDecisionBadge = (decision: string) => {
    const lowerDecision = decision.toLowerCase();
    if (lowerDecision.includes('buy')) {
      return <span className="badge badge-success badge-lg">BUY</span>;
    }
    if (lowerDecision.includes('sell')) {
      return <span className="badge badge-error badge-lg">SELL</span>;
    }
    return <span className="badge badge-warning badge-lg">HOLD</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-primary text-primary-content">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="card-title text-3xl">{result.ticker}</h2>
              <p className="text-primary-content/80">Analysis Date: {result.date}</p>
            </div>
            <div className="text-right">
              {getDecisionBadge(result.final_decision)}
              <div className={`text-lg font-bold ${getConfidenceColor(result.confidence_score || 5)}`}>
                Confidence: {result.confidence_score || 'N/A'}/10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Decision */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-xl">🎯 Final Trading Decision</h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-base-200 p-4 rounded">
              {result.final_decision}
            </pre>
          </div>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Analysis */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">📊 Market Analysis</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-base-200 p-4 rounded">
                {result.market_analysis}
              </pre>
            </div>
          </div>
        </div>

        {/* News Analysis */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">📰 News Analysis</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-base-200 p-4 rounded">
                {result.news_analysis}
              </pre>
            </div>
          </div>
        </div>

        {/* Bull Perspective */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">🐂 Bull Perspective</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-base-200 p-4 rounded">
                {result.bull_perspective}
              </pre>
            </div>
          </div>
        </div>

        {/* Bear Perspective */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">🐻 Bear Perspective</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-base-200 p-4 rounded">
                {result.bear_perspective}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* New Analysis Button */}
      <div className="flex justify-center">
        <button
          onClick={onNewAnalysis}
          className="btn btn-outline btn-primary"
        >
          🔄 New Analysis
        </button>
      </div>
    </div>
  );
}