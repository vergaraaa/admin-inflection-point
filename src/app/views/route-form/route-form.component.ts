import { ApiService } from 'src/app/services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    Route,
    Section,
    Header,
    InputParameter,
    OutputParameter,
    QueryString,
    DataType,
    Body,
} from 'src/app/models/forms.model';
import { RouteService } from 'src/app/services/route.service';
//declare var $ : any;
import { SectionService } from 'src/app/services/section.service';

@Component({
    selector: 'app-route-form',
    templateUrl: './route-form.component.html',
    styleUrls: ['./route-form.component.css'],
})



export class RouteFormComponent implements OnInit {

    apiId: number = 0;
    routeId: string | null = null;
    sectionId: string | null = null;
    isEditing: boolean = false;

    routeForm!: FormGroup;
    sectionForm!: FormGroup;
    headerForm!: FormGroup;
    inputParamForm!: FormGroup;
    outputParamForm!: FormGroup;
    queryStringForm!: FormGroup;
    bodyForm!: FormGroup;

    //Data Types
    dataType: DataType = { id: 0, name: '' }
    dataTypes: DataType[] = [];

    //Body Modal
    body: Body = { id: 0, name: '', type_id: 0, description: '', route_id: 0 }
    bodies: Body[] = [];
    iBodyName: string = '';
    iBodyType: string = '';
    iBodyDescription: string = '';
    isEditingBody: boolean = false;

    // Section Modal
    section: Section = { id: 0, name: '', api_id: 0 }
    sections: Section[] = [];
    iSectionAdd: string = '';
    isEditingSection: boolean = false;

    // Header Modal
    header: Header = { id: 0, name: '', type_id: 0, description: '', route_id: 0, value: 0 }
    headers: Header[] = [];
    iHeaderName: string = '';
    iHeaderType: string = '';
    iHeaderDescription: string = '';
    editIndex: number = 0;
    isEditingHeader: boolean = false;

    // Input Param Modal
    inputParameter: InputParameter = { id: 0, name: '', type_id: 0, description: '', route_id: 0 }
    input_parameters: InputParameter[] = [];
    iInputParamName: string = '';
    iInputParamType: string = '';
    iInputParamDescription: string = '';
    isEditingInput: boolean = false;

    // Output Param Modal
    outputParameter: OutputParameter = { id: 0, name: '', type_id: 0, description: '', route_id: 0 }
    output_parameters: OutputParameter[] = [];
    iOutputParamName: string = '';
    iOutputParamType: string = '';
    iOutputParamDescription: string = '';
    isEditingOutput: boolean = false;

    // Query String Modal
    queryString: QueryString = { id: 0, name: '', type_id: 0, description: '', required: false, route_id: 0 }
    query_strings: QueryString[] = [];
    iQueryStringName: string = '';
    iQueryStringType: string = '';
    iQueryStringRequired: string = '';
    iQueryStringDescription: string = '';
    isEditingQuery: boolean = false;

    // Form
    routeRoute: Route = { id: 0, name: '', route: '', description: '', method: '', section_id: 0, api_id: 0, headers: [], input_parameters: [], output_parameters: [], query_strings: [], bodies: [] }
    iSection: string = '';
    iName: string = '';
    iURL: string = '';
    iDescription: string = '';
    iMethod: string = '';

    constructor(
        private routeService: RouteService,
        private sectionService: SectionService,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.apiId = +this.route.snapshot.paramMap.get('api')!;
        this.routeId = this.route.snapshot.paramMap.get('route_id');
        this.sectionId = this.route.snapshot.queryParamMap.get('section');

        if (this.sectionId) {
            this.iSection = this.sectionId!;
        }

        if (this.routeId !== null) {
            this.getRouteDetails();
            this.isEditing = true;
        }

        this.routeForm = this.fb.group({
            name: [null],
            description: [null],
            route: [null],
            method: [null],
            section_id: [null],
        });

        this.sectionForm = this.fb.group({
            name: [null],
        });

        this.headerForm = this.fb.group({
            name: [null],
            description: [null],
            type_id: [null],
        });

        this.inputParamForm = this.fb.group({
            name: [null],
            description: [null],
            type_id: [null],
        });

        this.outputParamForm = this.fb.group({
            name: [null],
            description: [null],
            type_id: [null],
        });

        this.queryStringForm = this.fb.group({
            name: [null],
            description: [null],
            type_id: [null],
            required: [null],
        });

        this.bodyForm = this.fb.group({
            name: [null],
            description: [null],
            type_id: [null],
        });

        this.getApiSections();
        this.getDataTypes();
    }

    getRouteDetails() {
        this.apiService.getRouteDetails(+this.routeId!).subscribe((data: any) => {
            this.iSection = data.route.section_id;
            this.iName = data.route.name;
            this.iURL = data.route.route;
            this.iDescription = data.route.description;
            this.iMethod = data.route.method;
            this.headers = data.headers;
            this.input_parameters = data.input_params;
            this.output_parameters = data.output_params;
            this.query_strings = data.query_string;
            this.bodies = data.bodies;
            console.log(this.query_strings);

        });
    }

