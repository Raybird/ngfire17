import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, JsonPipe],
  template: `
<div>
  <h1>index</h1>
  @for (item of item$ | async; track $index) {
      <pre><code>{{ item |json }}</code></pre>
  }
  <p>
    <a [routerLink]="['/']" routerLinkActive="router-link-active" >login</a>
  </p>
</div>
  `,
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  firestore: Firestore = inject(Firestore);
  item$: Observable<any[]>;

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData(itemCollection, { idField: 'id' });
  }

}
