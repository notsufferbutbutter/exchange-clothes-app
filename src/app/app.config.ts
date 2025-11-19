import { provideFileRouter, requestContextInterceptor, withDebugRoutes } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

const debugRoutesInDevMode = isDevMode() ? [withDebugRoutes()] : [];

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideFileRouter(...debugRoutesInDevMode),
		provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
		provideClientHydration(),
	],
};
