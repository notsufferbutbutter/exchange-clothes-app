import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

import { App } from '@ecp/app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig);
