import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { ElectronService } from './core/electron/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', environment);
    this.worker();

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  private worker() {
    const worker = new Worker('./shared/markdown-preview.worker', {type: 'module'});
    worker.onmessage = ({data}) => {
      console.log(data);
    };

    worker.postMessage('HELLO');
  }
}
