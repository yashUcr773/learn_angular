import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-server-status',
    standalone: true,
    imports: [],
    templateUrl: './server-status.component.html',
    styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
    currentStatus: 'online' | 'offline' | 'unknown' = 'online';

    ngOnInit() {
        setInterval(() => {
            this.currentStatus = Math.random() > 0.5 ? 'online' : Math.random() < 0.9 ? 'offline' : 'unknown';
        }, 5000)
    }
}
