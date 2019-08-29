import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  monthNames = ['Selecione um mês', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  year = new Date().getFullYear();
  years: Array<any> = [];

  constructor() { }

  ngOnInit() {
    for (var i = 0; i < 7; i++) {
      this.years.push(this.year - i);
    }
  }

  public generateReports(){
    
  }

}
