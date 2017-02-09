import { Directive, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { SidenavService } from "./sidenav.service";
import { SidenavItem } from "../sidenav-item/sidenav-item.model";
import { MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import {ObservableMediaService} from "@angular/flex-layout/media-query/observable-media-service";

@Directive({
  selector: '[msIconSidenav]'
})
export class IconSidenavDirective implements OnInit {

  private _mediaSubscription: Subscription;
  isMobile: boolean = false;

  @HostBinding('class.icon-sidenav')
  get isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  @HostBinding('class.collapsed')
  collapsed: boolean;

  currentlyOpen: SidenavItem[];

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = false;

      this.sidenavService.nextCurrentlyOpen(this.currentlyOpen);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = true;

      this.currentlyOpen = this.sidenavService.currentlyOpen;
      this.sidenavService.nextCurrentlyOpen([]);
    }
  }

  constructor(
    private sidenavService: SidenavService,
    @Inject(ObservableMediaService) private _media$
  ) { }

  ngOnInit() {
    this._mediaSubscription = this._media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
    });
  }

}
