import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { AccountsService } from './accounts.service';
import { AnchorNotesDirective } from './anchor-notes.directive';
import { AppNotesComponent } from './app-notes.component';
import { TrigerNotesResolverService } from './triger-notes-resolver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  accounts: {name: string, status: string}[] = [];
  @ViewChild(AnchorNotesDirective) appAnchorNotes: AnchorNotesDirective;


  constructor(
    private accountsService: AccountsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private trigerNotesResolver: TrigerNotesResolverService,
  ) {}

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
