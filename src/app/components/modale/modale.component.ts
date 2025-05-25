import { Component, EventEmitter, inject, Output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modale',
  standalone: false,
  templateUrl: './modale.component.html',
  styleUrl: './modale.component.css'
})
export class ModaleComponent {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  protected fb = inject(FormBuilder);

  @Output()
  eventaddClass = new EventEmitter<{ title: string, students: string[] }>();

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.catch(
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  addClass = this.fb.group({
    title: ['', Validators.required],
    students: []
  })

  submit() {
    if (this.addClass.valid) {
      const formValue = this.addClass.value;
      const title = formValue.title as string;
      const studentsString = (formValue.students ?? '') as string;

      const formattedStudents = studentsString
        .split(',')
        .map(name => name.trim())
        .filter(name => name !== '');

      this.eventaddClass.emit({
        title: title,
        students: formattedStudents
      });

      this.modalService.dismissAll();
    } else {
      this.addClass.markAllAsTouched();
    }
  }

}
