import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit {
  usersData: User[] = [];
  newRole: number = 0;
  idSelectedUser: number = 0;
  indexSelectedUser: number = 0;
  selectedUser: User = {} as User;
  query: string = "";
  ascDescBool: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
      console.log(this.usersData)
    });
  }

  // onRoleChange(idSelectedUser : number, newRole : number, indexSelectedUser : number) {
  //   if(this.idSelectedUser != idSelectedUser){
  //     this.roleIds[this.indexSelectedUser] = this.usersData[this.indexSelectedUser].role_id;
  //   }
  //   this.idSelectedUser = idSelectedUser;
  //   this.newRole = newRole;
  //   this.indexSelectedUser = indexSelectedUser;
  //   this.roleIds[indexSelectedUser] = newRole;
  // }

  onRoleChange(idSelectedUser: number, newRole: any) {
    // Set roleChanged to true in user of id idSelectedUser
    this.usersData.forEach((user) => {
      if (user.id == idSelectedUser) {
        console.log(user)
        if(user.role_id != +newRole.value){
          user.roleChanged = true;
          user.newRole = +newRole.value;
          this.idSelectedUser = idSelectedUser;
          this.newRole = +newRole.value;
          this.selectedUser = user;
        } else{
          user.roleChanged = false;
        }
      }
    });
  }

  editRole(){
    this.userService.editRole(this.idSelectedUser, this.newRole).subscribe((data: any) => {
      this.getUsers();
    });
  }

  search() {
    return this.usersData.filter(user => {
      return user.first_name.toLowerCase().includes(this.query.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.query.toLowerCase()) ||
      user.email.toLowerCase().includes(this.query.toLowerCase()) ||
      user.first_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.query.toLowerCase()) ||
      user.last_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.query.toLowerCase()) ||
      user.email.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.query.toLowerCase());
    });
  }

  sort(colName: any, boolean: boolean) {
    if (boolean == true){
        this.usersData.sort((a: any, b: any): number => {
          if(typeof a[colName] === 'string') {
            let aName = a[colName].toLowerCase();
            let bName = b[colName].toLowerCase();
            aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            return aName < bName ? 1 : aName > bName ? -1 : 0;
          } else {
            return a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0;
          }
          })
        this.ascDescBool = !this.ascDescBool
    }
    else{
      this.usersData.sort((a: any, b: any): number => {
        if(typeof a[colName] === 'string') {
          let aName = a[colName].toLowerCase();
          let bName = b[colName].toLowerCase();
          aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          return aName < bName ? -1 : aName > bName ? 1 : 0;
        } else {
          return a[colName] < b[colName] ? -1 : a[colName] > b[colName] ? 1 : 0;
        }
        })
        this.ascDescBool = !this.ascDescBool
    }
  }
}