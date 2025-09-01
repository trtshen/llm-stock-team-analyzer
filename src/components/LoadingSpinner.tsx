'use client';

interface LoadingSpinnerProps {
  message?: string;
  step?: string;
}

export default function LoadingSpinner({ message = "Analyzing...", step }: LoadingSpinnerProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <h3 className="text-xl font-bold">{message}</h3>
        {step && (
          <p className="text-base-content/70">{step}</p>
        )}
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="loading loading-dots loading-sm"></span>
            <span className="text-sm">Gathering market data...</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="loading loading-dots loading-sm"></span>
            <span className="text-sm">Analyzing news sentiment...</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="loading loading-dots loading-sm"></span>
            <span className="text-sm">Running bull/bear analysis...</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="loading loading-dots loading-sm"></span>
            <span className="text-sm">Synthesizing trading decision...</span>
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm">This analysis may take 1-2 minutes to complete as our AI agents collaborate.</span>
        </div>
      </div>
    </div>
  );
}