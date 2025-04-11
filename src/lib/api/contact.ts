/**
 * Contact form API utilities
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Validates contact form data
 * @param data The contact form data to validate
 * @returns An object with validation result and any error message
 */
export function validateContactForm(data: ContactFormData): { isValid: boolean; error?: string } {
  const { name, email, subject, message } = data;
  
  // Check for required fields
  if (!name || !email || !subject || !message) {
    return { isValid: false, error: 'All fields are required' };
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email address' };
  }
  
  return { isValid: true };
}

/**
 * Submits contact form data to the API
 * @param data The contact form data to submit
 * @returns A promise that resolves to the API response
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate the form data
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    
    // Submit the form data to the API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to send message' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
