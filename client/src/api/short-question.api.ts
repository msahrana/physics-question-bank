import apiClient from '@/lib/apiClient';

import {
    ICreateShortQuestion,
    IBulkCreateShortQuestion,
    IShortQuestionQuery,
    IUpdateShortQuestion,
    IShortQuestionResponse,
    ISingleShortQuestionResponse,
} from '@/interface';

// Create Short Question
export function createShortQuestion(payload: ICreateShortQuestion) {
    return apiClient('/short-question', {
        method: 'POST',
        body: payload,
    });
}

// Bulk Create Short Questions
export function createShortQuestionBulk(payload: IBulkCreateShortQuestion) {
    return apiClient('/short-question/bulk', {
        method: 'POST',
        body: payload,
    });
}

// Get All Short Questions
export function getAllShortQuestions(
    params?: IShortQuestionQuery,
): Promise<IShortQuestionResponse> {
    const query = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.append(key, String(value));
            }
        });
    }

    const queryString = query.toString();

    return apiClient(`/short-question${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    });
}

// Get Single Short Question
export function getSingleShortQuestion(
    id: string,
): Promise<ISingleShortQuestionResponse> {
    return apiClient(`/short-question/${id}`, {
        method: 'GET',
    });
}

// Update Short Question
export function updateShortQuestion(id: string, payload: IUpdateShortQuestion) {
    return apiClient(`/short-question/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

// Delete Short Question
export function deleteShortQuestion(id: string) {
    return apiClient(`/short-question/${id}`, {
        method: 'DELETE',
    });
}
