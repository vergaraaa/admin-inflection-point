export interface QueryString {
    id: number;
    name: string;
    type_id: number;
    description: string;
    required: boolean;
    route_id: number;
  }
  
  export interface OutputParameter {
    id: number;
    name: string;
    type_id: number;
    description: string;
    route_id: number;
  }
  
  export interface InputParameter {
    id: number;
    name: string;
    type_id: number;
    description: string;
    route_id: number;
  }
  
  export interface Header {
    id: number;
    name: string;
    type_id: number;
    description: string;
    route_id: number;
  }
  
  export interface Route {
    id: number;
    name: string;
    route: string;
    method: string;
    type_id: number;
    description: string;
    section_id: number;
    api_id: number;
  }

  export interface Section {
    id: number,
    name: string,
    api_id: number
  }
  