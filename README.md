# IdentityServer4Workshop

## Demo 1

// Nie instalirame is4 s gotova konfiguraciq i pokazwame kakwo ima vutre i kak raboti

Great job! You have reached the part of the workshop when you have enough knowledge about authentication, authorization and IdentityServer4 components. It is time to have fun!

1. Import file `IdentityServer4Workshop.postman_collection.json` in Postman

2. Run `dotnet new -i identityserver4.templates` in cmd as administrator

3. Run in `dotnet new is4empty` in your directory

4. Open `Config.cs` file and add new `Client` with the following properties

   4.1. `ClientId`

   4.2. `ClientName`

   4.3. `AllowedGrantTypes` - supporting `ResourceOwnerPassword`. You can use the static class `GrantTypes`.

   4.4. `ClientSecrets` collection with single `ClientSecret` and `Value` like `"secret".Sha512()`. IdentityServer4 requires the secret to be hashed when added to the configuration so we use the custom string extension of IS4 `Sha521()` or `Sha256()`.

   4.5. `AllowedScopes` collection with single item `"openid"`. This scope grants access to the subject id.

5. Add a test user to `Config.cs`. Use the same pattern as adding a new Client. The mandatory fields for a new user are `Username`, `Password` and `SubjectId`.

6. Add the test user after adding the memory clients by using method `AddTestUsers()` in the `Startup.cs`

7. Run the application

8. Open the discovery endpoint `https://localhost:5001/.well-known/openid-configuration`. If the page is not loading you are having problems with your configuration. Revise your work or ask the mentors.

9. Find the token endpoint. Paste it in Postman. Add body with content type `x-www-form-urlencoded` and the values from `Config.cs`:

   9.1. Add key `client_id` and its value.

   9.2. Add key `client_secret` and its non hashed value.

   9.3. Add key `grant_type` and value `password`.

   9.4. Add key `username` and the username of the test user.

   9.5. Add key `password` and the password of the test user.

   9.6. Execute and see the result. You should see the `sub` property.

10. Find user info endpoint

    10.1. Add the generated token to the request.

    10.2. Execute and see the result.

    10.3. Currently we are using only `openid` scope which gives us access only to the subject id. We want to add additional information to the user info endpoint.

    10.4. Go to `Config.cs` and add `new IdentityResources.Profile()` to `Ids` collection. This allows access to predefined user information.

    10.5. Add `profile` to the client `AllowedScopes`.

    10.6. Add `new Claim(JwtClaimTypes.GivenName, "pesho")` to the already created user.

    10.7. Generate a new token by using the token endpoint and use it for user info endpoint.

    10.8. Execute and see the result. You should now see the new `given_name` property.
