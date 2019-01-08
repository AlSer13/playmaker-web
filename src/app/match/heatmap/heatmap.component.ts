import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import h337 from 'heatmap.js';
import {Player} from '../../../entities/Player';

@Component({
    selector: 'heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('heatMap')
    private heatMapDiv: any;

    data: any[];

    @Input()
    public set heatPoints(data: any) {
        this.data = data;
        let newData = this.scaleAndExtrema(this.data, 400 / 127, null, 25);
        if (this.heatMapInstance) {
            this.heatMapInstance = this.heatMapInstance.setData(newData);
        }
    }

    private heatMapInstance: any;

    constructor() {
    }

    ngOnInit() {

    }

    public ngAfterViewInit(): void {
        let newData = this.scaleAndExtrema(this.data, 400 / 127, null, 25);
        this.heatMapInstance = h337.create({
            container: this.heatMapDiv.nativeElement,
            radius: 15 * (400 / 600)
        }).setData(newData);


        // this.heatMapInstance.setData(this.data);
        // this.heatMapInstance.setDataMax(this.dataMax);
        // this.heatMapInstance.setDataMin(this.dataMin);
    }

    ngOnChanges(changes: any){

    }

    private scaleAndExtrema(points, scalef, max, shift) {
        // the max values should not deviate from the average by more than a factor of 25
        const maxValue = (points.reduce((a, b) => a + b.value, 0) / points.length) * 25;

        const newPoints = points.map(p => ({
            x: Math.floor(p.x * scalef),
            y: Math.floor(p.y * scalef),
            value: Math.min(p.value, maxValue) + shift,
        }));
        const vals = points.map(p => Math.min(p.value, maxValue));
        const localMax = Math.max(...vals);
        return {
            min: 0,
            max: max || localMax,
            data: newPoints,
        };
    }
}
