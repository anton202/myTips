import { Tip } from '../tip.model'; 
import { Subject } from 'rxjs';

export class NewTipService{
    editData = new Subject<{tip:Tip, index: number}>();
    
}