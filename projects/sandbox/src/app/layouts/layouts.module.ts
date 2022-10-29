import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components';
import { MainLayoutComponent } from './main/main.component';

@NgModule({
    declarations: [
        MainLayoutComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatToolbarModule
    ],
    exports: [
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
