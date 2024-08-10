import { Directive, ElementRef, inject, Input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onClick($event)'
    }
})
export class SafeLinkDirective {

    @Input({ alias: 'appSafeLink' }) queryParam: string = 'myapp';
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    onClick(event: MouseEvent) {
        const wantsToLeave = window.confirm('Are you sure you want to navigate to ' + this.hostElementRef.nativeElement.href + '?');
        if (!wantsToLeave) {
            event.preventDefault();
        } else {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam;
            return;
        }
    }

}