<template>
  <div id="app">
		<div class="wrapper">
			<LoginComponent
				secretKey="IHMc3jVAEFvd9GI5YeR967ME1kY0OA5q2R4eSiT8fd8"
				apiURL="https://api.khubforjustice.org/api/v2/login"
				@loginSuccess="actionSuccessLogin"
				@loginError="actionErrorLogin"
				:errorText="errorFormText"
				>
				<!-- remove all div inside to see default component -->
				<!-- <div>Test</div> -->
			</LoginComponent>
		</div>
  </div>
</template>

<script>
import LoginComponent from '../src'

export default {
  name: 'app',
  components: {
		LoginComponent
	},
	data() {
		return {
			errorFormText: {
				errorEmailRequired: 'asd'
			}
		}
	},
	methods: {
		actionSuccessLogin(e) {
			console.log('success login', e)
		},
		actionErrorLogin() {
			console.log('fail to Login')
		}
	}
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
	margin-top: 60px;
}

.wrapper {
	width: 600px;
	margin: 0 auto;
}
.myInputClass {
	font-size: 32px;
}
</style>