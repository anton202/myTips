import { Component } from "@angular/core";
import {MatDialogRef} from '@angular/material';

@Component({
selector: 'instruction-message',
templateUrl: './instruction.component.html',
styleUrls: ['./instruction.component.css'],
})
export class InstructionMessaageComponent{

    constructor(public dialogRef: MatDialogRef<InstructionMessaageComponent>,){}

    onClick(){
        this.dialogRef.close()
    }
}