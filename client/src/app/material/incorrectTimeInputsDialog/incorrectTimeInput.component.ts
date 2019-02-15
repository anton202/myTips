import { Component } from "@angular/core";
import {MatDialogRef} from '@angular/material';

@Component({
selector: 'incorrect-time-input',
templateUrl: './incorrectTimeInput.component.html'
})
export class IncorrectTimeInputComponent{

    constructor(public dialogRef: MatDialogRef<IncorrectTimeInputComponent>,){}

    onClick(){
        this.dialogRef.close()
    }
}