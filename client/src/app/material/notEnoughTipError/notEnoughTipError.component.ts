import { Component } from "@angular/core";
import { MatDialogRef} from '@angular/material';

@Component({
selector: 'notEnoughTipError',
templateUrl: './notEnoughTipError.component.html'
})
export class NotEnoughTipError{

    constructor(public dialogRef: MatDialogRef<NotEnoughTipError>,){}

    onClick(){
        this.dialogRef.close()
    }
}