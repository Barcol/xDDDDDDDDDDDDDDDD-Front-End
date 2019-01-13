import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Plant} from './plant';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {
  private readonly getPlantsListURLPart = '/getPlantsList';
  private readonly addPlantURLPart = '/addPlant';
  private readonly backendURL = `http://${window.location.hostname}:5000`;

  constructor(private httpClient: HttpClient) {
  }

  getPlants(): Observable<Plant[]> {
    const params = new HttpParams()
      .set('userPositionX', '1')
      .set('userPositionY', '1')
      .set('distance', '1');
    const endpointAddress = `${this.backendURL}${this.getPlantsListURLPart}`;
    return this.httpClient.get<Plant[]>(endpointAddress, {params: params});
  }

  // startCycle(scenarioName: string): Observable<Blob> {
  // const params = new HttpParams().set('scenarioName', scenarioName);
  // const endpointAddress = `${this.backendURL}${this.startScenarioURLPart}`;
  // return this.httpClient.get(endpointAddress, {responseType: 'blob', params: params});
  // }
}
