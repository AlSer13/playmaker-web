import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

import {fromEvent} from 'rxjs';
import {exhaustMap, filter, map, pairwise, startWith} from 'rxjs/operators';

interface ScrollPosition {
    sH: number;
    sT: number;
    cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
    sH: 0,
    sT: 0,
    cH: 0
};

@Directive({
    selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

    private scrollEvent$;

    private userScrolledDown$;

    private requestOnScroll$;

    @Input()
    scrollCallback;

    @Input()
    immediateCallback;

    @Input()
    scrollPercent = 70;

    constructor(private elm: ElementRef) {
    }

    ngAfterViewInit() {

        this.registerScrollEvent();

        this.streamScrollEvents();

        this.requestCallbackOnScroll();

    }

    private registerScrollEvent() {
        console.log('registerScrollEvent');
        this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
        console.log(this.elm);

    }

    private streamScrollEvents() {
        // console.log('streamScrollEvents');
        this.userScrolledDown$ = this.scrollEvent$
            .pipe(
                map((e: any): ScrollPosition => ({
                    sH: e.target.scrollHeight,
                    sT: e.target.scrollTop,
                    cH: e.target.clientHeight
                })),
                pairwise(),
                filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
            );
    }

    private requestCallbackOnScroll() {
        // console.log('requestCallbackOnScroll');

        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .pipe(
                    startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
                );
        }

        this.requestOnScroll$
            .pipe(exhaustMap(() => {
                return this.scrollCallback();
            }))
            .subscribe(() => {
            });

    }

    private isUserScrollingDown = (positions) => positions[0].sT < positions[1].sT;


    private isScrollExpectedPercent = (position) => {
        return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
    }

}
