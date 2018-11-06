import { SharedStuff } from './shared';
import { SnotifyService } from 'ng-snotify';

export abstract class BaseComponent {
    constructor(protected snotify: SnotifyService) { }
    abstract infoText: string;
    onAdd = (event: any, snotify: SnotifyService) => SharedStuff.onAdd(event, this.snotify);
    onEdit = (event: any, snotify: SnotifyService) => SharedStuff.onEdit(event, this.snotify);
    onArchive = (event: any, snotify: SnotifyService) => SharedStuff.onAdd(event, this.snotify);
    onSelected = (event: {id: number}[], snotify: SnotifyService) => SharedStuff.onSelected(event, this.snotify);
}
