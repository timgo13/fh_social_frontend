import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';

@Component({
  selector: 'app-user-search-page',
  templateUrl: './user-search-page.component.html',
  styleUrls: ['./user-search-page.component.scss']
})
export class UserSearchPageComponent implements OnInit {

  CurrentPage: any = CurrentPage;

  constructor() { }

  ngOnInit(): void {
  }

}
