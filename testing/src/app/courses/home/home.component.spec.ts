import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { DebugElement } from "@angular/core";
import { CoursesModule } from "../courses.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CoursesService } from "../services/courses.service";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let coursesService: CoursesService;
    const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
    const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

    beforeEach(waitForAsync(() => {

        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

        TestBed.configureTestingModule({
            imports: [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CoursesService,
                    useValue: coursesServiceSpy
                }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            coursesService = TestBed.inject(CoursesService);
        });

    }));

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should display only beginner courses", () => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(beginnerCourses));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(1);
        expect(tabs[0].nativeElement.textContent).withContext('Should have correct tab name').toContain("Beginners");

    });

    it("should display only advanced courses", () => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(advancedCourses));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(1);
        expect(tabs[0].nativeElement.textContent).withContext('Should have correct tab name').toContain("Advanced");

    });

    it("should display both tabs", () => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(2);
        expect(tabs[0].nativeElement.textContent).withContext('Should have correct tab name').toContain("Beginners");
        expect(tabs[1].nativeElement.textContent).withContext('Should have correct tab name').toContain("Advanced");

    });

    it("should display advanced courses when tab clicked", (done: DoneFn) => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(2);
        tabs[1].nativeElement.click();
        fixture.detectChanges();

        setTimeout(() => {
            const cardTitles = el.queryAll(By.css(".mat-mdc-card-title"));
            expect(cardTitles.length).withContext("No Course Found").toBeGreaterThan(0);
            expect(cardTitles[0].nativeElement.textContent).withContext('First Course name should match').toContain("Angular Testing Course");
            done();
        }, 500)

    });

    it("should display advanced courses when tab clicked - improved", fakeAsync(() => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(2);
        tabs[1].nativeElement.click();
        fixture.detectChanges();

        flush();
        const cardTitles = el.queryAll(By.css(".mat-mdc-card-title"));
        expect(cardTitles.length).withContext("No Course Found").toBeGreaterThan(0);
        expect(cardTitles[0].nativeElement.textContent).withContext('First Course name should match').toContain("Angular Testing Course");

    }));

    it("should display advanced courses when tab clicked - improved - 2", waitForAsync(() => {

        (coursesService.findAllCourses as jasmine.Spy).and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));
        expect(tabs.length).withContext("Unexpected number of tabs found").toBe(2);
        tabs[1].nativeElement.click();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const cardTitles = el.queryAll(By.css(".mat-mdc-card-title"));
            expect(cardTitles.length).withContext("No Course Found").toBeGreaterThan(0);
            expect(cardTitles[0].nativeElement.textContent).withContext('First Course name should match').toContain("Angular Testing Course");
        });

    }));

});


