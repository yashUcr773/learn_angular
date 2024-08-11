import { Component, DestroyRef, inject, input } from '@angular/core';

import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
    selector: 'app-places',
    standalone: true,
    imports: [],
    templateUrl: './places.component.html',
    styleUrl: './places.component.css',
})
export class PlacesComponent {
    places = input.required<Place[]>();
    userPlaces = input.required<boolean>();

    private destroyRef = inject(DestroyRef);

    constructor(private placesService: PlacesService) { }

    handlePut(place: Place) {
        const putPlace = this.placesService.addPlaceToUserPlaces(place).subscribe();

        this.destroyRef.onDestroy(() => {
            putPlace.unsubscribe();
        })
    }

    handleDelete(place: Place) {
        const deletePlace = this.placesService.removeUserPlace(place).subscribe();

        this.destroyRef.onDestroy(() => {
            deletePlace.unsubscribe();
        })
    }

    onSelectPlace(place: Place) {
        if (this.userPlaces()) {
            return this.handleDelete(place)
        }
        return this.handlePut(place);
    }
}
