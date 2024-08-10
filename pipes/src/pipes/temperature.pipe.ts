import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temperature',
    standalone: true,

})

export class TemperaturePipe implements PipeTransform {

    transform(value: number | string, inputType: 'celsius' | 'fahrenheit' = 'celsius', outputType?: 'celsius' | 'fahrenheit'): string {
        
        let val: number = typeof value === 'string' ? parseFloat(value) : value;

        if (inputType === 'celsius' && outputType === 'fahrenheit') {
            val = (val * 9 / 5) + 32;
        } else if (inputType === 'fahrenheit' && outputType === 'celsius') {
            val = (val - 32) * 5 / 9;
        }

        return `${val.toFixed(2)} °${outputType === 'celsius' ? 'C' : 'F'}`;

    }

}