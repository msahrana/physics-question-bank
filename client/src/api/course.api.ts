import apiClient from '@/lib/apiClient';

import {
    ICreateCourse,
    ICourseQuery,
    ICourseResponse,
    ISingleCourseResponse,
} from '@/interface';

// Create Course
export function createCourse(
    payload: ICreateCourse,
): Promise<ISingleCourseResponse> {
    return apiClient('/course', {
        method: 'POST',
        body: payload,
    });
}

// Get All Courses
export function getAllCourses(params?: ICourseQuery): Promise<ICourseResponse> {
    const queryParams = new URLSearchParams();

    if (params?.searchTerm) {
        queryParams.set('searchTerm', params.searchTerm);
    }

    if (params?.accessType) {
        queryParams.set('accessType', params.accessType);
    }

    if (params?.isPublished) {
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

    return apiClient(`/course${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    });
}

// Get Single Course
export function getSingleCourse(id: string): Promise<ISingleCourseResponse> {
    return apiClient(`/course/${id}`, {
        method: 'GET',
    });
}

// Update Course
export function updateCourse(
    id: string,
    payload: Partial<ICreateCourse>,
): Promise<ISingleCourseResponse> {
    return apiClient(`/course/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

// Delete Course
export function deleteCourse(id: string) {
    return apiClient(`/course/${id}`, {
        method: 'DELETE',
    });
}
