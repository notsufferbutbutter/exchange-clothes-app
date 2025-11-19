import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@ecp/app/components/footer/navbar.component';
import { NavbarComponent } from '@ecp/app/components/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, Footer],
	host: {
		class: 'bg-background relative z-10 flex min-h-svh flex-col',
	},
	template: `
		<app-navbar />
		<main class="flex flex-1 flex-col">
			<router-outlet />
		</main>
		<app-footer />
	`,
})
export class App {}
