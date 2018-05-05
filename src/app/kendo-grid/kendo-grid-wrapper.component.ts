import { Component, Input } from '@angular/core';
/**
 * This component is the wrapper to a kengo grid component, but also add sorting, filtering and Front end paging.
 */
@Component({
    selector: 'app-kendo-grid-wrapper',
    template: `
        <kendo-grid
        [data]="gridData"
        [height]="410">
            <kendo-grid-column field="ProductID" title="ID" width="40">
            </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name" width="250">
            </kendo-grid-column>
            <kendo-grid-column field="Category.CategoryName" title="Category">
            </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Price" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="UnitsInStock" title="In stock" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="Discontinued" title="Discontinued" width="120">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
    `
})
export class KendoGridWrapperComponent {
    /** Your data array without process */
    @Input() gridData: any[];
    /** The column description of your data */
    @Input() columns: GridColumns[];
}

/**
 * This class provide the columns information in your grid data.
 */
export class GridColumns {
    /** this propety is for set the field property in the kendo column */
    columName: string;
    /** This is your column header text */
    columDisplay: string;
    /** Tells the data type of your column use this to get the correct view. */
    dataType: DataTypeOption;
}

export enum DataTypeOption {
    checkbox = 'checkbox',
    date = 'date',
    string = 'string'
}
