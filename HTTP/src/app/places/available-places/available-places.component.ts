import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
    selector: 'app-available-places',
    standalone: true,
    templateUrl: './available-places.component.html',
    styleUrl: './available-places.component.css',
    imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {


    places = signal<Place[] | undefined>(undefined);
    private placesService = inject(PlacesService);
    private destroyRef = inject(DestroyRef)
    isLoading = signal<boolean>(true);
    isError = signal<boolean>(false);

    ngOnInit() {

        const placesData = this.placesService.loadAvailablePlaces().subscribe({
            next: (places) => {
                this.places.set(places);
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
            console.log('Destroying AvailablePlacesComponent');
            placesData.unsubscribe();
        });

    }

}
