import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from '../../../utils/types.utils';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
    selector: 'app-tickets',
    standalone: true,
    imports: [NewTicketComponent, TicketComponent],
    templateUrl: './tickets.component.html',
    styleUrl: './tickets.component.css'
})
export class TicketsComponent {
    tickets: Ticket[] = []

    onSubmitTicket(ticket: Ticket) {
        this.tickets.push(ticket)
    }
    onUpdateTicket(ticket: Ticket) {
        const index = this.tickets.findIndex(t => t.id === ticket.id)
        if (index !== -1) {
            this.tickets[index] = ticket
        }
    }
}
