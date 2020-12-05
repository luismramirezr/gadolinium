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
user -> WebClient : Place order
WebClient -> server
server -> authenticator : Request token
authenticator -> server
server -> payment_service : Make payment
payment_service -> authenticator : Verify token
authenticator -> payment_service
payment_service -> payment_gateway : Request payment
payment_gateway -> payment_service : Response
payment_service -> server
server -> WebClient
WebClient -> user
payment_gateway -> notifier : Transaction update
notifier -> authenticator : Request token
authenticator -> notifier
notifier -> server : Update Order
server -> authenticator : Verify token
authenticator -> server
server -> WebClient
WebClient -> user
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
