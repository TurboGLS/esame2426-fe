import { Component, Input } from '@angular/core';
import { Classroom } from '../../entities/classroom.entity';

@Component({
  selector: 'app-classrooms-cards',
  standalone: false,
  templateUrl: './classrooms-cards.component.html',
  styleUrl: './classrooms-cards.component.css'
})
export class ClassroomsCardsComponent {
  @Input()
  classroom: Classroom | null = null;
}
