import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformUtil {
    constructor(private plt: Platform) { }

    public isDesktop(): boolean {
        return !!this.plt.platforms().indexOf('desktop');
    }

    public isMobile(): boolean {
        return !this.plt.platforms().indexOf('desktop');
    }
}
