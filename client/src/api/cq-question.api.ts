import apiClient from '@/lib/apiClient';

import {
    ICreateCQQuestion,
    IUpdateCQQuestion,
    ICQQuestionQuery,
    ICQQuestionResponse,
} from '@/interface';

// Create CQ Question
export function createCQQuestion(payload: ICreateCQQuestion) {
    return apiClient('/cq-question', {
        method: 'POST',
        body: payload,
    });
}

// Get All CQ Questions
export function getAllCQQuestions(
    params?: ICQQuestionQuery,
): Promise<ICQQuestionResponse> {
    const queryParams = new URLSearchParams();

    if (params?.searchTerm) {
        queryParams.set('searchTerm', params.searchTerm);
    }

    if (params?.chapterId) {
        queryParams.set('chapterId', params.chapterId);
    }

    if (params?.stimulusId) {
        queryParams.set('stimulusId', params.stimulusId);
    }

    if (params?.difficulty) {
        queryParams.set('difficulty', params.difficulty);
    }

    if (params?.status) {
        queryParams.set('status', params.status);
    }

    if (params?.isPremium !== undefined) {
        queryParams.set('isPremium', String(params.isPremium));
    }

    if (params?.page !== undefined) {
        queryParams.set('page', String(params.page));
    }

    if (params?.limit !== undefined) {
        queryParams.set('limit', String(params.limit));
    }

    const queryString = queryParams.toString();

    return apiClient(`/cq-question${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    });
}

// Update CQ Question
export function updateCQQuestion(id: string, payload: IUpdateCQQuestion) {
    return apiClient(`/cq-question/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

// Delete CQ Question
export function deleteCQQuestion(id: string) {
    return apiClient(`/cq-question/${id}`, {
        method: 'DELETE',
    });
}
