import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }
}
