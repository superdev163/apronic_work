import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRowComponent } from './components/event-row/event-row.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  declarations: [EventRowComponent, EventFormComponent, HeaderComponent],
  exports: [EventRowComponent, EventFormComponent, HeaderComponent],
})
export class SharedModule {}
