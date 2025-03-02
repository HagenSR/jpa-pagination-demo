import { Component, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Component({ template: '' })
export abstract class SubscriberBaseComponent implements OnDestroy {
    protected destroyed$ = new Subject<boolean>()
    protected subscription = new Subscription()

    ngOnDestroy(): void {
        this.destroyed$.next(true)
        this.destroyed$.complete()
        this.subscription.unsubscribe()
    }
}