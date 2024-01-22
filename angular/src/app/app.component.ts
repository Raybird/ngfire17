import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular';
  firestore: Firestore = inject(Firestore);
  item$: Observable<any[]>;

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData(itemCollection, {idField:'id'});
  }
}
