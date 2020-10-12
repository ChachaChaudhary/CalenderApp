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
2. User SignIn: It returns a JWT token which will be used for Authorization of other services

   End Point: /api/auth/login

   Method: Post
   
   Request:
 ```
 {
   
   "email": "test@gmail.com",  // Email Id of User
   
   "password" : "Test123"   // Password of User
   
   }
   ```   
   Response:
   
   ```
  {
    "resp": {
        "success": true,
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidGVzdDIzMEBnbWFpbC5jb20iLCJuYW1lIjoiUm95IiwiZXhwIjoxNjAzMDg4Njg1LCJpYXQiOjE2MDI0ODM4ODV9.4vD-cYuJ2vKlQVpFzbrMKpOeO7jo0WnpLv96U4uu5Jk"
        }
    }
}
   ```
3. User Log Out: It invalidates the user's session

   End Point: /api/auth/logout

   Method: Get
   
   Request Header:
 ```
  {
   
   "Authorization": "Bearer <jwt_token>",
   
   }
   ```   
   Response:
   
   ```
  {
    "resp": {
        "success": true
    }
  }
   ```
4. Get Schedule User wise in a time range: It list all the schedules of logged in user in given time range

   End Point: api/schedule/list

   Method: Get
   
   Request Header:
 ```
  {
   
   "Authorization": "Bearer <jwt_token>",
   
   }
 ```   
   Query Params:
 ```
  {
   
   "start": "<Unix Time Stamp in milliseconds>",
   "end": "<Unix Time Stamp in milliseconds>" // optional 
   
   }
 ```  
   Response:
   
   ```
  {
    "resp": {
        "success": true,
        "data":[
        {"name":"Dentist","
        description":"",
        "id":2,
        "user_id":1,
        "start_time":1603069766640,
        "end_time":1603069774450
        }
        ]
    }
  }
   ```
5. Create a Schedule: It create schedule of logged in user

   End Point: api/schedule/create

   Method: Post
   
   Request Header:
 ```
  {
   
   "Authorization": "Bearer <jwt_token>",
   
   }
 ```   
   Request:
 ```
  {   
   "name":"Dentist Appointment",
   "description":"Root Canal",
   "end":1602516616857, //Unix Time Stamp in milliseconds
   "start":1602513005475   //Unix Time Stamp in milliseconds
   }
 ```  
   Response:
   
   ```
 {
 "resp":
   {
    "success":true,
    "data":{
    "message":"Successfully created Schedule."
    }
   }
  }
   ```
