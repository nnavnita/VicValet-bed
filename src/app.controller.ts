import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getBays(): Promise<any> {
    // TODO: get these values from the user
    const filter = {
      lat: -37.813742,
      long: 144.953649
    };
    const result = await this.appService.getBays(filter);
    return result;
  }
}
