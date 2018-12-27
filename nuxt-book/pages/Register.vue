<template>
  <v-layout column>
    <v-flex tag="h3">Register New User!!!</v-flex>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" :rules="[rules.required]" label="ID" required>
      </v-text-field>
      <v-text-field v-model="password" :append-icon="show_password ? 'visibility_off' : 'visibility'"
        :rules="[rules.required, rules.more_than_8]" :type="show_password ? 'text' : 'password'"
        label="PASSWORD" hint="at least 8 characters" counter
        @click:append="show_password = !show_password">
      </v-text-field>
      <v-text-field v-model="password2" :append-icon="show_password ? 'visibility_off' : 'visibility'"
        :rules="[rules.required, rules.same_password]" :type="show_password ? 'text' : 'password'"
        label="PASSWORD AGAIN" hint="need to be matched" counter
        @click:append="show_password = !show_password">
      </v-text-field>
      <v-btn @click="register">register</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        valid: true,
        username: '',
        password: '',
        password2: '',
        rules: {
          required: value => !!value || 'Required',
          more_than_8: value => value.length >= 8 || 'More than 8 characters',
          same_password: value => value === this.password || 'Password mismatched'
        },
        show_password: false
      }
    },
    methods: {
      async register(){
        if (this.$refs.form.validate()) {
          await this.$axios.post('api/auth/register', {
            username: this.username, password: this.password
          })
          .then( res => {
            this.$router.push({ name: 'Login'})
          })
          .catch(err => {
            this.$refs.form.reset()
            this.username = ''
            this.password = ''

            console.log(err)
          })
        }
      }
    }
  }
</script>
