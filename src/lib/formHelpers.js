/**
 * Define helpers for verification of form inputs
 */

export const required = value => value ? undefined : 'Required'; // eslint-disable-line

export const maxLength = max => value => // eslint-disable-line
  value && value.length > max ? `Must be ${max} characters or less` : undefined; // eslint-disable-line
