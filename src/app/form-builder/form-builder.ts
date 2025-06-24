import { Component, DOCUMENT, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.html',
  styleUrls: ['./form-builder.scss'],
  imports: [MatSidenavModule],
})
export class FormBuilder {
  private readonly doc = inject(DOCUMENT);

  navSideOpened = true;
  secondSideOpened = false;

  controls = ['div', 'button', 'input', 'select', 'textarea'];

  toggleNavSide() {
    this.navSideOpened = !this.navSideOpened;
  }
  toggleSecondSide() {
    this.secondSideOpened = !this.secondSideOpened;
  }

  handleDragStart(event: DragEvent, control: string) {
    event.dataTransfer?.setData("text/plain", control);
  }

  handleDrop(event: DragEvent) {
    console.log(1111111111);
    const data = event.dataTransfer?.getData("text/plain");
    const target = event.target as HTMLElement;
    switch (data) {
      case 'div':
        const div = this.doc.createElement('div');
        target.appendChild(div);
        break;
      case 'button':
        const button = this.doc.createElement('button');
        button.textContent = 'Button';
        target.appendChild(button);
        break;
      case 'input':
        const input = this.doc.createElement('input');
        input.type = 'text';
        target.appendChild(input);
        break;
      case 'select':
        const select = this.doc.createElement('select');
        target.appendChild(select);
        break;
      case 'textarea':
        const textarea = this.doc.createElement('textarea');
        target.appendChild(textarea);
        break;
    }
  }
  
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
}
