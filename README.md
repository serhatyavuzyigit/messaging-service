# Messaging Service

## used libraries
	- bcrypt
	- chai
	- chai-http
	- express
	- jsonwebtoken
	- mocha
	- mongoose
	- morgan
	- nodemon
	- body-parser

## running service
	- There is a "docker-compose.yml" file in the project. You can start the project with "docker-compose up" command
	in your terminal. The app will work on your local host: http://localhost:3000/
   
## end points

### user
	- When you try to get all the users information you can GET this request: http://localhost:3000/user
	- When you want to create new user you should POST to this request: http://localhost:3000/user/signup
		You should give email, username and password informations in request body. For example:
        	{
            	"email": "samplemail@samplehost.com",
                "username": "sampleusername",
                "password": "samplepassword"
            }
            
            You Should give valid email otherwise app will give you an error. Also if there is already same 
            email or username in the database app will give you an error.
    - When you want to login to your account you should POST to this request: http://localhost:3000/user/login
    	You should give username and password informations in request body. Your username and password must be matched.
        If you successfully login you will get a token. You will use this token after.

## friends 
	- When you want to add someone to your friend list you should POST to this request: http://localhost:3000/friends
		You should give friendFrom and friendTo informations in request body. friendFrom is your username.You should give
        your token to request header with "Authorization" key otherwise the request won't work. Example request body:
        	{
            	"friendFrom": "yourusername",
                "friendTo": "sampleusername"
            }
            - If "friendTo" username is not valid app will give you an error. 
            - If you used to block "friendTo" then it will erase from your blocks list and added to your friends list.

## blocks
	- When you want to add someone to your blocks list you should POST to this request: http://localhost:3000/blocks
		You should give blockFrom and blockTo informations in request body. blockFrom is your username.You should give
        your token to request header with "Authorization" key otherwise the request won't work. Example request body:
        	{
            	"blockFrom": "yourusername",
                "blockTo": "sampleusername"
            }
            - If "blockTo" username is not valid app will give you an error. 
            - If you used to friend with "blockTo" then it will erase from your friends list and added to your 
              blocks list.
              
## message
	- When you want to send a message to your friend you should POST to this request: http://localhost:3000/message
		You should give messageFrom, messageTo and content information in request body. messageFrom is your username.
        You should give your token to request header with "Authorization" key otherwise the request won't work.
        Example request body:
        	{
            	"messageFrom": "yourusername",
                "messageTo": "sampleusername",
                "content": "message content"
            }
            
            - If "messageTo" is not your friend then app will give you an error.
            - If "messageTo" is in your blocks then app will give you an error.
            - If "messageTo" blocked you then app will give you an error.
    - When you want to see your old messages you give your username to request parameter. Also you should give your 
      token to request header with "Authorization" key otherwise the request won't work.
      You need to GET to this request: http://localhost:3000/friends/yourusername
