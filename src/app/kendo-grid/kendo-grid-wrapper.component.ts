import { Component, Input, OnInit } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
/**
 * This component is the wrapper to a kengo grid component, but also add sorting, filtering and Front end paging.
 */
@Component({
    selector: 'app-kendo-grid-wrapper',
    templateUrl: 'kendo-grid-wrapper.component.html'
})
export class KendoGridWrapperComponent implements OnInit {
    /** Your data array without process */
    @Input() gridData: any[];
    /** The column description of your data */
    @Input() columns: GridColumns[];
    /** This option allow to sort by more than one column */
    @Input() multiple = false;
    /** this option enable/disable the sort. Default is true. */
    @Input() allowUnsort = true;

    sort = new Array<SortDescriptor>();
    gridView: GridDataResult;
    dataTypeOption = DataTypeOption;

    constructor() { }

    ngOnInit() {
        this.load();
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.load();
    }

    private load(): void {
        this.gridView = {
            data: orderBy(this.gridData, this.sort),
            total: this.gridData.length
        };
    }
}

/**
 * This class provide the columns information in your grid data.
 */
export class GridColumns {
    /** this propety is for set the field property in the kendo column */
    columnName: string;
    /** This is your column header text */
    columnDisplay: string;
    /** Tells the data type of your column use this to get the correct view. */
    dataType: DataTypeOption;
    width: number;
    disabled?: boolean;

    constructor() {
        this.columnDisplay = '';
        this.columnName = '';
        this.dataType = DataTypeOption.string;
        this.disabled = false;
        this.width = 0;
    }
}

export enum DataTypeOption {
    checkbox = 'checkbox',
    date = 'date',
    string = 'string',
    number = 'number'
}
