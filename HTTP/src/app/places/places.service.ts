import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {

    private httpClient = inject(HttpClient);
    private errorService = inject(ErrorService)

    private userPlaces = signal<Place[]>([]);

    loadedUserPlaces = this.userPlaces.asReadonly();



    private fetchPlaces(url: string, errorMessage: string) {
        return this.httpClient.get<{ places: Place[] }>(url)
            .pipe(
                map((placesResponse) => placesResponse.places),
                catchError((error) => throwError(() => { console.log(error); return new Error(errorMessage) }))
            )
    }

    loadAvailablePlaces() {
        return this.fetchPlaces('http://localhost:3000/places', 'Could not fetch available places');
    }

    loadUserPlaces() {
        return this.fetchPlaces('http://localhost:3000/user-places', 'Could not fetch your user places')
            .pipe(tap({ next: (places) => this.userPlaces.set(places) }));
    }

    addPlaceToUserPlaces(place: Place) {
        this.userPlaces.update((places) => [...places, place]);
        return this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id })
            .pipe(
                catchError((error) => {
                    this.errorService.showError('Could not add place to your user places')
                    return throwError(() => new Error('Could not add place to your user places'))
                })
            )
    }

    removeUserPlace(place: Place) {
        this.userPlaces.update((places) => places.filter((p) => p.id !== place.id));
        return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
            .pipe(
                catchError((error) => {
                    this.errorService.showError('Could not remove place from your user places')
                    return throwError(() => new Error('Could not remove place from your user places'))
                })
            )
    }
}
