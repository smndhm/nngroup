// Mock api calls
import apiCoursesScheduleResponse from './api-courses-schedule.json';
import { http, HttpResponse } from 'msw';

const savedCoursesIds = new Set([1, 2, 3, 4, 5]);

export const handlers = [
    // Intercept GET API requests
    http.get('api/courses/:id/schedule', () => HttpResponse.json(apiCoursesScheduleResponse)),
    http.get('api/profile/saved/courses/:id', () => {
        return HttpResponse.json(savedCoursesIds)
    }),
    // Intercept POST API requests
    http.post('api/profile/saved/courses/:id', ({ params }) => {
        savedCoursesIds.add(parseInt(params.id as string));
        return HttpResponse.json(Array.from(savedCoursesIds))
    }),
    // Intercept DELETE API requests
    http.delete('api/profile/saved/courses/:id', ({ params }) => {
        savedCoursesIds.delete(parseInt(params.id as string));
        return HttpResponse.json(Array.from(savedCoursesIds))
    }),
];