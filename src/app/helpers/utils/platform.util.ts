import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformUtil {
    constructor(private plt: Platform) { }

    public isDesktop(): boolean {
        let desktop = false;
        this.plt.platforms().forEach((p) => {
            if (p === 'desktop') {
                desktop = true;
            }
        });
        return desktop;
    }

    public isMobile(): boolean {
        let mobile = false;
        this.plt.platforms().forEach((p) => {
            if (p === 'mobile') {
                mobile = true;
            }
        });
        return mobile;
    }
}
