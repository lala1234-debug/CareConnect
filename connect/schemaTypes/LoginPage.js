import {defineType} from "sanity";

export const loginPage = defineType({
    name: 'loginPage',
    type: 'document',
    title: 'Login Page',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Login Page',
        description: 'Title of the login page'
      },
      {
        name: 'emailLabel',
        type: 'string',
        title: 'Email Label',
        description: 'Label for the email input field',
        validation: (Rule) => Rule.required().min(5).max(30).warning('Email label should be between 5 and 30 characters'),
      },
      {
        name: 'passwordLabel',
        type: 'string',
        title: 'Password Label',
        description: 'Label for the password input field',
        validation: (Rule) => Rule.required().min(5).max(30).warning('Password label should be between 5 and 30 characters'),
      },
      {
        name: 'loginButtonText',
        type: 'string',
        title: 'Login Button Text',
        description: 'Text for the login button',
        validation: (Rule) => Rule.required().min(3).max(20).warning('Login button text should be between 3 and 20 characters'),
      },
      {
        name: 'registerLinkText',
        type: 'string',
        title: 'Register Link Text',
        description: 'Text for the register link',
        validation: (Rule) => Rule.required().min(3).max(20).warning('Register link text should be between 3 and 20 characters'),
      },
      {
        name: 'recoverPasswordButtonText',
        type: 'string',
        title: 'Recover Password Button Text',
        description: 'Text for the recover password button',
        validation: (Rule) => Rule.required().min(5).max(30).warning('Recover password button text should be between 5 and 30 characters'),
      },
      {
        name: 'modalTitle',
        type: 'string',
        title: 'Modal Title',
        description: 'Title for the recover password modal',
        validation: (Rule) => Rule.required().min(10).max(50).warning('Modal title should be between 10 and 50 characters'),
      },
      {
        name: 'recoverEmailLabel',
        type: 'string',
        title: 'Recover Email Label',
        description: 'Label for the email input field in the recover password modal',
        validation: (Rule) => Rule.required().min(5).max(30).warning('Recover email label should be between 5 and 30 characters'),
      },
      {
        name: 'sendRecoveryEmailButtonText',
        type: 'string',
        title: 'Send Recovery Email Button Text',
        description: 'Text for the send recovery email button',
        validation: (Rule) => Rule.required().min(5).max(30).warning('Send recovery email button text should be between 5 and 30 characters'),
      },
    ]
})