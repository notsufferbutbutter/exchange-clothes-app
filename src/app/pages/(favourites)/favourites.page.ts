import { Component } from '@angular/core';
import { Favourites } from "@ecp/app/components/favourites/favourites";

@Component({
    selector: 'app-favourites-page',
    standalone: true,
    imports: [Favourites],
    template: `
        <app-favourites />
    `
})
export default class FavouritesPage {}
