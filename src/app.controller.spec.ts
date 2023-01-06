import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getBays', () => {
    it('should return 0 nhits', async () => {
      const filter = {
        address: '',
        dist: 0
      };
      expect(await appController.getBays({ body: filter })).toHaveProperty('nhits', 0);
    });
  });
});
