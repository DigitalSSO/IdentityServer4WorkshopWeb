# IdentityServer4Workshop

## Demo 1

// Nie instalirame is4 s gotova konfiguraciq i pokazwame kakwo ima vutre i kak raboti

You have reached the part of the workshop when you have enough knowledge about authentication, authorization and IdentityServer4 components. It is time to have fun!
Postman:
1. Import file `IdentityServer4Workshop.postman_collection.json` in Postman
2. Run in `dotnet new is4empty` in your directory
3. Open `Config.cs` file and add new `Client` with the following properties 

	3.1. `ClientId`
  
	3.2. `ClientName`
  
	3.3. `AllowedGrantTypes` - supporting `ResourceOwnerPassword`
  
	3.4. `Client secret`
4. Add a test user to `Config.cs`. It functionality is the same as adding a new Client
5. Add the test user after adding the memory clients by using method AddTestUsers()
4. Run the application
5. Open the discovery endpoint `https://localhost:5000/.well-known/openid-configuration`. If the page is not loading you are having problems with your configuration. Revise your work or ask the mentors.
6. Find the token endpoint. Paste it in Postman. Add body of the request for client credentials client in `Config.cs`:
	3.1. Add key `client_id` and its value
	3.2. Add key `client_secret` and its value
	3.3. Add key `grant_type` and value `password`
	3.5. Add key `username` and the username of the test user
	3.6. Add key `password` and the password of the test user
	3.7. Execute and see the result
7. Find userinfo endpoint
	3.1. Add scope `openid` to the client you created in Config.cs
	3.2. Generate a new token by using the token endpoint and use it for userinfo endpoint
	3.4. Execute and see the result
