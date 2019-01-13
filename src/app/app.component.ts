import {Component, ViewChild} from '@angular/core';
import {BackendCommunicatorService} from './backend-communicator.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Plant} from './plant';

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
  public plantList: Plant[];
  public latitude: number;
  public longitude: number;

  addPlant() {
    this.backendCommunicator.addPlant(this.nameInput.nativeElement.value, this.latitude,
      this.longitude).subscribe(value => this.loadPlants());
    console.log(this.longitude);
    console.log(this.latitude);
  }

  loadPlants() {
    this.backendCommunicator.getPlants(this.latitude, this.longitude).subscribe(value =>
      this.plantList = value
    );
  }

  constructor(private backendCommunicator: BackendCommunicatorService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.mapSource = 'https://www.openstreetmap.org/export/embed.html?bbox=19.897978305816654%2C50.06455675425243%2C19.915895462036136%2C50.070348454143506&layer=mapnik&marker=50.067452691620716%2C19.90693688392639';
    this.loadPlants();
    this.geoLocalizator();
  }

  geoLocalizator(){
    var geo = navigator.geolocation;
    geo.getCurrentPosition(function (location) {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
    });
  }
  nameReveal(plant: Plant) {
    this.mapSource = `https://www.openstreetmap.org/export/embed.html?bbox=${plant.positionY - 0.02}%2C${plant.positionY - 0.02}%2C${plant.positionX + 0.02}%2C${plant.positionY + 0.02}&layer=mapnik&marker=${plant.positionX}%2C${plant.positionY}`;
  }
}
