import { Component, Input } from '@angular/core';
import { GroupDto } from '../../services/dto/group.dto';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group: GroupDto;
}
