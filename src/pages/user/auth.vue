<template>
  <amplify-authenticator username-alias="email">
    <amplify-sign-in
      slot="sign-in"
      username-alias="email"
      header-text="ログインしてください"
      submit-button-text="ログイン"
      :form-fields.prop="formFields"
    />
    <amplify-sign-up
      slot="sign-up"
      username-alias="email"
      header-text="ユーザー登録"
      submit-button-text="登録"
      :form-fields.prop="formFields"
    />
    <amplify-sign-out />
  </amplify-authenticator>
</template>

<script>
import '@aws-amplify/ui-vue'

export default {
  data() {
    return {
      formFields: [
        {
          type: 'email',
          label: 'メールアドレス',
          placeholder: '',
          required: true,
        },
        {
          type: 'password',
          label: 'パスワード',
          placeholder: '',
          required: true,
        },
      ],
    }
  },
}
</script>
