# Gadolinium
AWS serverless e-commerce application.
## Services
1. Server: Backend of the main application (Node.JS)
1. WebClient: UI for Customers (Next.JS)
1. Administrator: UI for Administrators (React.JS)
1. Authenticator: Used to authenticate internal requests between services. This services uses TOTP for token generation and authentication (Node.JS)
1. PaymentService: Responsible for processing the payments requests from Server and communicating with the PaymentGateway (Node.JS)
1. PaymentGateway: The external Payment Provider
1. Notifier: Receives notifications from the Payment Gateway. Gets the updated transaction and sends it to Server (Node.JS)
1. DynamoDB: This project uses DynamoDB as the database

### Diagram
```plantuml
actor user
user -> webClient : Place order
webClient -> server
server -> authenticator : Request token
authenticator -> server
server -> payment_service : Make payment
payment_service -> authenticator : Verify token
authenticator -> payment_service
payment_service -> payment_gateway : Request payment
payment_gateway -> payment_service : Response
payment_service -> server
server -> webClient
webClient -> user
payment_gateway -> notifier : Transaction update
notifier -> authenticator : Request token
authenticator -> notifier
notifier -> server : Update Order
server -> authenticator : Verify token
authenticator -> server
server -> webClient
webClient -> user
```

### Order pipeline
```plantuml
actor user
user -> webClient : Register as Customer
webClient -> server : POST /customer
server -> webClient
alt : sign in
user -> webClient : Sign in
webClient -> server : POST /sessions
server -> webClient
end
user -> webClient : Place Order
webClient -> server : POST /customer/:customerId/orders
note left: Order includes products and selected address
server -> webClient
webClient -> server : POST /customer/:customerId/orders/:orderId/transactions
note left : Sends aditional payment data (eg. credit card)
server -> authenticator : POST /create
authenticator -> server
server -> payment_service : POST /makePayment?key={key}
payment_service -> authenticator : POST /verify
authenticator -> payment_service
payment_service -> payment_gateway : Place order
payment_gateway -> payment_service
payment_service -> server
server -> webClient
webClient -> user
```

### Notification pipeline
```plantuml
payment_gateway -> SNS
SNS -> notifier : POST /notification
notifier -> authenticator : POST /create
authenticator -> notifier
notifier -> payment_service : POST /notification?key={key}
payment_service -> authenticator : POST /verify
authenticator -> payment_service
payment_service -> payment_gateway : GET /notification
note right : Get transaction update from notification
payment_gateway -> payment_service
payment_service -> authenticator : POST /create
authenticator -> payment_service
payment_service -> server : PUT /orders/:orderId/transactions
note right : Update Order status
server -> payment_service
```

## Usage
### Pre-requisites
1. Docker Compose
1. Puma-dev
### Run
1. First, create endpoints with `puma-dev`:
```bash
echo '3000' > ~/.puma-dev/gadolinium
echo '3001' > ~/.puma-dev/backoffice.gadolinium
echo '3333' > ~/.puma-dev/api.gadolinium
echo '4000' > ~/.puma-dev/authenticator.gadolinium
echo '5000' > ~/.puma-dev/payment.gadolinium
echo '6000' > ~/.puma-dev/notifier.gadolinium
```
2. Create `.env` files on each service root based on `.env.example`
3. Start containers by using `docker-compose up` on root folder
4. Access `http://gadolinium.test` for `web-client` or `http://backoffice.gadolinium.test` for `backoffice`.
