# DevTinder APIs 

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/data
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId


## userRouter
- GET /user/request/received
- GET /user/connections
- GET /user/feed -Gets the profiles of other users on platform


- Status: Interested, Ignored, Accepted, Rejected