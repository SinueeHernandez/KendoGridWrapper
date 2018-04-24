import { EventEmitter } from '@angular/core';

export class TrigerNotesResolverService {
    finishDomModification = new EventEmitter<boolean>();
}
