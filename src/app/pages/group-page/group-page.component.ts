import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  CurrentPage: any = CurrentPage;

  constructor() { }

  ngOnInit(): void {
  }

}
