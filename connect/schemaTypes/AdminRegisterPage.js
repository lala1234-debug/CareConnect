import {defineType} from "sanity";

export const adminRegisterPage = defineType({
  // adminProfile.js in your Sanity schemas folder
    name: 'admin',
    title: 'Admin',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email() },
      { name: 'password', title: 'Password', type: 'string' } // Consider using hashing and encryption for production
    ]
})