    getDataTypes() {
        this.sectionService.getDataTypes().subscribe((data: any) => {
            this.dataTypes = data;
        });
    }

    getApiSections() {
        this.sections = [];
        this.sectionService.getApiSections(this.apiId).subscribe((data: any) => {
            data.forEach((section: Section) => {
                this.sections.push(section);
            });
        });
    }

    addSection() {
        const name = this.iSectionAdd;
        if (this.sectionForm.invalid) {
            this.sectionForm.controls['name'].markAsTouched();
        } else {
            this.sectionService
                .addApiSection(name, this.apiId)
                .subscribe((data: any) => {
                    this.iSectionAdd = '';
                    this.getApiSections();
                });
            this.sectionForm.reset();
        }
    }

    deleteSection(index: number) {
        this.sections.splice(index, 1);
    }

    addHeader() {
        if (this.headerForm.invalid) {
            this.headerForm.controls['name'].markAsTouched();
            this.headerForm.controls['type_id'].markAsTouched();
            this.headerForm.controls['description'].markAsTouched();
        } else {
            this.headers.push({
                name: this.iHeaderName,
                type_id: +this.iHeaderType,
                description: this.iHeaderDescription,
            });
            this.headerForm.reset();
        }
    }

    selectEditHeader(index: number) {
        this.editIndex = index;
        this.iHeaderName = this.headers[index].name;
        this.iHeaderType = this.headers[index].type_id.toString();
        this.iHeaderDescription = this.headers[index].description;
        this.isEditingHeader = true;
    }

    cancelEditHeader() {
        this.isEditingHeader = false;
        this.headerForm.reset()
    }

    editHeader() {
        if (this.headerForm.invalid) {
            this.headerForm.controls['name'].markAsTouched();
            this.headerForm.controls['type_id'].markAsTouched();
            this.headerForm.controls['description'].markAsTouched();
        } else {
            this.headers[this.editIndex].name = this.iHeaderName
            this.headers[this.editIndex].type_id = +this.iHeaderType
            this.headers[this.editIndex].description = this.iHeaderDescription
            this.headerForm.reset();
            this.isEditingHeader = false;
        }
    }

    deleteHeader(index: number) {
        this.headers.splice(index, 1);
    }

    addInputParameter() {
        if (this.inputParamForm.invalid) {
            this.inputParamForm.controls['name'].markAsTouched();
            this.inputParamForm.controls['type_id'].markAsTouched();
            this.inputParamForm.controls['description'].markAsTouched();
        } else {
            this.input_parameters.push({
                name: this.iInputParamName,
                type_id: +this.iInputParamType,
                description: this.iInputParamDescription,
            });
            this.inputParamForm.reset();
        }
    }

    selectInputParameter(index: number) {
        this.editIndex = index;
        this.iInputParamName = this.input_parameters[index].name;
        this.iInputParamType = this.input_parameters[index].type_id.toString();
        this.iInputParamDescription = this.input_parameters[index].description;
        this.isEditingInput = true;
    }

    cancelEditInput() {
        this.isEditingInput = false;
        this.inputParamForm.reset();
    }

    editInputParameter() {
        if (this.inputParamForm.invalid) {
            this.inputParamForm.controls['name'].markAsTouched();
            this.inputParamForm.controls['type_id'].markAsTouched();
            this.inputParamForm.controls['description'].markAsTouched();
        } else {
            this.input_parameters[this.editIndex].name = this.iInputParamName;
            this.input_parameters[this.editIndex].type_id = +this.iInputParamType;
            this.input_parameters[this.editIndex].description = this.iInputParamDescription;
            this.inputParamForm.reset();
            this.isEditingInput = false;
        }
    }

    deleteInputParameter(index: number) {
        this.input_parameters.splice(index, 1);
    }

    addOutputParameter() {
        if (this.outputParamForm.invalid) {
            this.outputParamForm.controls['name'].markAsTouched();
            this.outputParamForm.controls['type_id'].markAsTouched();
            this.outputParamForm.controls['description'].markAsTouched();
        } else {
            this.output_parameters.push({
                name: this.iOutputParamName,
                type_id: +this.iOutputParamType,
                description: this.iOutputParamDescription,
            });
            this.outputParamForm.reset();
        }
    }

    selectOutputParameter(index: number) {
        this.editIndex = index;
        this.iOutputParamName = this.output_parameters[index].name;
        this.iOutputParamType = this.output_parameters[index].type_id.toString();
        this.iOutputParamDescription = this.output_parameters[index].description;
        this.isEditingOutput = true;
    }

    cancelEditOutput() {
        this.isEditingOutput = false;
        this.outputParamForm.reset();
    }

