import { CalculatorService } from "./calculator.service";
import { TestBed } from '@angular/core/testing'
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculatorService: CalculatorService;
    let loggerSpy: jasmine.SpyObj<LoggerService>;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });

        calculatorService = TestBed.inject(CalculatorService);
    });

    it('should add two numbers', () => {

        const result = calculatorService.add(4, 7);
        expect(result).withContext('Addition Failed').toBe(11);
        expect(loggerSpy.log).withContext('Logger invoked multiple times').toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {

        const result = calculatorService.subtract(4, 7);
        expect(result).withContext('Subtraction Failed').toBe(-3);
        expect(loggerSpy.log).withContext('Logger invoked multiple times').toHaveBeenCalledTimes(1);

    });

})