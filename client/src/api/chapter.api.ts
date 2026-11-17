import apiClient from '@/lib/apiClient';

import {
    ICreateChapter,
    IChapterQuery,
    IChapterResponse,
    ISingleChapterResponse,
    IUpdateChapter,
} from '@/interface';

// Create Chapter
export function createChapter(
    payload: ICreateChapter,
): Promise<ISingleChapterResponse> {
    return apiClient('/chapter', {
        method: 'POST',
        body: payload,
    });
}

// Get All Chapters
export function getAllChapters(
    params?: IChapterQuery,
): Promise<IChapterResponse> {
    const queryParams = new URLSearchParams();

    if (params?.courseId) {
        queryParams.set('courseId', params.courseId);
    }

    if (params?.searchTerm) {
        queryParams.set('searchTerm', params.searchTerm);
    }

    if (params?.isPublished !== undefined) {
        queryParams.set('isPublished', params.isPublished);
    }

    if (params?.page !== undefined) {
        queryParams.set('page', String(params.page));
    }

    if (params?.limit !== undefined) {
        queryParams.set('limit', String(params.limit));
    }

    if (params?.sortOrder) {
        queryParams.set('sortOrder', params.sortOrder);
    }

    const queryString = queryParams.toString();

    return apiClient(`/chapter${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    });
}

// Get Single Chapter
export function getSingleChapter(id: string): Promise<ISingleChapterResponse> {
    return apiClient(`/chapter/${id}`, {
        method: 'GET',
    });
}

// Update Chapter
export function updateChapter(
    id: string,
    payload: IUpdateChapter,
): Promise<ISingleChapterResponse> {
    return apiClient(`/chapter/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

// Delete Chapter
export function deleteChapter(id: string) {
    return apiClient(`/chapter/${id}`, {
        method: 'DELETE',
    });
}
