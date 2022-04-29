import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit {
  usersData: User[] = [];
  roleIds: number[] = [];
  newRole: number = 0;
  idSelectedUser: number = 0;
  indexSelectedUser: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
      this.usersData.forEach((user) => this.roleIds.push(user.role_id));
    });
  }

  onRoleChange(idSelectedUser : number, newRole : number, indexSelectedUser : number) {
    if(this.idSelectedUser != idSelectedUser){
      this.roleIds[this.indexSelectedUser] = this.usersData[this.indexSelectedUser].role_id;
    }
    this.idSelectedUser = idSelectedUser;
    this.newRole = newRole;
    this.indexSelectedUser = indexSelectedUser;
    this.roleIds[indexSelectedUser] = newRole;
  }

  editRole(){
    this.userService.editRole(this.idSelectedUser, this.newRole).subscribe((data: any) => {
      this.getUsers();
    });
  }
}