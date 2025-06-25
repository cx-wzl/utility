import { Component, DOCUMENT, inject, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.html',
  styleUrls: ['./form-builder.scss'],
  imports: [MatSidenavModule],
  encapsulation: ViewEncapsulation.None,
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

  handleDragStart(
    event: DragEvent,
    common: 'insert' | 'move',
    elm: string | HTMLElement
  ) {
    event.dataTransfer?.setData('text/plain', JSON.stringify({ common, elm }));
  }

  handleDrop(event: DragEvent) {
    let ele: HTMLElement | null = null;
    const data = event.dataTransfer!.getData('text/plain');
    const { common, elm } = JSON.parse(data);
    const target = event.target as HTMLElement;
    if (common === 'insert') {
      switch (elm) {
        case 'div':
          ele = this.doc.createElement('div');
          ele.classList.add('row');
          target.appendChild(ele);
          break;
        case 'button':
          ele = this.doc.createElement('button');
          ele.setAttribute('type', 'button');
          ele.appendChild(this.doc.createTextNode('Button'));
          target.appendChild(ele);
          break;
        case 'input':
          ele = this.doc.createElement('input');
          ele.setAttribute('type', 'text');
          target.appendChild(ele);
          break;
        case 'select':
          ele = this.doc.createElement('select');
          target.appendChild(ele);
          break;
        case 'textarea':
          ele = this.doc.createElement('textarea');
          target.appendChild(ele);
          break;
      }
      if (ele) {
        ele.setAttribute('id', uuid());
        ele.setAttribute('tabindex', '0');
        ele.setAttribute('draggable', 'true');
        ele.addEventListener('dragstart', (e: Event) => {
          const evt = e as DragEvent;
          this.handleDragStart(evt, 'move', (evt.target as HTMLElement).id);
        });
        ele?.addEventListener('dragover', (e: Event) => {
          this.handleDragOver(e as DragEvent);
        });
      }
    } else if (common === 'move') {
      const ele = this.doc.getElementById(elm)!;
      if (ele === target || ele.contains(target)) {
        return;
      }
      ele.remove();
      if (
        ['input', 'select', 'textarea'].includes(
          target.tagName.toLocaleLowerCase()
        )
      ) {
        target.parentNode?.insertBefore(ele, target);
      } else {
        target.appendChild(ele);
      }
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
