import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from './dark-mode.service';

@NgModule({
  imports: [CommonModule],
  providers: [DarkModeService]
})
export class DarkModeModule {}
