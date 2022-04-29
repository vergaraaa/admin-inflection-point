import { Component, OnInit } from "@angular/core";
import { Section, Header, InputParameter, OutputParameter, QueryString } from "src/app/models/forms.model";
import * as $ from "jquery";

@Component({
    selector: "app-route-form",
    templateUrl: "./route-form.component.html",
    styleUrls: ["./route-form.component.css"]
})

export class RouteFormComponent implements OnInit {
    sections: Section[] = [];
    headers: Header[] = [];
    input_parameters: InputParameter[] = [];
    output_parameters: OutputParameter[] = [];
    query_strings: QueryString[] = [];
    sectionSelectValue: string = "";

    constructor() { }

    ngOnInit() {

    }

    addHeader() {
        this.headers.push({
            id: 0,
            name: 'Nuevo header',
            type_id: 0,
            description: '',
            route_id: 0
        });
    }

    deleteHeader(index: number) {
        this.headers.splice(index, 1);
    }

    addInputParameter() {
        this.input_parameters.push({
            id: 0,
            name: 'New input param',
            type_id: 0,
            description: '',
            route_id: 0
        });
    }

    deleteInputParameter(index: number) {
        this.input_parameters.splice(index, 1);
    }

    addOutputParameter() {
        this.output_parameters.push({
            id: 0,
            name: 'New output param',
            type_id: 0,
            description: '',
            route_id: 0
        });
    }

    deleteOutputParameter(index: number) {
        this.output_parameters.splice(index, 1);
    }
    
    addQueryString() {
        this.query_strings.push({
            id: 0,
            name: 'New query string',
            type_id: 0,
            description: '',
            required: true,
            route_id: 0
        });
    }

    deleteQueryString(index: number) {
        this.query_strings.splice(index, 1);
    }

    onSectionSelectChange(){
        if(this.sectionSelectValue == 'add'){
            console.log('abriendo modal seccion');
            document.getElementById("openSectionModalButton")!.click();
            // $("sectionModal" ).change(function() {
            //     ($('sectionModal') as any).modal('show');
            //   });
        }
    }

    addSection(){
        this.sections.push({
            id: 0, 
            name: 'Nueva sección',
            api_id: 0,
        });
    }
}
