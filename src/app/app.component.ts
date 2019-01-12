import {Component, ViewChild} from '@angular/core';
import {BackendCommunicatorService} from './backend-communicator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xDDDDD-frontend';

  constructor(private backendCommunicator: BackendCommunicatorService) {
  }

  ngOnInit() {
    this.backendCommunicator.getPlants().subscribe(value => console.log(value));
  }
}
