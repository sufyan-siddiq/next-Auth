import { Inter } from "next/font/google";
import { Nav } from "./components/Nav";
import { Provider } from "./components/Provider";
import { getServerSession } from "next-auth";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share Prompts",
  description: "Descover & Share AI Prompts",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <div className="h-[100vh]">
        <ToastContainer />
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
