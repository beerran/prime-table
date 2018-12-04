import { SharedStuff } from './shared';
import { SnotifyService } from 'ng-snotify';

export abstract class BaseComponent {
    constructor(protected snotify: SnotifyService) { }
    abstract infoText: string;
    onAdd = (event: any) => SharedStuff.onAdd(event, this.snotify);
    onEdit = (event: any) => SharedStuff.onEdit(event, this.snotify);
    onSelected = (event: {id: number}[]) => SharedStuff.onSelected(event, this.snotify);
}
