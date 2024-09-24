import localFont from "next/font/local";
import "./globals.css";
import Header from "../app/_components/header/Header";
import Navmenu from "../app/_components/navmenu/Navmenu";
import Slides from "../app/_components/slides/Slides";
import Footer from "../app/_components/footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./_utils/AuthProvider";
const geistSans = localFont({
  src: "./fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Poster Tounsi",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
   
          <AuthProvider>
          <Header />
          <Navmenu />
             {children}
             <Footer />
             <ToastContainer /> 
          </AuthProvider>

      </body>
    </html>
  );
}
