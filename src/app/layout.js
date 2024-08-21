import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mangadom",
  description: "Welcome to Mangadom - Your Ultimate Manga Destination. Discover a vast collection of manga series, from classic favorites to the latest releases. Immerse yourself in captivating storylines, stunning artwork, and diverse genres. Stay updated with new chapters, explore author profiles, and connect with fellow manga enthusiasts. Your journey into the world of manga starts here!",};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-gray-200`}>
      <Navbar/>
        {children}
      <Footer />
      </body>
    </html>
  );
}
