import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], callback: (item: any, value: any) => boolean, value: any): any {
        if (!items || !callback) {
            return items;
        }
        return items.filter(item => callback(item, value));
    }
}