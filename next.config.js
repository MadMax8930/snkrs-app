/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["statics.whentocop.fr", "whentocop.s3.eu-west-3.amazonaws.com"]
   },
   publicRuntimeConfig: {
      EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
   },
}

module.exports = nextConfig