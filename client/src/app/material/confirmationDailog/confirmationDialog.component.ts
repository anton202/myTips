import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'confirmationDialog',
    templateUrl: './confirmationDialog.component.html'
})
export class ConfirmationDialog{

    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,@Inject(MAT_DIALOG_DATA) public data: any){}

    onNoClick(){
        this.dialogRef.close()
    }

}