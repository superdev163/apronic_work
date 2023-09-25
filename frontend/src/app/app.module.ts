import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { EventService } from './shared/services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketService } from './shared/services/socket.service';
import { EventsComponent } from './pages/events/events.component';
import { environment } from '../environments/environment.dev';

@NgModule({
  declarations: [AppComponent, EventsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SocketIoModule.forRoot({ url: environment.SeverUrl }),
  ],
  providers: [EventService, ApiService, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
