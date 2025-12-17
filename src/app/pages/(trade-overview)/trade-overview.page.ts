import { Component } from '@angular/core';
import { TradeOverview } from '@ecp/app/components/trade-overview/trade-overview';

@Component({
    selector: 'app-trade-overview-page',
    standalone: true,
    imports: [TradeOverview],
    template: `
        <app-trade-overview />
    `
})
export default class TradeOverviewPage {}
