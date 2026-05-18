import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 py-10 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}