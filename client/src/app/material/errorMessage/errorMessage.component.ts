import { Component } from "@angular/core";
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
selector: 'error-message-dialog',
templateUrl: './errorMessage.component.html'
})
export class ErrorMessageComponenet{

    constructor(public dialogRef: MatDialogRef<ErrorMessageComponenet>,){}

    onClick(){
        this.dialogRef.close()
    }
}