import { Component, EventEmitter, Output, output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Emitter } from '@fullcalendar/core/internal';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-setting-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './setting-menu.component.html',
  styleUrl: './setting-menu.component.scss'
})
export class SettingMenuComponent {
_tab:number=1
@Output() tab = new EventEmitter<number>();


changeTab(_t:number){
  this._tab=_t;
  this.tab.emit(this._tab);
}





}
