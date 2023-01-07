import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('getBays')
  async getBays(@Req() filter: { body: FilterObj }): Promise<any> {
    // TODO: get these values from the user
    const result = await this.appService.getBays(filter.body);
    return result;
  }
}
