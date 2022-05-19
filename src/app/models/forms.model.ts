export interface QueryString {
    id?: number;
    name: string;
    type_id: number;
    description: string;
    required: boolean;
    route_id?: number;
  }
  
  export interface OutputParameter {
    id?: number;
    name: string;
    type_id: number;
    description: string;
    route_id?: number;
  }
  
  export interface InputParameter {
    id?: number;
    name: string;
    type_id: number;
    description: string;
    route_id?: number;
  }
  
  export interface Header {
    id?: number;
    name: string;
    type_id: number;
    description: string;
    route_id?: number;
    value?: any;
  }
  
  export interface Route {
    id?: number;
    name: string;
    route: string;
    method: string;
    description: string;
    section_id: number;
    api_id: number;
    headers: Header[];
    input_parameters: InputParameter[];
    output_parameters: OutputParameter[];
    query_strings: QueryString[];
  }

  export interface Section {
    id: number,
    name: string,
    api_id: number
  }
  
  export interface DataType {
    id: number,
    name: string
  }