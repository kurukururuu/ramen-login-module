# ramen-login-module
Vue.js Login Component for [ordent/ramenauth](https://github.com/ordent/ramenauth) backend service.

## Installation
```
npm install ramen-login-module
```

## Usage
* Import directly on your template
```javascript
import LoginComponent from 'ramen-login-module'
export default {
	// ...
	components: {
		LoginComponent
	}
	// ...
}
```
* Use Nuxt.js plugin
```javascript
// '/plugin/RamenLoginModule.js'
import Vue from 'vue'
import LoginComponent from 'ramen-login-module';
Vue.use(LoginComponent)
```

## Example Usage
```html
<!-- 'YourPage.vue' -->
<template>
	<LoginComponent
		secretKey="yourSecretKey"
		apiURL="yourURLEndpoint"
		@loginSuccess="actionSuccessLogin"
		@loginError="actionErrorLogin"
		/>
</template>
```

## Options
| Property Name 	|  Type  	|                        Description                       	|  Default 	|
|:-------------:	|:------:	|:--------------------------------------------------------:	|:--------:	|
| apiURL        	| String 	| required; endpoint used for login.                       	| none     	|
| secretKey     	| String 	| required; a string-based key to be used later for login. 	| none     	|
| emailText     	| String 	| label for email input                                    	| Email    	|
| passwordText  	| String 	| label for password input                                 	| Password 	|
| buttonText    	| String 	| label for login button                                   	| Login    	|
| errorText    		| Object 	| label for error validation (errorEmailFormat, errorEmailRequired, errorPasswordRequired)	| { errorEmailFormat: 'Wrong email format', errorEmailRequired: 'Email is required', errorPasswordRequired: 'Password is required' }    	|
| emailClass    	| String 	| custom class that can be added to email input            	| none     	|
| passwordClass 	| String 	| custom class that can be added to password input         	| none     	|
| buttonClass   	| String 	| custom class that can be added to login button           	| none     	|
| wrapperClass  	| String  | custom class that <b>overwrites</b> the current default wrapper class  | login-wrapper 	|

## Listeners
| Listener Name 	|  Type  	|                        Description                       	|  Default 	|
|:-------------:	|:------:	|:--------------------------------------------------------:	|:--------:	|
| loginSuccess  	| function 	| handler function after success login. Default handler is redirect to home page ('/')              	|          	|
| loginError    	| function 	| handler function when failed to login. Default handler is doing `window.alert` the error response 	|          	|

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License
[MIT](https://choosealicense.com/licenses/mit/)