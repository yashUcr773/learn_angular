import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ServerStatusComponent } from "./components/dashboard/server-status/server-status.component";
import { TrafficComponent } from "./components/dashboard/traffic/traffic.component";
import { TicketsComponent } from "./components/dashboard/tickets/tickets.component";
import { DashboardItemComponent } from "./components/dashboard/dashboard-item/dashboard-item.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [HeaderComponent, ServerStatusComponent, TrafficComponent, TicketsComponent, DashboardItemComponent]
})
export class AppComponent {

}
