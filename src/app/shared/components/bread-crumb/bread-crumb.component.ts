import { Component, OnInit, Input } from '@angular/core';

interface BreadCrumbItem {
  text: string,
  link?: string
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input() itens: Array<BreadCrumbItem>= [];
 BreadCrumbItem
  constructor() { }

  ngOnInit() {
  }

  isLastItem(item: BreadCrumbItem):boolean {
    const index = this.itens.indexOf(item);
    return index + 1 == this.itens.length;
  }


}
