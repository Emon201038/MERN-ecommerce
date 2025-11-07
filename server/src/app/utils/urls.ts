// import envConfig from "../config/env.config";

// const baseUrls = {
//   FRONTEND_URL: envConfig.FRONTEND_DEV_URL,
//   BACKEND_URL: envConfig.BACKEND_DEV_URL,
// };

// if (envConfig.NODE_ENV === "production") {
//   baseUrls.FRONTEND_URL = envConfig.FRONTEND_PROD_URL;
//   baseUrls.BACKEND_URL = envConfig.BACKEND_PROD_URL;
// }

// export const urls = {
//   ...baseUrls,
//   GOOGLE_CALLBACK_URL: `${baseUrls.BACKEND_URL}/auth/google/callback`,

//   //   PAYMENT VALIDATE URL
//   SSL_IPN_URL: `${baseUrls.BACKEND_URL}/payment/validate`,

//   //   SSLCOMMERZ FRONTEND URLS
//   SSL_SUCCESS_FRONTEND_URL: `${baseUrls.FRONTEND_URL}/payment/success`,
//   SSL_FAIL_FRONTEND_URL: `${baseUrls.FRONTEND_URL}/payment/fail`,
//   SSL_CANCEL_FRONTEND_URL: `${baseUrls.FRONTEND_URL}/payment/cancel`,

//   //   SSLCOMMERZ BACKEND URLS
//   SSL_SUCCESS_BACKEND_URL: `${baseUrls.BACKEND_URL}/payment/success`,
//   SSL_FAIL_BACKEND_URL: `${baseUrls.BACKEND_URL}/payment/fail`,
//   SSL_CANCEL_BACKEND_URL: `${baseUrls.BACKEND_URL}/payment/cancel`,
// };
