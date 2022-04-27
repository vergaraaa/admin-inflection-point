import { Component, OnInit } from "@angular/core";
import { Section } from "src/app/models/forms.model";

@Component({
    selector: "app-forms",
    templateUrl: "./forms.component.html",
    styleUrls: ["./forms.component.css"]
})

export class FormsComponent implements OnInit{

    sections: Section[] = [];
    constructor(){}

    ngOnInit(){

    }

    addSection(name: string){
        let section: Section = { id: 0, name: name, api_id: 0 };
        this.sections.push(section);
    }
    deleteSection(index: number){
        this.sections.splice(index, 1);
    }
}
