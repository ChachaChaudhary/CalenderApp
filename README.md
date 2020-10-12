# CalenderApp
Calender App to create/update Appointments


## How to Setup Server?

1. Run `npm install` to download all the dependencies.
2. Run `npm run start` for starting a dev server. It will start at `http://localhost:8001/`.


## End Points

1. User SignUp:

   End Point: /api/auth/signup

   Method: Post
   
   Request:
 ```
 {
   
   "name": "Test", // Name of User
   
   "email": "test@gmail.com",  // Email Id of User, should be unique
   
   "password" : "Test123"   // Password of User
   
   }
   ```   
   Response:
   
   ```
   {
   
   "resp": {
   
   "success": true,
   
   "data": {
   
   "message": "Successfully registered."
   
   }
   
   }
   
   }
   ```



