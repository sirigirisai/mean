import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'
import { ProductsdataService } from './productsdata.service';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  	ToastrModule.forRoot({
      timeOut: 1100,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ],
  providers: [ProductsdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
