import { NgModule } from '@angular/core';

/* -------- Angular Materials -------- */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

/* -------- PrimeNg Materials -------- */
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    // Angular Materials
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    // PrimeNg Materials
    ButtonModule,
    TableModule,
    CardModule,
    MessagesModule,
    MessageModule,
  ],
  exports: [
    // Angular Materials
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    // NgPrime Materials
    ButtonModule,
    TableModule,
    CardModule,
    MessagesModule,
    MessageModule,
  ],
})
export class MaterialModule {}
