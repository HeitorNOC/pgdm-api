import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { registerRestaurant } from './routes/register-restaurant'
import { registerCustomer } from './routes/register-customer'
import { sendAuthenticationLink } from './routes/send-authentication-link'
import { createOrder } from './routes/create-order'
import { approveOrder } from './routes/approve-order'
import { cancelOrder } from './routes/cancel-order'
import { getOrders } from './routes/get-orders'
import { createEvaluation } from './routes/create-evaluation'
import { getEvaluations } from './routes/get-evaluations'
import { updateMenu } from './routes/update-menu'
import { updateProfile } from './routes/update-profile'
import { authentication } from './authentication'
import { getProfile } from './routes/get-profile'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import { signOut } from './routes/sign-out'
import { getOrderDetails } from './routes/get-order-details'
import { getMonthReceipt } from './routes/get-month-receipt'
import { getMonthOrdersAmount } from './routes/get-month-orders-amount'
import { getDayOrdersAmount } from './routes/get-day-orders-amount'
import { getMonthCanceledOrdersAmount } from './routes/get-month-canceled-orders-amount'
import { getDailyReceiptInPeriod } from './routes/get-daily-receipt-in-period'
import { getPopularProducts } from './routes/get-popular-products'
import { dispatchOrder } from './routes/dispatch-order'
import { deliverOrder } from './routes/deliver-order'
import { register } from './routes/register'
import { getProfileByEmail } from './routes/get-profile-by-email'
import { login } from './login'
import { getSteps } from './routes/steps'
import { getHistories } from './routes/historias'
import { getCircuits } from './routes/circuits'
import { circuitSteps } from '@/db/schema/circuitSteps'
import chalk from 'chalk'
import { getCircuitSteps } from './routes/circuitSteps'
import { createUser, getStudentTeacher, getUser, getUserByTeacherCode, updateUser, updateUserTeacherCode } from './routes/users'

const app = new Elysia()
  .onRequest(({ request }) => {
    const method = request.method
    const url = new URL(request.url)
    console.log(`📌 Rota chamada: ${chalk.green(method)} ${url.pathname}`)
  })
  .use(
    cors({
      credentials: true,
      allowedHeaders: [
        'Authorization',
        'Content-Type',
        'Accept',
        'X-Requested-With',
        'Origin'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request: any) => {
        const origin = request.headers.get("origin");
        return origin ? origin : "*"; // Permite qualquer origem
      },
    }),
  )
  //.use(authentication)
  .use(signOut)
  .use(getProfile)
  // .use(getManagedRestaurant)
  // .use(registerRestaurant)
  // .use(registerCustomer)
  // .use(sendAuthenticationLink)
  // .use(authenticateFromLink)
  // .use(createOrder)
  // .use(approveOrder)
  // .use(cancelOrder)
  // .use(dispatchOrder)
  // .use(deliverOrder)
  // .use(getOrders)
  // .use(getOrderDetails)
  // .use(createEvaluation)
  // .use(getEvaluations)
  // .use(updateMenu)
  // .use(updateProfile)
  // .use(getMonthReceipt)
  // .use(getMonthOrdersAmount)
  // .use(getDayOrdersAmount)
  // .use(getMonthCanceledOrdersAmount)
  // .use(getDailyReceiptInPeriod)
  // .use(getPopularProducts)
  // .use(register)
  // .use(getProfileByEmail)
  .use(login)
  .use(getSteps)
  .use(getHistories)
  .use(getCircuits)
  .use(getCircuitSteps)
  .use(updateUser)
  .use(updateUserTeacherCode)
  .use(createUser)
  .use(getUser)
  .use(getUserByTeacherCode)
  .use(getStudentTeacher)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
      }
      default: {
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3333)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
