import { render } from '@analogjs/router/server';
import '@angular/platform-server/init';
import 'zone.js/node';

import { App } from '@ecp/app/app';
import { config } from './app/app.config.server';

export default render(App, config);