    editOutputParameter() {
        if (this.outputParamForm.invalid) {
            this.outputParamForm.controls['name'].markAsTouched();
            this.outputParamForm.controls['type_id'].markAsTouched();
            this.outputParamForm.controls['description'].markAsTouched();
        } else {
            this.output_parameters[this.editIndex].name = this.iOutputParamName;
            this.output_parameters[this.editIndex].type_id = +this.iOutputParamType;
            this.output_parameters[this.editIndex].description = this.iOutputParamDescription;
            this.isEditingOutput = false;
            this.outputParamForm.reset();
        }
    }

    deleteOutputParameter(index: number) {
        this.output_parameters.splice(index, 1);
    }

    addQueryString() {
        if (this.queryStringForm.invalid) {
            this.queryStringForm.controls['name'].markAsTouched();
            this.queryStringForm.controls['type_id'].markAsTouched();
            this.queryStringForm.controls['description'].markAsTouched();
            this.queryStringForm.controls['required'].markAsTouched();
        } else {
            this.query_strings.push({
                name: this.iQueryStringName,
                type_id: +this.iQueryStringType,
                required: this.iQueryStringRequired === 'true' ? true : false,
                description: this.iQueryStringDescription,
            });
            this.queryStringForm.reset();
        }
    }

    selectQueryString(index: number) {
        this.editIndex = index;
        this.iQueryStringName = this.query_strings[index].name;
        this.iQueryStringType = this.query_strings[index].type_id.toString();
        this.iQueryStringRequired = this.query_strings[index].required.toString();
        this.iQueryStringDescription = this.query_strings[index].description;
        this.isEditingQuery = true;
    }

    cancelEditQuery() {
        this.isEditingQuery = false;
        this.queryStringForm.reset();
    }

    editQueryString() {
        if (this.queryStringForm.invalid) {
            this.queryStringForm.controls['name'].markAsTouched();
            this.queryStringForm.controls['type_id'].markAsTouched();
            this.queryStringForm.controls['description'].markAsTouched();
            this.queryStringForm.controls['required'].markAsTouched();
        } else {
            this.query_strings[this.editIndex].name = this.iQueryStringName;
            this.query_strings[this.editIndex].type_id = +this.iQueryStringType;
            this.query_strings[this.editIndex].required = this.iQueryStringRequired === '1' ? true : false;
            this.query_strings[this.editIndex].description = this.iQueryStringDescription;
            this.isEditingQuery = false;
            this.queryStringForm.reset();
        }
    }

    deleteQueryString(index: number) {
        this.query_strings.splice(index, 1);
    }

    addBody() {
        if (this.bodyForm.invalid) {
            this.bodyForm.controls['name'].markAsTouched();
            this.bodyForm.controls['type_id'].markAsTouched();
            this.bodyForm.controls['description'].markAsTouched();
        } else {
            this.bodies.push({
                name: this.iBodyName,
                type_id: +this.iBodyType,
                description: this.iBodyDescription,
            });
            this.bodyForm.reset();
        }
    }

    selectBody(index: number) {
        this.editIndex = index;
        this.iBodyName = this.bodies[index].name;
        this.iBodyType = this.bodies[index].type_id.toString();
        this.iBodyDescription = this.bodies[index].description;
        this.isEditingBody = true;
    }

    cancelEditBody() {
        this.isEditingBody = false;
        this.bodyForm.reset();
    }

    editBody() {
        if (this.bodyForm.invalid) {
            this.bodyForm.controls['name'].markAsTouched();
            this.bodyForm.controls['type_id'].markAsTouched();
            this.bodyForm.controls['description'].markAsTouched();
        } else {
            this.bodies[this.editIndex].name = this.iBodyName;
            this.bodies[this.editIndex].type_id = +this.iBodyType;
            this.bodies[this.editIndex].description = this.iBodyDescription;
            this.isEditingBody = false;
            this.bodyForm.reset();
        }
    }

    deleteBody(index: number) {
        this.bodies.splice(index, 1);
    }

    addRoute() {
        if (this.routeForm.invalid) {
            this.routeForm.controls['name'].markAsTouched();
            this.routeForm.controls['route'].markAsTouched();
            this.routeForm.controls['section_id'].markAsTouched();
            this.routeForm.controls['method'].markAsTouched();
            this.routeForm.controls['description'].markAsTouched();
        } else {
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
                query_strings: this.query_strings,
                bodies: this.bodies,
            };

            this.routeService.addRoute(route).subscribe((data: any) => { });

            this.router.navigate(['/api/' + this.apiId]);
        }
    }

    onEdit() {
        if (this.routeForm.invalid) {
            this.routeForm.controls['name'].markAsTouched();
            this.routeForm.controls['route'].markAsTouched();
            this.routeForm.controls['section_id'].markAsTouched();
            this.routeForm.controls['method'].markAsTouched();
            this.routeForm.controls['description'].markAsTouched();
        } else {
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
                query_strings: this.query_strings,
                bodies: this.bodies
            };

            this.routeService.editRoute(+this.routeId!, route).subscribe({
                next: (res: any) => {
                    this.router.navigate(['/api/' + this.apiId], {
                        queryParams: {
                            route: this.routeId,
                        },
                    });
                },
                error: (err: any) => console.error(err),
            });
        }
    }
}
