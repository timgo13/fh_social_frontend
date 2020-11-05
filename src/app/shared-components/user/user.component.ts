import { Component, Input } from '@angular/core';
import { UserDto } from '../../services/dto/user.dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: UserDto;
}
