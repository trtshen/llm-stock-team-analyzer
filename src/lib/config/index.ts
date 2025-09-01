import { AnalysisConfig } from '@/types';

const defaultConfig: AnalysisConfig = {
  llm: {
    temperature: 0.5,
    max_tokens: 4096,
    retry: 3,
    max_debate_rounds: 2,
    request_timeout: 60,
    retry_delay: 60,
    max_retries: 3,
  },
  azure_openai: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    api_version: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT || '',
    subscription_key: process.env.AZURE_OPENAI_API_KEY || '',
  },
  rate_limiting: {
    enabled: true,
    requests_per_minute: 5,
    tokens_per_minute: 20000,
    delay_between_requests: 12,
  },
};

export function getConfig(): AnalysisConfig {
  return {
    ...defaultConfig,
    azure_openai: {
      ...defaultConfig.azure_openai,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT || defaultConfig.azure_openai.endpoint,
      api_version: process.env.AZURE_OPENAI_API_VERSION || defaultConfig.azure_openai.api_version,
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT || defaultConfig.azure_openai.deployment,
      subscription_key: process.env.AZURE_OPENAI_API_KEY || defaultConfig.azure_openai.subscription_key,
    },
  };
}

export function validateConfig(config: AnalysisConfig): boolean {
  return !!(
    config.azure_openai.endpoint &&
    config.azure_openai.deployment &&
    config.azure_openai.subscription_key
  );
}