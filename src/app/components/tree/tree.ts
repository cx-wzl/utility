import { Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  imports: [MatTreeModule],
})
export class Tree {
  treeNodes = [
    {
      name: 'Node 1',
      children: [{ name: 'Child 1' }, { name: 'Child 2' }],
    },
    {
      name: 'Node 2',
      children: [{ name: 'Child 3' }, { name: 'Child 4' }],
    },
  ];
}
