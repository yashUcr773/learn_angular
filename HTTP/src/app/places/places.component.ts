import { Component, input, output } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-places',
    standalone: true,
    imports: [],
    templateUrl: './places.component.html',
    styleUrl: './places.component.css',
})
export class PlacesComponent {
    places = input.required<Place[]>();

    constructor(private httpClient: HttpClient) { }

    onSelectPlace(place: Place) {
        this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id }).subscribe();
    }
}
