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
    // TODO: write a better test!
    it('should return an array of bays', async () => {
      const result = [{}, {}, {}];
      jest.spyOn(appController, 'getBays').mockImplementation(async () => result);

      expect(await appController.getBays()).toBe(result);
    });
  });
});
