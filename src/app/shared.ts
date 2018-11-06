import { PrimeTableColumn } from 'prime-table';
import { SnotifyService } from 'ng-snotify';

export class SharedStuff {
    public static GetColumns = () => {
        return [
            new PrimeTableColumn<any>('Order', 'order'),
            new PrimeTableColumn<any>('Id', 'id'),
            new PrimeTableColumn<any>('Name', 'name'),
            new PrimeTableColumn<any>('Age', 'age'),
            new PrimeTableColumn<any>('E-mail', 'email')
        ];
    }
      public static GetData = (): any[] => {
        return [
            {id: 2, order: 1, name: 'Emil Larsson', age: 24, email: 'emil.larsson@seb.se'},
            {id: 3, order: 2, name: 'Jan Lövgren', age: 46, email: 'jan.lovgren@seb.se'},
            {id: 6, order: 5, name: 'Fredrik Lundberg', age: 43, email: 'fredrik.lundberg@seb.se'},
            {id: 1, order: 4, name: 'Christian Bleckert', age: 41, email: 'christian.bleckert@seb.se'},
            {id: 4, order: 3, name: 'Joel Forsgren', age: 34, email: 'joel.forsgren@seb.se'},
            {id: 5, order: 6, name: 'Unknown User', age: 0, email: 'name@example.com'}
        ];
    }

    public static onAdd = (event: any, snotify: SnotifyService) =>
        snotify.success('Callback to add item called! Item ID: ' + event.id, 'add() called')

    public static onEdit = (event: any, snotify: SnotifyService) =>
        snotify.info('Callback to edit item called! Item ID: ' + event.id, 'edit() called')

    public static onArchive = (event: any, snotify: SnotifyService) =>
        snotify.warning('Callback to archive item called! Item ID: ' + event.id, 'archive() called')

    public static onSelected = (event: {id: number}[], snotify: SnotifyService) =>
        snotify.info('Callback to selected called! Item IDs: ' + event.map(e => e.id).join(','), 'selected() called')
}
