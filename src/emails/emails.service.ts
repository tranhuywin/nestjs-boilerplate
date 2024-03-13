import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';

import { ON_EVENT_NAMES } from 'constants/on-event-names.constant';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent(ON_EVENT_NAMES.USER_WELCOME)
  async welcomeUser(data: { email: string; name: string }) {
    const { email, name } = data;

    this.mailerService
      .sendMail({
        to: email,
        subject: 'Welcome to our app!',
        template: './user-welcome',
        context: {
          name,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
