# DevGarde APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
<!-- - POST /request/send/ignored/:userId -->
<!-- - POST /request/send/interested/:userId -->
- POST /request/send/:status/:userId

<!-- - POST /request/review/accepted/:requestId -->
<!-- - POST /request/review/rejected/:requestId -->
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - Gets you the profiles of the other users on platform

Status: ignored, interested, accepted, rejected
