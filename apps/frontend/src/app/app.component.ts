import { Component } from '@angular/core';
import { DarkModeService } from '@maglev-training/darkmode';

@Component({
  selector: 'maglev-training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDark$ = this.darkModeService.isDarkMode();
  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggle();
  }


}
