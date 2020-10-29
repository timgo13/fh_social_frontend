# FH Aachen Social Network Frontend

This consumes the API provided by the FH Aachen Social Netowrk Backend project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Project preparations

- Set API token
	- Replace the auth token you got during the backend setup at the beginning of the file `src/app/services/auth.service.ts`
	- See backend README.md for more information 
- Configure Proxy file. For why see Routing ->
	- check the file `proxy.conf.json` for correct backend configuration. Should be fine if you are using the default port 8000 for laravel and ru n the backend on localhost


## How to run

Run the following commands:

```
npm install
ng serve --proxy-config proxy.conf.json
```
Then open your browser to `localhost:4200`

Also start your backend ;)


## Routing

The Project uses the following paths for API calls:  
`/api/*`  
`/oauth/*`  

That means for corret behaviour the backend and frontend are using the same base URL!  
All frontend pages will be located at  
`/*`

Examples for local testing envoirment:

`localhost:4200/feed` User Feed page  
`localhost:4200/api/user` API call

To reroute the trafic to the API during development use a proxy file. Description in __Project preparations__ 


Examples for local production envoirment:

`yourdomain.com/feed` User Feed page  
`yourdomain.com/api/user` API call

To reroute the trafic to the API in production you can use NGINX.
