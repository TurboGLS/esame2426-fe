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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.eventaddClass.emit(result);
        this.closeResult.set(`Closed with: ${JSON.stringify(result)}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
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
    students: [[]]
  })

  submit() {
    if (this.addClass.valid) {
      this.modalService.dismissAll(this.addClass.value);
    } else {
      this.addClass.markAllAsTouched();
    }
  }
}
