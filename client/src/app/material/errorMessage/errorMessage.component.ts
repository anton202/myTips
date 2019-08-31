import { Component, Inject} from "@angular/core";
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'error-message-dialog',
    templateUrl: './errorMessage.component.html',
    styleUrls: ['./errorMessage.component.css']
})
export class ErrorMessageComponenet {

    constructor(public dialogRef: MatDialogRef<ErrorMessageComponenet>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onClick() {
        this.dialogRef.close()
    }
}