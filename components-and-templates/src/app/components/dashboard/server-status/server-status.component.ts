import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-server-status',
    standalone: true,
    imports: [],
    templateUrl: './server-status.component.html',
    styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
    currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
    private interval?: ReturnType<typeof setInterval>;

    ngOnInit() {
        this.interval = setInterval(() => {
            this.currentStatus.set(Math.random() > 0.5 ? 'online' : Math.random() < 0.9 ? 'offline' : 'unknown');
        }, 5000)
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }


}
