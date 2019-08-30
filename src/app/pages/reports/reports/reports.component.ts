import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/service/category.service'; 
import { Entry } from '../../entries/models/entry.model';
import { EntryService } from '../../entries/service/entry.service';
import { rootRoute } from '@angular/router/src/router_module';
var currencyFormatter = require('currency-formatter');
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  monthList = [
    { value: 1, text: 'Janeiro' },
    { value: 2, text: 'Fevereiro' },
    { value: 3, text: 'Março' },
    { value: 4, text: 'Abril' },
    { value: 5, text: 'Maio' },
    { value: 6, text: 'Junho' },
    { value: 7, text: 'Julho' },
    { value: 8, text: 'Agosto' },
    { value: 9, text: 'Setembro' },
    { value: 10, text: 'Outubro' },
    { value: 11, text: 'Novembro' },
    { value: 12, text: 'Dezembro' }
  ];

  years: Array<any> = [];

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any; 
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getYears();
    this.getCategories();
  }

  public generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
  
    if(!month || !year) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios');
    } else {
      this.getByMounthAndYear(month,year);
    }
  }

  private getYears() {
    const fullYear = new Date().getFullYear();
    for (var i = 0; i < 7; i++) {
      this.years.push(fullYear - i);
    }
  }

  private getCategories() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  private getByMounthAndYear(month: number, year: number ) {
    this.entryService.getByMounthAndYear(month, year).subscribe(this.setValues.bind(this));
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'})
      } else {
        expenseTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'})
      }
      this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
      this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
      this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
    })
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráficos de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráficos de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string){
    const chartData = []
    this.categories.forEach(category => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId == category.id) && (entry.type == entryType)
      )
      // if found entries, then sum entries amount and add to chartData
      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, {code: 'BRL'}), 0
        );
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }
    });
    
    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}
