import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.css']
})
export class ContactAppComponent implements OnInit {

public loading:boolean = false;
public contacts: IContact[] = [];
public errorMessage: string | null = null;

  activeModal: any;
  contactId: string | undefined;

constructor(private contactService: ContactService,
            private modalService: NgbModal) { 

}

ngOnInit(): void {
  this.getAllContactsFromServer();
}

public getAllContactsFromServer(){
  this.loading = true;
  this.contactService.getAllContacts().subscribe(
    (data: IContact[]) => {
      this.contacts = data;
      this.loading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
}

// Delete function (No confirmationModal)

// public clickDeleteContact(contactId:string | undefined){
//   if(contactId){
//     this.contactService.deleteContact(contactId).subscribe(
//       (data:{}) => {
//         this.getAllContactsFromServer();

//       }, (error) => {
//           this.errorMessage = error;
//       });
//   }
// }

openConfirmationModal(contactId:string | undefined) {
  this.contactId = contactId;

  const modalRef = this.modalService.open(ConfirmationModalComponent);
  modalRef.componentInstance.message = 'Are you sure you want to delete the contact?';

  modalRef.result.then((result) => {
    if (result === true) {
      
      // Logique de suppression de l'élément
      this.deleteElement();
    } else {
      // Logique si l'utilisateur annule ou ferme la modal
      this.cancelDeletion();
    }
  }).catch((reason) => {
    // Logique en cas d'erreur ou de rejet de la modal
    this.handleModalDismiss(reason);
  });
}


deleteElement() {
  if (this.contactId) {
    this.contactService.deleteContact(this.contactId).subscribe(
      (data: {}) => {
        console.log("L'élément a été supprimé avec succès");
        this.getAllContactsFromServer();
        this.activeModal.close(true);
        
      },
      (error) => {
        console.log("Une erreur s'est produite lors de la suppression de l'élément");
      }
    );
  }
}

cancelDeletion() {
  console.log("La suppression a été annulée");
}

handleModalDismiss(reason: any) {
  console.log("Une erreur s'est produite ou la modal a été rejetée :", reason);
}

}

