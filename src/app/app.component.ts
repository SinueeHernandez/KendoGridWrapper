import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { AccountsService } from './accounts.service';
import { DataTypeOption, GridColumns, KendoGridWrapperComponent } from './kendo-grid/kendo-grid-wrapper.component';
import { products } from './kendo-grid/products';
import { TrigerNotesResolverService } from './triger-notes-resolver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('grid') grid: KendoGridWrapperComponent;

  products: any[] = products;
  columns: GridColumns[];
  pageable: boolean;
  take = 5;
  groupable: any;

  constructor(
    private accountsService: AccountsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private trigerNotesResolver: TrigerNotesResolverService,
  ) {
    this.columns = [
      {
        columnName: 'ProductID',
        columnDisplay: 'Id',
        dataType: DataTypeOption.number,
        width: 40
      },
      {
        columnName: 'ProductName',
        columnDisplay: 'Name',
        dataType: DataTypeOption.string,
        width: 250
      },
      {
        columnName: 'Category.CategoryName',
        columnDisplay: 'Category',
        dataType: DataTypeOption.string,
        width: 80
      },
      {
        columnName: 'UnitPrice',
        columnDisplay: 'Price',
        dataType: DataTypeOption.number,
        width: 80
      },
      {
        columnName: 'UnitsInStock',
        columnDisplay: 'In stock',
        dataType: DataTypeOption.number,
        width: 80
      },
      {
        columnName: 'Discontinued',
        columnDisplay: 'Discontinued',
        dataType: DataTypeOption.checkbox,
        width: 60,
        disabled: true
      },
      {
        columnName: 'FirstOrderedOn',
        columnDisplay: 'First Ordered On',
        dataType: DataTypeOption.date,
        width: 160
      }
    ];

    this.pageable = true;
    this.groupable = false;
  }

  togglePageable() {
    this.pageable = !this.pageable;
    this.take = this.pageable ? 5 : 0;
    this.grid.togglePageable.emit({pageable: this.pageable, take: this.take});
  }

  toggleGroupable() {
    this.groupable = !this.groupable;
    this.grid.toggleGroupable.emit(this.groupable);
  }
}
