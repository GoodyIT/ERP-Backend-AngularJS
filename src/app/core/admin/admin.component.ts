import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange} from "@angular/flex-layout";
import {ObservableMediaService} from "@angular/flex-layout/media-query/observable-media-service";
import {Router, NavigationEnd} from "@angular/router";
import { UserService } from '../../services/user.service';
const screenfull = require('screenfull');

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav;

  private _mediaSubscription: Subscription;
  
  sidenavOpen: boolean = false;
  sidenavMode: string = 'side';
  isMobile: boolean = false;

  private _routerEventsSubscription: Subscription;

  quickpanelOpen: boolean = false;

  isFullscreen: boolean = false;

  constructor(
    @Inject(ObservableMediaService) private _media$,
    private router: Router, private userService: UserService
  ) { }

  ngOnInit() {
    this._mediaSubscription = this._media$.subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

      this.isMobile = isMobile;
      this.sidenavMode = (isMobile) ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
   // console.log("logout");
  }
}
