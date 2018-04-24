import { Component, Input } from '@angular/core';
import { InotesComponent } from './inotes-component';

@Component({
    selector: 'app-notes',
    template: `<button class="btn btn-primary">{{name}}</button>`
})
export class AppNotesComponent implements InotesComponent {
    @Input() name: string;
}

