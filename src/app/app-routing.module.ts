import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecordTableComponent} from './record-table/record-table.component';


const routes: Routes = [
  {path: '', component: RecordTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
