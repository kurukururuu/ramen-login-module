<template>
	<div v-if="secretKey" :class="wrapperClass ? wrapperClass : 'login-wrapper'">
		<slot v-if="hasSlot"></slot>
		<div v-else>
			<form>
				<!-- email field -->
				<div class="field">
					<label class="label">{{ emailText }}</label>
					<div class="control has-icons-left has-icons-right">
						<input
							v-model="form.email"
							ref="emailInput"
							@keydown.enter="actionLogin"
							:class="'input ' + ((validationState.email.state == false) ? 'is-danger' : '') + (emailClass ? (' ' + emailClass) : '')"
							type="email"
							placeholder="youremail@email.com">
						<span class="icon is-small is-left">
							<i class="fas fa-envelope"></i>
						</span>
						<span v-if="validationState.email.state == false" class="icon is-small is-right is-success">
							<i class="fas fa-exclamation-triangle"></i>
						</span>
					</div>
					<p v-if="!validationState.email.state" class="help is-danger">{{ validationState.email.text }}</p>
				</div>

				<!-- password field -->
				<div class="field">
					<label class="label">{{ passwordText }}</label>
					<div class="control has-icons-left has-icons-right">
						<input
							v-model="form.password"
							@keydown.enter="actionLogin"
							:class="'input ' + ((validationState.password.state == false) ? 'is-danger' : '') + (passwordClass ? (' ' + passwordClass) : '')"
							type="password" placeholder="********"
							autocomplete="off">
						<span class="icon is-small is-left">
							<i class="fas fa-key"></i>
						</span>
						<!-- stupid conditional icon rendering -->
						<!-- <div v-if="validationState.password.state !== undefined">
							<div v-if="validationState.password.state == true">
								<span class="icon is-small is-right">
									<i class="fas fa-check"></i>
								</span>
							</div>
							<div v-else>
								<span class="icon is-small is-right">
									<i class="fas fa-exclamation-triangle"></i>
								</span>
							</div>
						</div> -->
						<span v-if="validationState.password.state == false" class="icon is-small is-right is-success">
							<i class="fas fa-exclamation-triangle"></i>
						</span>
					</div>
					<p v-if="!validationState.password.state" class="help is-danger">{{ validationState.password.text }}</p>
				</div>
			</form>
			<br>
			<div class="buttons">
				<button :class="'button is-info' + (' ' + buttonClass)" @click="actionLogin">{{ buttonText }}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		apiURL: String,
		secretKey: String,
		emailText: {
			type: String,
			default: 'Email'
		},
		passwordText: {
			type: String,
			default: 'Password'
		},
		buttonText: {
			type: String,
			default: 'Login'
		},
		errorText: {
			type: Object,
			default() {
				return {
					errorEmailFormat: 'Wrong email format',
					errorEmailRequired: 'Email is required',
					errorPasswordRequired: 'Password is required'
				}
			}
		},
		emailClass: String,
		passwordClass: String,
		buttonClass: String,
		wrapperClass: String
	},
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			validationState: {
				email: {
					state: undefined,
					text: ''
				},
				password: {
					state: undefined,
					text: ''
				}
			}
		}
	},
	beforeMount() {
		if (!this.secretKey) {
			alert('ramen login component needs a secretKey !')
		}
	},
	computed: {
		hasSlot() {
			return !!this.$slots.default
		},
		hasSuccessListener() {
			return !!(this.$listeners && this.$listeners.loginSuccess)
		},
		hasErrorListener() {
			return !!(this.$listeners && this.$listeners.loginError)
		}
	},
	watch: {
		validationState: {
			deep: true,
			handler() {}
		}
	},
	mounted() {
    let fontAwesomeScript = document.createElement('script')
    fontAwesomeScript.setAttribute('src', 'https://use.fontawesome.com/releases/v5.3.1/js/all.js')
    document.head.appendChild(fontAwesomeScript)
	},
	methods: {
		async actionLogin() {
			function getKey(form, secretKey) {
				const crypto = require('crypto')
				const key = Buffer.from(secretKey, 'base64')
				const iv = crypto.randomBytes(16)
				const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
				let data = cipher.update(JSON.stringify(form), 'utf8')
				data = Buffer.concat([data, cipher.final()]).toString('base64')
				const mac = crypto.createHmac('sha256', key).update(iv.toString('base64') + data).digest('hex')
				const json = JSON.stringify({
						iv: iv.toString('base64'),
						value: data,
						mac: mac
				})
				const base64Json = Buffer.from(json)
				return base64Json.toString('base64')
			}

			const valid = await this.validation()
			if (valid) {
				const key = getKey(this.form, this.secretKey)
				const axios = require('axios')
				const url = this.apiURL
				const payload = {
					payload: key
				}
				try {
					const response = await axios.post(url, payload)
					if (this.hasSuccessListener) {
						this.$emit('loginSuccess', response)
					} else window.location = '/'
				} catch(err) {
					const errorResponse = err.response
					if (this.hasErrorListener) {
						this.$emit('loginError', errorResponse)
					} else alert(errorResponse.data.error)
				}
			}
		},
		validation() {
			let valid = true
			const data = this.form
			// eslint-disable-next-line no-useless-escape
			const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (data.email.length > 0) {
				// check if email not email format
				if (!emailRegex.test(this.$refs.emailInput.value)) {
					valid = false
					this.validationState.email.state = false
					this.validationState.email.text = this.errorText.errorEmailFormat
				} else {
					this.validationState.email.state = true
				}
			} else {
				// email required checking
				valid = false
				this.validationState.email.state = false
				this.validationState.email.text =  this.errorText.errorEmailRequired
			}

			// password required checking
			if (!(data.password.length > 0)) {
				valid = false
				this.validationState.password.state = false
				this.validationState.password.text = this.errorText.errorPasswordRequired
			} else {
				this.validationState.password.state = true
			}

			
			return valid
		}
	}
}
</script>

<style lang="scss" scoped>
	.login-wrapper {
		min-width: 300px;
		padding: 20px;
		background-color: white;
		border: solid 1px rgba(0,0,0,0.3);
		border-radius: 5px;
	}
</style>