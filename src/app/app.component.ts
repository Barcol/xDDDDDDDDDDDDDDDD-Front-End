import {Component, ViewChild} from '@angular/core';
import {BackendCommunicatorService} from './backend-communicator.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('name') nameInput;
  @ViewChild('positionX') positionXInput;
  @ViewChild('positionY') positionYInput;
  public mapSource: String;

  addPlant() {
    this.backendCommunicator.addPlant(this.nameInput.nativeElement.value, this.positionXInput.nativeElement.value,
      this.positionYInput.nativeElement.value).subscribe();
  }

  constructor(private backendCommunicator: BackendCommunicatorService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.backendCommunicator.getPlants().subscribe(value => console.log(value));
    this.mapSource = 'https://www.openstreetmap.org/export/embed.html?bbox=19.897978305816654%2C50.06455675425243%2C19.915895462036136%2C50.070348454143506&layer=mapnik&marker=50.067452691620716%2C19.90693688392639';
  }
}
