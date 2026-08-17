import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "JIPAS School Management System",
    template: "%s · JIPAS",
  },
  description: "Professional student, academic and school administration portal for JIPAS.",
  applicationName: "JIPAS School Management System",
  keywords: ["JIPAS", "school management", "student management", "school administration"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b5cab",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
