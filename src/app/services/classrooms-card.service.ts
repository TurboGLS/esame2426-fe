import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Classroom } from '../entities/classroom.entity';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsCardService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Classroom[]>('/api/classrooms');
  }

  addClass(classData: { name: string; students: string[] }) {
    return this.http.post('/api/classrooms/create', classData);
  }
}