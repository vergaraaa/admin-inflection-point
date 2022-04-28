import { Component, Input, OnInit } from '@angular/core';
import { Route, Section } from 'src/app/models/forms.model';

@Component({
    selector: 'app-api-route',
    templateUrl: './api-route.component.html',
    styleUrls: ['./api-route.component.css']
})
export class ApiRouteComponent implements OnInit {
    @Input() sections: Section[] = [];
    @Input() route!: Route;
    @Input() index!: number;

    constructor() { }

    ngOnInit(): void {
    }

}
