import { Component } from '@angular/core';
import { ClosetComponent } from '../../components/closet/closet.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
	selector: 'app-closet-page',
	imports: [NavbarComponent, ClosetComponent],
	template: `
		<app-navbar />
		<main class="px-4 pt-20">
			<app-closet />
		</main>
	`,
	styles: ``,
})
export default class ClosetPage {}
