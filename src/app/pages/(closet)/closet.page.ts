import { Component } from '@angular/core';
import { ClosetComponent } from '../../components/closet/closet.component';

@Component({
	selector: 'app-closet-page',
	imports: [ClosetComponent],
	template: `
		<app-closet />
	`,
})
export default class ClosetPage {}
