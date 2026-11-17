import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createCourse, getAllCourses, updateCourse, deleteCourse } from '@/api';
import { ICreateCourse, ICourseQuery, IUpdateCourse } from '@/interface';

// Create Course
export function useCreateCourse() {
    return useMutation({
        mutationFn: (payload: ICreateCourse) => createCourse(payload),
    });
}

// Get All Courses
export function useSuspenseGetAllCourses(params?: ICourseQuery) {
    return useSuspenseQuery({
        queryKey: ['courses', params],
        queryFn: () => getAllCourses(params),
    });
}

// Update Course
export function useUpdateCourse() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: IUpdateCourse }) =>
            updateCourse(id, payload),
    });
}

// Delete Course
export function useDeleteCourse() {
    return useMutation({
        mutationFn: (id: string) => deleteCourse(id),
    });
}
