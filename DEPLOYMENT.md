# 🚀 Deployment Guide

## Quick Start (Demo Mode)
```bash
npm install
npm run dev
# Visit http://localhost:3000 and enable Demo Mode
```

## Production Deployment

### 1. Local Production
```bash
npm run build
npm run start
```

### 2. Docker Deployment
```bash
# Build image
docker build -f Dockerfile.web -t llm-stock-analyzer-web .

# Run container
docker run -p 3000:3000 llm-stock-analyzer-web
```

### 3. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 4. Environment Variables (for real AI analysis)
Create `.env.local`:
```env
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AZURE_OPENAI_API_KEY=your-api-key
```

## Features
- ✅ **Demo Mode**: Test without API keys
- ✅ **Real AI Analysis**: With proper configuration
- ✅ **Responsive Design**: Works on all devices
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Modern UI**: DaisyUI components