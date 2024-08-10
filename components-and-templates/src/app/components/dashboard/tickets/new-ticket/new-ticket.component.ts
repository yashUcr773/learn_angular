import { Component, ElementRef, EventEmitter, Output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../../../utils/types.utils';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    imports: [ButtonComponent, ControlComponent, FormsModule],
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

    @Output() onSubmitTicket = new EventEmitter<Ticket>()
    title = viewChild('title', { read: ElementRef<HTMLInputElement> })
    request = viewChild('request', { read: ElementRef<HTMLTextAreaElement> })

    onSubmit() {
        this.onSubmitTicket.emit({ id: Math.random().toString(36).substr(2, 9), title: this.title()?.nativeElement.value, description: this.request()?.nativeElement.value, status: 'open' })
    }
}
