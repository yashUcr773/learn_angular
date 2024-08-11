import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
    selector: 'app-user-places',
    standalone: true,
    templateUrl: './user-places.component.html',
    styleUrl: './user-places.component.css',
    imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
    private placesService = inject(PlacesService);
    places = this.placesService.loadedUserPlaces;
    private destroyRef = inject(DestroyRef)
    isLoading = signal<boolean>(true);
    isError = signal<boolean>(false);
    ngOnInit() {

        const placesData = this.placesService.loadUserPlaces()
            .subscribe({
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
