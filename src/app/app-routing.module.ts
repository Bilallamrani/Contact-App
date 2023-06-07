import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAppComponent } from './components/contact-app/contact-app.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

const routes: Routes = [
    {path : '', redirectTo: 'contacts/admin', pathMatch: 'full' },
    {path : 'contacts/admin', component: ContactAppComponent},
    {path : 'contacts/add', component: AddContactComponent},
    {path : 'contacts/edit/contactId', component: EditContactComponent},
    {path : 'contacts/view/contactId', component: ViewContactComponent},
    
];

@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
})

export class AppRoutingModule {}