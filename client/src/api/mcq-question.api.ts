import apiClient from '@/lib/apiClient';

import {
    ICreateMCQQuestion,
    IUpdateMCQQuestion,
    IBulkCreateMCQQuestion,
    IMCQQuestionQuery,
} from '@/interface';

// Create
export function createMCQQuestion(payload: ICreateMCQQuestion) {
    return apiClient('/mcq-question', {
        method: 'POST',
        body: payload,
    });
}

// Bulk Create
export function createMCQQuestionBulk(payload: IBulkCreateMCQQuestion) {
    return apiClient('/mcq-question/bulk', {
        method: 'POST',
        body: payload,
    });
}

// Get All
export function getAllMCQQuestions(params?: IMCQQuestionQuery) {
    const queryParams = new URLSearchParams();

    if (params?.searchTerm) queryParams.set('searchTerm', params.searchTerm);
    if (params?.chapterId) queryParams.set('chapterId', params.chapterId);
    if (params?.stimulusId) queryParams.set('stimulusId', params.stimulusId);
    if (params?.difficulty) queryParams.set('difficulty', params.difficulty);
    if (params?.status) queryParams.set('status', params.status);

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

    return apiClient(`/mcq-question${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    });
}

// Update
export function updateMCQQuestion(id: string, payload: IUpdateMCQQuestion) {
    return apiClient(`/mcq-question/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

// Delete
export function deleteMCQQuestion(id: string) {
    return apiClient(`/mcq-question/${id}`, {
        method: 'DELETE',
    });
}
