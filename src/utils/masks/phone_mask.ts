import { z } from 'zod'

// Regex to validate the phone number in the format (XX) XXXXX or (XX) XXXXX-YYYY
const phoneRegex = /^\(\d{2}\) \d{5}(?:-\d{4})?$/

// Interface for the form that includes the phone field
export interface PhoneFormSchema {
  contact_phone: string
}

// Schema for phone number validation
const phoneSchema = z
  .string()
  // .min(15, 'This field is required')
  // .length(15, `Must have 15 characters`)
  .regex(phoneRegex, 'The phone number must be valid')

// Example of how to use the phone schema in an object
export const zodPhoneSchema = z.object({
  contact_phone: phoneSchema,
})

// Function to validate the phone number format
export const invalidPhoneNumberFormat = (number: string) => {
  return phoneRegex.test(number)
}

/* ================================
  src/app/mask/mask.ts
================================= */
export const normalizePhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const cleanedValue = value.replace(/\D/g, '')

  // If the resulting string is empty, return an empty string
  if (!cleanedValue) return ''

  // Build the formatted string starting with the area code
  let formattedValue = '(' + cleanedValue.substring(0, 2)

  // Add the area code, and if there are more than 2 characters, add the first group of 5 digits
  if (cleanedValue.length > 2) {
    formattedValue += ') ' + cleanedValue.substring(2, 7)
  }

  // If there are more than 7 characters, add the hyphen and the final group of 4 digits
  if (cleanedValue.length > 7) {
    formattedValue += '-' + cleanedValue.substring(7, 11)
  }

  return formattedValue
}
