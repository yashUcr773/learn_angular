import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CoursesService } from "./courses.service";
import { COURSES, findLessonsForCourse, LESSONS } from "../../../../server/db-data";
import { provideHttpClient } from "@angular/common/http";
import { Course } from "../model/course";

describe('CoursesService', () => {

    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CoursesService,
                provideHttpClient(),
                provideHttpClientTesting(),  // Correct use of provideHttpClientTesting
            ]
        });
        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should get all courses', () => {

        // check the response of the service here
        coursesService.findAllCourses().subscribe(courses => {
            expect(courses).withContext('Should return some courses').toBeTruthy();
            expect(courses.length).withContext('Should return correct length of courses').toBe(12);

            const course = courses.find(course => course.id === 12);
            expect(course?.titles?.description).withContext('Should return correct course').toBe('Angular Testing Course');

        });

        // check the request made by the service here
        const req = httpTestingController.expectOne('/api/courses');
        expect(req.request.method).withContext('Should make a GET request').toBe('GET');

        // respond with the courses data / dummy data
        req.flush({
            payload: Object.values(COURSES)
        });

    });

    it('should get course by id', () => {

        const courseId = 10;

        // check the response of the service here
        coursesService.findCourseById(courseId).subscribe(course => {
            expect(course).withContext('Should return course').toBeTruthy();
            expect(course.id).withContext('Should return course with correct id').toBe(courseId);
        });

        // check the request made by the service here
        const req = httpTestingController.expectOne('/api/courses/' + courseId);
        expect(req.request.method).withContext('Should make a GET request').toBe('GET');

        // respond with the courses data / dummy data
        req.flush(COURSES[courseId]);

    });

    it('should get save the course', () => {

        const courseId = 10;
        const updatedContent: Partial<Course> = {
            titles: {
                description: 'Testing Course'
            }
        }

        // check the response of the service here
        coursesService.saveCourse(courseId, updatedContent).subscribe(course => {
            expect(course).withContext('Should return course').toBeTruthy();
            expect(course.id).withContext('Should return course with correct id').toBe(courseId);
            expect(course.titles.description).withContext('The update should be present in course').toBe(course.titles.description);
        });

        // check the request made by the service here
        const req = httpTestingController.expectOne('/api/courses/' + courseId);
        expect(req.request.method).withContext('Should make a PUT request').toBe('PUT');
        expect(req.request.body.titles.description).withContext('Should send correct course data').toBe(updatedContent.titles?.description);

        // respond with the courses data / dummy data
        req.flush({ ...COURSES[courseId], ...updatedContent });

    });

    it('should give an error save course fails', () => {

        const courseId = 10;
        const updatedContent: Partial<Course> = {
            titles: {
                description: 'Testing Course'
            }
        }

        coursesService.saveCourse(courseId, updatedContent).subscribe({
            next: () => fail('The save course operation should have failed'),
            error: error => {
                expect(error).withContext('The error should be present').toBeTruthy()
                expect(error.status).withContext('The error should have status').toBe(500)
            }
        })

        const req = httpTestingController.expectOne('/api/courses/' + courseId);
        expect(req.request.method).withContext('Should make a PUT request').toBe('PUT');
        req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    });

    it('should give the lessons of a course', () => {

        const courseId = 10;
        const filter = ""
        const sortOrder = "asc"
        const pageNumber = 0
        const pageSize = 3

        coursesService.findLessons(courseId, filter, sortOrder, pageNumber, pageSize).subscribe(lessons => {
            expect(lessons).withContext('Should return course').toBeTruthy();
            expect(lessons.length).withContext('Should return correct number of lessons').toBe(findLessonsForCourse(courseId).slice(0, pageSize).length);
        });

        const req = httpTestingController.expectOne(req => req.url.includes('/api/lessons'));
        expect(req.request.method).withContext('Should make a PUT request').toBe('GET');
        expect(req.request.params.get('courseId')).withContext('Should send correct course data').toBe(courseId.toString());
        expect(req.request.params.get('filter')).withContext('Should send correct course data').toBe(filter.toString());
        expect(req.request.params.get('sortOrder')).withContext('Should send correct course data').toBe(sortOrder.toString());
        expect(req.request.params.get('pageNumber')).withContext('Should send correct course data').toBe(pageNumber.toString());
        expect(req.request.params.get('pageSize')).withContext('Should send correct course data').toBe(pageSize.toString());

        req.flush({ payload: findLessonsForCourse(courseId).slice(0, pageSize) });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
