export interface User {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  email: string;
  selected?: boolean;
  roleChanged?: boolean;
  newRole?: number;
}
