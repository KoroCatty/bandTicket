import "@/styles/globals.css";
// GOOGLE ANALYTICS
import Script from "next/script";

// components
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/common/AuthProvider"; // next-auth
// context
import { GlobalProvider } from "@/context/GlobalContext";

// react Toastify &  css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// photoswippe css
import "photoswipe/dist/photoswipe.css";

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const NEXT_PUBLIC_GA_URL = process.env.NEXT_PUBLIC_GA_URL;

export const metadata = {
  title: "Band Tickets| KZ-DEV",
  description: "Find the band tickets",
  keywords: "band, tickets, music, concert, live, event, ticket",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <head>
            <Script async src={NEXT_PUBLIC_GA_URL}></Script>
            <Script id="google-analytics">
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${NEXT_PUBLIC_GA_ID}');
                 `}
            </Script>
          </head>
          <body>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
