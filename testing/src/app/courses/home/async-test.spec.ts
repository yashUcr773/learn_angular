import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { delay, of } from "rxjs";

describe('Async testing', () => {

    it('Async whith jasmine done', (done: DoneFn) => {
        let test = false
        setTimeout(() => {
            console.log('Async test complete')
            test = true
            expect(test).withContext('test should be true').toBeTruthy()
            done()
        }, 1000)
    });

    it('Async whith jasmine fake async', fakeAsync(() => {

        let test = false;
        setTimeout(() => {
            test = true;
        }, 1000);

        // tick(1000);
        flush();

        expect(test).withContext('test should be true').toBeTruthy();

    }));

    it('Async whith promise', fakeAsync(() => {

        let test = false;
        Promise.resolve().then(() => Promise.resolve()).then(() => { test = true; });

        flushMicrotasks()
        expect(test).withContext('test should be true').toBeTruthy();

    }));

    it('Async whith promise and settimeout', fakeAsync(() => {

        let counter = 0

        Promise.resolve().then(() => {
            counter += 10;
            setTimeout(() => {
                counter += 1;
            }, 1000);
        });

        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        flush();
        expect(counter).toBe(11);

    }));

    it('Async whith observables', fakeAsync(() => {

        let test = false
        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {
            test = true
        });

        tick(1000);

        expect(test).toBe(true);

    }));

})