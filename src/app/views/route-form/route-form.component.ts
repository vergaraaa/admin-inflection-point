import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Route, Section, Header, InputParameter, OutputParameter, QueryString, DataType } from "src/app/models/forms.model";
import { RouteService } from "src/app/services/route.service";
import { SectionService } from "src/app/services/section.service";

@Component({
    selector: "app-route-form",
    templateUrl: "./route-form.component.html",
    styleUrls: ["./route-form.component.css"]
})

export class RouteFormComponent implements OnInit {
    dataTypes: DataType[] = [];
    apiId: number = 0;
    
    // Section Modal
    sections: Section[] = [];
    iSectionAdd: string = "";
    
    // Header Modal
    headers: Header[] = [];
    iHeaderName: string = "";
    iHeaderType: string = "";
    iHeaderDescription: string = "";
    
    // Input Param Modal
    input_parameters: InputParameter[] = [];
    iInputParamName: string = "";
    iInputParamType: string = "";
    iInputParamDescription: string = "";
    
    // Output Param Modal
    output_parameters: OutputParameter[] = [];
    iOutputParamName: string = "";
    iOutputParamType: string = "";
    iOutputParamDescription: string = "";
    
    // Query String Modal
    query_strings: QueryString[] = [];
    iQueryStringName: string = "";
    iQueryStringType: string = "";
    iQueryStringRequired: string = "";
    iQueryStringDescription: string = "";

    // Form
    iSection: string = "";
    iName: string = "";
    iURL: string = "";
    iDescription: string = "";
    iMethod: string = "";

    constructor(private routeService: RouteService, private sectionService: SectionService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.apiId = +this.route.snapshot.paramMap.get('api')!;
        this.getApiSections();
        this.getDataTypes();
    }

    getDataTypes() {
        this.sectionService.getDataTypes().subscribe((data: any) => {
            this.dataTypes = data;
        });
    }

    getApiSections() {
        this.sections = []
        this.sectionService.getApiSections(this.apiId).subscribe((data: any) => {
            data.forEach((section: Section) => {
                this.sections.push(section)
            });
        })
    }

    addSection(){
        const name = this.iSectionAdd;
        this.sectionService.addApiSection(name, this.apiId).subscribe((data: any) => {
            this.iSectionAdd = "";
            this.getApiSections();
        })
    }

    addHeader() {
        this.headers.push({
            name: this.iHeaderName,
            type_id: +this.iHeaderType,
            description: this.iHeaderDescription
        });
        this.iHeaderName = "";
        this.iHeaderType = "";
        this.iHeaderDescription = "";
    }

    deleteHeader(index: number) {
        this.headers.splice(index, 1);
    }

    addInputParameter() {
        this.input_parameters.push({
            name: this.iInputParamName,
            type_id: +this.iInputParamType,
            description: this.iInputParamDescription
        });
        this.iInputParamName = "";
        this.iInputParamType = "";
        this.iInputParamDescription = "";
    }

    deleteInputParameter(index: number) {
        this.input_parameters.splice(index, 1);
    }

    addOutputParameter() {
        this.output_parameters.push({
            name: this.iOutputParamName,
            type_id: +this.iOutputParamType,
            description: this.iOutputParamDescription
        });
        this.iOutputParamName = "";
        this.iOutputParamType = "";
        this.iOutputParamDescription = "";
    }

    deleteOutputParameter(index: number) {
        this.output_parameters.splice(index, 1);
    }
    
    addQueryString() {
        this.query_strings.push({
            name: this.iQueryStringName,
            type_id: +this.iQueryStringType,
            required: this.iQueryStringRequired === "1" ? true : false,
            description: this.iQueryStringDescription
        });
        this.iQueryStringName = "";
        this.iQueryStringType = "";
        this.iQueryStringDescription = "";
        this.iQueryStringRequired = "";
    }

    deleteQueryString(index: number) {
        this.query_strings.splice(index, 1);
    }

    addRoute() {
        const route: Route = {
            name: this.iName,
            route: this.iURL,
            method: this.iMethod,
            description: this.iDescription,
            section_id: +this.iSection,
            api_id: this.apiId,
            headers: this.headers,
            input_parameters: this.input_parameters,
            output_parameters: this.output_parameters,
            query_strings: this.query_strings
        }

        this.routeService.addRoute(route).subscribe((data: any) => {
        });
        
        this.router.navigate(["/api/" + this.apiId]);
    }
}
