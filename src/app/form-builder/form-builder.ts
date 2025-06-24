import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.html',
  styleUrls: ['./form-builder.scss'],
  imports: [MatSidenavModule],
})
export class FormBuilder {}
