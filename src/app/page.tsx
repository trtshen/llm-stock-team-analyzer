'use client';

import { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AnalysisRequest, AnalysisResult } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const handleAnalysisSubmit = async (request: AnalysisRequest) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const endpoint = demoMode ? '/api/demo' : '/api/analyze';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">🔍 LLM Stock Team Analyzer</h1>
            <p className="py-6 text-lg">
              AI-Powered Multi-Agent Stock Analysis Framework
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <div className="badge badge-outline">Market Analyst</div>
              <div className="badge badge-outline">News Analyst</div>
              <div className="badge badge-outline">Bull Researcher</div>
              <div className="badge badge-outline">Bear Researcher</div>
              <div className="badge badge-outline">Trader</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <div>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {!result && !isLoading && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Demo Mode Toggle */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      <span className="font-semibold">Demo Mode</span>
                      <div className="text-xs text-base-content/70">
                        Use mock data instead of real AI analysis (no API keys required)
                      </div>
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={demoMode}
                      onChange={(e) => setDemoMode(e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <AnalysisForm onSubmit={handleAnalysisSubmit} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner message="Running AI Analysis" />
          </div>
        )}

        {result && !isLoading && (
          <div className="max-w-6xl mx-auto">
            <ResultsDisplay result={result} onNewAnalysis={handleNewAnalysis} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div>
          <p className="font-bold">
            LLM Stock Team Analyzer
          </p>
          <p>AI-powered investment analysis • Local deployment for data security</p>
          <p className="text-sm opacity-70">
            ⚠️ Not financial advice. For educational purposes only.
          </p>
        </div>
      </footer>
    </main>
  );
}