import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerService } from 'src/app/core/core.index';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone:true,
  imports:[RouterModule,CommonModule]
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}

  loading$ = this.spinner.loading$;


}
