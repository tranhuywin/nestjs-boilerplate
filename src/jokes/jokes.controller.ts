import { Controller, Get, Req, Res } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Request, Response } from 'express';
import { VIEWS } from 'src/constants/cookies.constant';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('/random')
  async findRandom(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const exceptIds = req.cookies[VIEWS] || [];
    const joke = await this.jokesService.findRandom(exceptIds);
    if (joke) {
      res.cookie(VIEWS, [...exceptIds, joke.id]);
      return joke;
    }
    return {
      message: `That's all the jokes for today! Come back another day!`,
    };
  }

  @Get()
  async findAll() {
    return this.jokesService.findAll();
  }
}
