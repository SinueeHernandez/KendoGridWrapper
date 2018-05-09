import { Component, Input, OnInit, EventEmitter, Output, style } from '@angular/core';
import { SortDescriptor, orderBy, State, process, composeSortDescriptors, GroupDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
/**
 * This component is the wrapper to a kengo grid component, but also add sorting, filtering and Front end paging.
 */
@Component({
    selector: 'app-kendo-grid-wrapper',
    templateUrl: 'kendo-grid-wrapper.component.html',
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
    /** Enable disable grouping default disabled */
    @Input() groupable = false;
    /** Enable disable pagination default enabled */
    @Input() pageable = true;
    /** Set the selected row by ROW INDEX */
    @Output() selectedRowIndexChange = new EventEmitter<number>();
    @Input() selectedRowIndex: number;
    /** gives your the selected item */
    @Output() selectedItem = new EventEmitter<any>();
    /** in case your grid had dropdowns columns you can lisent the click with this event */
    @Output() ddlClickedEmitter = new EventEmitter<any>();
    /** in case your grid had dropdowns columns you can lisent the changes with this event */
    @Output() ddlChangeEmitter = new EventEmitter<any>();

    togglePageable = new EventEmitter<{pageable: boolean, take: number}>();
    toggleGroupable = new EventEmitter<boolean>();
    gridSelected = [0];

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

    constructor() {
        this.togglePageable.subscribe((conf: {pageable: boolean, take: number}) => {
            if (!conf.pageable) {
                this.state = {
                    sort: this.state.sort,
                    filter: this.state.filter,
                    group: this.state.group
                };
            } else {
                this.state = {
                    skip: 0,
                    take: conf.take,
                    sort: this.state.sort,
                    filter: this.state.filter,
                    group: this.state.group
                };
            }
            this.load();
        });
        this.toggleGroupable.subscribe((groupable: boolean) => {
            this.state = {
                skip: this.state.skip,
                take: this.state.take,
                sort: this.state.sort,
                filter: this.state.filter,
                group: []
            };
            this.load();
        });
    }

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

    selectRow(event: any): void {
        this.gridSelected = [event.index];
        this.selectedRowIndexChange.emit(event.index);
        this.selectedItem.emit(this.gridView.data[event.index]);
    }

    ddlClicked(event: any) {
        this.ddlClickedEmitter.emit(event);
    }

    ddlChange(event: any) {
        console.log(event);
        this.ddlChangeEmitter.emit(event);
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
    /** Indicates in the column width in px */
    width: number;
    /** makes disabled the field. In case  of date, checkbox or dropdown*/
    disabled?: boolean;
    /** Provides the data for the dropdown only use in dropdown columns */
    ddlData?: any[];
    /** Indicates the name of the property in data, to take as value in the ddl when is collapsed */
    ddlValueField?: string;
    /** Indicates the name of the property in data, to show in the ddl when is collapsed */
    ddlTextField?: string;
    /** indicate the name of the property in data, to show when the ddl is poped up */
    ddlLongText?: string;

    constructor() {
        this.columnDisplay = '';
        this.columnName = '';
        this.dataType = DataTypeOption.string;
        this.disabled = false;
        this.width = 0;
        this.ddlValueField = '';
        this.ddlTextField = '';
        this.ddlLongText = '';
    }
}
/** Helps to render your column with the correct configuration */
export enum DataTypeOption {
    /** use for booleans */
    checkbox = 'checkbox',
    /** use for date objects  */
    date = 'date',
    /** use for any string like */
    string = 'text',
    /** use for number */
    number = 'numeric',
    /** use for dropdown where the data is complex  column: {id: type, description: type} */
    dropdown = 'dropdown',
    /** use for dropdown where the data is just the key column: id */
    dropdownsimple = 'dropdownsimple'
}
