import { parse, stringify } from 'flatted';
import { IClonable } from './interfaces/IClonable';
import { Dictionary } from './data-structures/dictionary';
import { Constants } from './constants';

export class Helpers {

    static ToBoolean(value: any): boolean {
        switch (value) {
            case 1:
            case true:
            case Constants.TRUE:
                return true;

            case 0:
            case false:
            case Constants.FALSE:
                return false;

            default:
                return false;
        }
    }

    static Guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (subString) => {
            const random = Math.random() * 16 | 0;
            const value = subString === 'x' ? random : (random & 0x3 | 0x8);
            return value.toString(16);
        });
    }

    static Deserialize<T extends IClonable>(json: string, type: new () => T): T {
        let source = parse(json);

        let destination = new type();
        destination.Clone(source);
        return destination;
    }

    static Serialize<T extends IClonable>(object: T): string {
        return stringify(object);;
    }

    static ParseUrlHash(url: string): Dictionary<string, string> {
        if (!url)
            return null;

        url = decodeURIComponent(url);

        let temp = url.split('#', 2);
        if (!temp || temp.length !== 2)
            return null;

        temp = temp[1].split('&');
        if (!temp || temp.length === 0)
            return null;

        let parts = new Dictionary<string, string>();
        for (let str of temp) {
            let arr = str.split('=');
            if (arr && arr.length === 2)
                parts.Set(arr[0], arr[1]);
        }
        return parts;
    }
}