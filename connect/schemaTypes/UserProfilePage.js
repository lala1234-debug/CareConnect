import {defineType} from "sanity";

export const userProfilePageType = defineType({
    name: 'userProfilePage',
    type: 'document',
    title: 'User Profile',
    fields: [
      {
        name: 'firstName',
        type: 'string',
        title: 'First Name',
        validation: Rule => Rule.required()
      },
      {
        name: 'lastName',
        type: 'string',
        title: 'Last Name',
        validation: Rule => Rule.required()
      },
      {
        name: 'phoneNumber',
        type: 'string',
        title: 'Phone Number',
        validation: Rule => Rule.required()
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'password',
        type: 'string',
        title: 'Password',
        // In a real implementation, you should hash passwords and store securely
        validation: Rule => Rule.required()
      },
      {
        name: 'userType',
        type: 'string',
        title: 'User Type',
        options: {
          list: [
            { title: 'Shadow', value: 'shadow' },
            { title: 'BabySitter', value: 'babysitter' },
            { title: 'Voluntary', value: 'voluntary' },
            { title: 'Searching for shadow', value: 'search_shadow' },
            { title: 'Searching for babysitter', value: 'search_babysitter' },
            { title: 'Searching for voluntary', value: 'search_voluntary' },
          ],
          layout: 'radio' // optional, layout of the radio buttons
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'county',
        type: 'string',
        title: 'County',
        options: {
          list: [
            'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov', 'Brăila',
            'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați',
            'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș', 'Mehedinți',
            'Mureș', 'Neamț', 'Olt', 'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș',
            'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea', 'București'
          ],
          layout: 'dropdown' // optional, layout of the dropdown
        },
        validation: Rule => Rule.required()
      },
     /* {
        name: 'picture',
        type: 'image',
        title: 'Picture',
        options: {
          hotspot: true, // Enables the ability to highlight a specific area of the image
        },
        validation: Rule => Rule.required()
      },*/
      {
        name: 'approved',
        type: 'boolean',
        title: 'Approved'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        validation: Rule => Rule.required()
      },
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'Available', value: 'available' },
            { title: 'Unavailable', value: 'unavailable' },
          ],
          layout: 'radio' // optional, layout of the radio buttons
        },
        validation: Rule => Rule.required()
      },
    ],
})