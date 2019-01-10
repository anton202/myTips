import { Subject } from 'rxjs';

export class NewTipService{
    editData = new Subject<{tip, index: number}>();
    
}