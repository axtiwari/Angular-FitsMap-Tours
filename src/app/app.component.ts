import { Component } from '@angular/core';
import {MarkerService} from './services/marker.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  title: string = 'FitsMap Tours';
  //Zoom level
  zoom: number = 12;
  //Start position
  lat: number = 47.61731;
  lng: number = -122.3320708;
  //Values
  markerName:string;
  markerLat:string;
  markerLng:string;
  markerDraggable:string;
  //Markers
  markers: marker[];
  constructor(private _markerService:MarkerService){
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker:marker, index:number){
    console.log('Clicked Marker:' + marker.name+"at index" +index)
  }

  mapClicked($event:any){
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker)
    console.log(this.markers.indexOf(newMarker))
  }
  markerDragEnd(marker:any, $event:any){
    console.log('dragEnd', marker, $event);

    var updatedMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }
    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;
  }

  addMarker(){
    console.log('Adding Marker')
    if(this.markerDraggable == 'yes'){
      var isDraggable = true;
    }else{
      var isDraggable = false;
    }
    var newMarker = {
      name:this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable:isDraggable
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }
}

//Marker Type
interface marker{
  name? : string;
  lat: number;
  lng: number;
  draggable: boolean;
}