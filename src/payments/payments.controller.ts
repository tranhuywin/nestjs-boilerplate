import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/auth/guards/auth.guard'

import { PaymentsService } from './payments.service'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('add-card')
  @UseGuards(AuthGuard)
  addCard() {
    return this.paymentsService.addCardToCustomer({ customerId: 'cus_Pcs1SZTUhSAMSF', cardToken: 'tok_visa' })
  }

  @Post('charge')
  @UseGuards(AuthGuard)
  chargeCard(@Body() body: { amount: number; customerId: string; productId: string }) {
    return this.paymentsService.chargeCard({
      amount: body.amount,
      customerId: body.customerId,
      productId: body.productId,
    })
  }
}
