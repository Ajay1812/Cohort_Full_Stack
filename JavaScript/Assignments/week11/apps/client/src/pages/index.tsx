import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Button className="btn" appName="naughty ho rha bkl ">Click</Button>
    </>
  );
}
