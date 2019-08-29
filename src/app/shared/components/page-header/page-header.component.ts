import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input('page-title') pageTitle: string;
  @Input('button-show') buttonShow: boolean = true;
  @Input('button-link') buttonLink: string;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;

  constructor() { }

  ngOnInit() {
  }

}
