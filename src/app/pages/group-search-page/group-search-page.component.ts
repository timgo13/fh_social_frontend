import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';

@Component({
  selector: 'app-group-search-page',
  templateUrl: './group-search-page.component.html',
  styleUrls: ['./group-search-page.component.scss']
})
export class GroupSearchPageComponent implements OnInit {

  CurrentPage: any = CurrentPage;

  constructor() { }

  ngOnInit(): void {
  }

}
