import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from 'src/stripe/constants'

// cus_Pcs1SZTUhSAMSF

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(STRIPE_CLIENT)
    private readonly stripe: Stripe,
  ) {}

  listCustomers() {
    return this.stripe.customers.list()
  }

  async addCardToCustomer({ customerId, cardToken }: { customerId: string; cardToken: string }) {
    return this.stripe.customers.createSource(customerId, {
      source: cardToken,
    })
  }

  async chargeCard({
    amount: _amount,
    customerId: _customerId,
    productId: _productId,
  }: {
    amount: number
    customerId: string
    productId: string
  }) {
    const _a = 1
    const _b = 2
    return ''
  }
}
