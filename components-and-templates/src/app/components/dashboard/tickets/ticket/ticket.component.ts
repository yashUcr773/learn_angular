import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from '../../../../utils/types.utils';

@Component({
    selector: 'app-ticket',
    standalone: true,
    imports: [],
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.css'
})
export class TicketComponent {
    @Input() ticket!: Ticket;
    @Output() onUpdateTicket = new EventEmitter<Ticket>();
    showDetails = false;

    markComplete() {
        this.ticket.status = 'closed';
        this.onUpdateTicket.emit(this.ticket);
    }

    toggleDetails() {
        this.showDetails = !this.showDetails;
    }
}
