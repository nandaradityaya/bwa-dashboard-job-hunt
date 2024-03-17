import { Epilogue } from "next/font/google";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const epilogue = Epilogue({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ambil session
  const session = await getServerSession(authOptions);

  // jika session != null maka redirect ke /
  if (session !== null) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
