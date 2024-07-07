import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit{

  username: any;
  profile: any;
  repos!: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private service: HomeService
  ){
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')
    })
  }

  ngOnInit(): void {
    this.getProfile()
    this.getRepos()
  }

  getProfile(){
    let url = `https://api.github.com/users/${this.username}`
    this.service.sendGetRequest(url).subscribe(res => {
      this.profile = res
    })
  }

  getRepos(){
    let url = `https://api.github.com/users/${this.username}/repos`
    this.service.sendGetRequest(url).subscribe(res => {
      this.repos = res
    })
  }

}