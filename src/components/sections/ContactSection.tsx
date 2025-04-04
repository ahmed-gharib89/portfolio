'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Simple honeypot field to deter bots
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Basic email format check
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing again
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If honeypot is filled, likely a bot
    if (honeypot) {
      return;
    }

    if (emailError) {
      setSubmitError('Please fix the email error before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmitError(
        error.message ||
          'Failed to send your message. Please try again or contact me directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Email</h4>
                    <a
                      href="mailto:a.gharib89@yahoo.com"
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      a.gharib89@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Phone</h4>
                    <a
                      href="tel:+201096995535"
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      +2010 96995535
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</h4>
                    <a
                      href="https://wa.me/201096995535?text=Hello!%20I'm%20visiting%20your%20website%20and%20have%20a%20question."
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +2010 96995535
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Location</h4>
                    <p className="text-gray-900 dark:text-white">
                      Cairo, Egypt
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Connect
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/agharib89/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/ahmed-gharib89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full"
                    aria-label="GitHub"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>

              {submitSuccess && (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-md mb-6">
                  Your message has been sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {submitError && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-md mb-6">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden honeypot input */}
                <input
                  type="text"
                  name="honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-describedby="email-help"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <span
                      id="email-help"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      I&apos;ll never share your email with anyone else
                    </span>
                    {/* Inline email error */}
                    {emailError && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Your personal information will only be used to respond to your message.
                    By submitting this form, you consent to receiving email
                    communications in response to your inquiry.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="inline-block animate-spin h-5 w-5 text-white mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
