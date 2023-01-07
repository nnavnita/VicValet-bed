import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) { }
  async getBays(filters: FilterObj): Promise<any> {
    const coords: Coords = await this.getLatLong(filters.address);
    const geofilterDistance = `${coords.lat}%2C${coords.lng}%2C${filters.dist ?? 1000}` // 1km radius by default
    const refineStatus = filters.hideOccupied ? "&refine.status=Unoccupied" : "";
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`https://data.melbourne.vic.gov.au/api/records/1.0/search/?dataset=on-street-parking-bay-sensors&q=&facet=status&facet=parking_zone&facet=last_updated&geofilter.distance=
        ${geofilterDistance}
        ${refineStatus}
      `).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw '[app.service.ts > getBays] An error happened!';
        }),
      ),
    );

    return data;
  }
  private async getLatLong(address: String): Promise<Coords> {
    if (!address.length) {
      return {
        lat: 0,
        lng: 0
      }
    }
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(/\ /g, '+')}&key=${process.env.API_KEY}`).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw '[app.service.ts > getLatLong] An error happened!';
        }),
      ),
    );

    return data.results[0].geometry.location;
  }
}
