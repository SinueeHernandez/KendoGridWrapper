import { Component, Input, OnInit } from '@angular/core';
import { SortDescriptor, orderBy, State, process, composeSortDescriptors } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
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
    /** Indicates the grid height */
    @Input() height = 410;
    /** This option allow to sort by more than one column */
    @Input() multiple = false;
    /** this option enable/disable the sort. Default is true. */
    @Input() allowUnsort = true;
    /** The number of rows per page */
    @Input() pageSize = 5;
    /** Enable disable grouping default enabled */
    @Input() groupable = true;

    state: State = {
        skip: 0,
        take: this.pageSize,
        filter: {
            logic: 'and',
            filters: []
        }
    };
    gridView: GridDataResult;
    dataTypeOption = DataTypeOption;

    constructor() { }

    ngOnInit() {
        this.load();
    }

    private load(): void {
        this.gridView = process(this.gridData, this.state);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridView = process(this.gridData, this.state);
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
    string = 'text',
    number = 'numeric'
}
