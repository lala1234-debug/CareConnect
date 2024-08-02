import {defineField, defineType} from 'sanity'

// List of all Romanian counties
const romanianCounties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "Buzău",
  "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț",
  "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui",
  "Vâlcea", "Vrancea", "București"
];

export const registerType = defineType({
  name: 'register',
  title: 'Register',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: "First Name",
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50).warning('First Name should be between 2 and 50 characters')
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50).warning('Last Name should be between 2 and 50 characters')
    }),
    defineField({
      name: 'region',
      title: "Region",
      type: 'string'
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.regex(/^\+?[1-9]\d{1,14}$/, {
        name: 'international phone number', // Error message is "Does not match international phone number pattern"
        invert: false // Boolean to allow any value that does NOT match pattern
      }).error('Phone number must be in international format, e.g., +1234567890')
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email().error('Invalid email address')
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      description: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.',
      validation: Rule => Rule.custom(password => {
        if (!password) {
          return 'Password is required';
        }
        // Regex to check for at least one uppercase letter, one lowercase letter, one number, and one special character
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
          return 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters';
        }
        return true;
      }),
    }),
    defineField({
      name: 'type',
      title: 'Type Of User',
      type: 'string',
      options: {
        list: [
          { title: 'Shadow', value: 'shadow' },
          { title: 'BabySitter', value: 'babysitter' },
          { title: 'Voluntary', value: 'Voluntary' },
          { title: 'Searching for shadow', value: 'search_shadow' },
          { title: 'Searching for babysitter', value: 'search_babysitter' },
          { title: 'Searching for voluntary', value: 'search_voluntary' },
        ],
      },
      validation: Rule => Rule.required().error('Type is required'),
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      options: {
        list: romanianCounties.map(county => ({ title: county, value: county })),
      },
      validation: Rule => Rule.required().error('County is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Provide a brief description about the you.',
      validation: Rule => Rule.max(200).warning('Description should be less than 200 characters'),
    })
  ],
})