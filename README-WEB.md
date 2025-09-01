# 🔍 LLM Stock Team Analyzer - Web Version

AI-Powered Multi-Agent Stock Analysis Framework with Modern Web UI

[![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-blue.svg)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5+-green.svg)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎯 Multi-Agent AI Analysis
- **Market Analyst** - Technical analysis using Yahoo Finance data
- **News Analyst** - Sentiment analysis from news sources
- **Bull Researcher** - Optimistic investment perspective
- **Bear Researcher** - Risk-focused investment perspective  
- **Trader** - Final trading decision synthesis

### 🌐 Modern Web Interface
- **React Frontend** - Responsive, accessible UI built with React 19
- **DaisyUI Components** - Beautiful, customizable UI components
- **Real-time Analysis** - Interactive stock analysis with live results
- **Demo Mode** - Try the interface without API configuration

### 🏗️ Technical Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **AI Integration**: OpenAI API with Azure support
- **Data Sources**: Yahoo Finance API, News APIs
- **Deployment**: Fully local or cloud-deployable

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Azure OpenAI API access (optional - demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/trtshen/llm-stock-team-analyzer.git
   cd llm-stock-team-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional for demo)**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Azure OpenAI credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

Create a `.env.local` file with your Azure OpenAI credentials:

```env
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AZURE_OPENAI_API_KEY=your-api-key
```

## 📱 Usage

### Web Interface
1. Open the application in your browser
2. Toggle **Demo Mode** to try without API configuration
3. Enter a stock ticker (e.g., AAPL, GOOGL, MSFT)
4. Select an analysis date
5. Click **🚀 Start Analysis**
6. Review the comprehensive AI-generated analysis

### Analysis Components
The system provides analysis from five specialized AI agents:
- 📊 **Market Analysis**: Technical indicators and price action
- 📰 **News Analysis**: Sentiment and market impact assessment  
- 🐂 **Bull Research**: Growth opportunities and positive catalysts
- 🐻 **Bear Research**: Risk factors and potential challenges
- 🎯 **Trading Decision**: Synthesized recommendation with confidence score

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── analyze/       # Real AI analysis endpoint
│   │   └── demo/          # Demo mode endpoint
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AnalysisForm.tsx   # Stock input form
│   ├── ResultsDisplay.tsx # Analysis results display
│   └── LoadingSpinner.tsx # Loading states
├── lib/                   # Core business logic
│   ├── agents/            # AI agent implementations
│   ├── config/            # Configuration management
│   └── utils/             # Utility functions
└── types/                 # TypeScript type definitions
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript compilation check
```

## 📈 Demo Mode

Try the application without any configuration:
1. Enable **Demo Mode** toggle on the main page
2. Enter any stock ticker
3. Experience the full UI with realistic mock data
4. Perfect for testing and demonstrations

## ⚠️ Disclaimer

This software is for educational and research purposes only. It is not intended as financial advice. Always consult with qualified financial professionals before making investment decisions.

## 🔗 Migration Notes

This is a complete rewrite of the original Python version using modern web technologies:
- **Original Python Version**: Available in `python-backup/` directory
- **New Web Version**: Built with Next.js + React + TypeScript
- **Same Core Functionality**: Maintains all analysis capabilities in a web-friendly format

---

**Built with ❤️ using Next.js, React, TypeScript, and modern web technologies.**