import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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

  displayedColumns = ["first_name", "email", "role_id"];
  dataSource: MatTableDataSource<User> = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPaginator!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sortPaginator;
      console.log(this.usersData)
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

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
}