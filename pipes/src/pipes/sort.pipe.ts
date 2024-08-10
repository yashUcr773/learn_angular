import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    standalone: true,
    pure: false
})
export class SortPipe implements PipeTransform {

    transform(value: string[] | number[], dir: 'asc' | 'dec' = 'asc') {
        const sorted = [...value];
        sorted.sort((a, b) => {
            if (a < b) {
                return dir === 'asc' ? -1 : 1;
            }
            if (a > b) {
                return dir === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sorted
    }

}
