import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-places',
    standalone: true,
    templateUrl: './user-places.component.html',
    styleUrl: './user-places.component.css',
    imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
    places = signal<Place[] | undefined>(undefined);
    private httpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef)
    isLoading = signal<boolean>(true);
    isError = signal<boolean>(false);
    ngOnInit() {

        const placesData = this.httpClient.get<{ places: Place[] }>('http://localhost:3000/user-places')
            .subscribe({
                next: (places) => {
                    this.places.set(places.places);
                },
                error: (error) => {
                    console.log(error);
                    this.isError.set(true);
                },
                complete: () => {
                    this.isLoading.set(false);
                }
            });

        this.destroyRef.onDestroy(() => {
            placesData.unsubscribe();
        });

    }

}
