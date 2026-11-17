import { ChatOpenAI } from '@langchain/openai';
import { Embeddings, type EmbeddingsParams } from '@langchain/core/embeddings';

import config from '../config';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Fallback Chat Models
const fallbackChatModels = (config.openrouter_fallback_chat_models ?? '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

// OpenRouter Chat Model
const openRouterChatModel = new ChatOpenAI({
    model: config.opernrouter_chat_model,
    apiKey: config.openrouter_api_key,
    temperature: 0.2,

    modelKwargs: {
        models: [config.opernrouter_chat_model, ...fallbackChatModels],
    },

    configuration: {
        baseURL: OPENROUTER_BASE_URL,
        defaultHeaders: {
            'HTTP-Referer': config.frontend_url ?? 'http://localhost:3000',
            'X-Title': 'Physics Question Bank',
        },
    },
});

// Export Chat Model with Retry
export const chatModel = openRouterChatModel.withRetry({
    stopAfterAttempt: 3,
});

// OpenRouter Embedding Response
type TOpenRouterEmbeddingResponse = {
    data: {
        embedding: number[];
        index: number;
    }[];
};

// OpenRouter Embeddings
class OpenRouterEmbeddings extends Embeddings {
    private readonly model: string;
    private readonly apiKey: string;

    constructor(model: string, apiKey: string, params: EmbeddingsParams = {}) {
        super(params);

        this.model = model;
        this.apiKey = apiKey;
    }

    private async embed(input: string[]): Promise<number[][]> {
        if (input.length === 0) {
            return [];
        }

        const response = await fetch(`${OPENROUTER_BASE_URL}/embeddings`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.model,
                input,
                encoding_format: 'float',
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();

            throw new Error(
                `OpenRouter embeddings failed: ${response.status} ${errorMessage}`,
            );
        }

        const result = (await response.json()) as TOpenRouterEmbeddingResponse;

        if (!result.data || result.data.length !== input.length) {
            throw new Error(
                'OpenRouter returned an invalid embedding response.',
            );
        }

        return [...result.data]
            .sort((a, b) => a.index - b.index)
            .map((item) => item.embedding);
    }

    async embedDocuments(texts: string[]): Promise<number[][]> {
        return this.embed(texts);
    }

    async embedQuery(text: string): Promise<number[]> {
        const [vector] = await this.embed([text]);

        if (!vector) {
            throw new Error('OpenRouter failed to generate query embedding.');
        }

        return vector;
    }
}

// Export Embeddings
export const embeddings = new OpenRouterEmbeddings(
    config.openrouter_embedding_model,
    config.openrouter_api_key,
    {
        maxRetries: 3,
    },
);
