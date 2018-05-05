import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { AccountsService } from './accounts.service';
import { AnchorNotesDirective } from './anchor-notes.directive';
import { AppNotesComponent } from './app-notes.component';
import { TrigerNotesResolverService } from './triger-notes-resolver.service';
import { products } from './kendo-grid/products';
import { GridColumns, DataTypeOption } from './kendo-grid/kendo-grid-wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  accounts: {name: string, status: string}[] = [];
  @ViewChild(AnchorNotesDirective) appAnchorNotes: AnchorNotesDirective;

  products: any[] = products;
  columns: GridColumns[];

  constructor(
    private accountsService: AccountsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private trigerNotesResolver: TrigerNotesResolverService,
  ) {
    this.columns = [
      {
        columnName: 'ProductID',
        columnDisplay: 'Id',
        dataType: DataTypeOption.string,
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
        width: 120,
        disabled: true
      }
    ];
  }

  ngAfterViewInit() {
    this.accounts = this.accountsService.accounts;
    this.trigerNotesResolver.finishDomModification.subscribe(() => {
      this.loadNotes();
    });
  }

  loadNotes() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AppNotesComponent);
    const viewRefContainer = this.appAnchorNotes.viewContainerRef;

    viewRefContainer.clear();

    const componentRef = viewRefContainer.createComponent(componentFactory);
    (<AppNotesComponent>componentRef.instance).name = 'some Name';
  }
}
