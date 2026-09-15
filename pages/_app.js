import { useEffect, useRef } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const loadingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => loadingRef.current?.continuousStart?.();
    const handleComplete = () => loadingRef.current?.complete?.();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>PDFActions - Free Open Source PDF Tools Online | Ghostscript WASM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="PDFActions is a 100% Free & Open Source PDF Tools suite powered by Ghostscript WASM. PDF Compress Online, PDF Merger Online, Split, Rotate, and Edit with zero server uploads."
        />
        <meta
          name="keywords"
          content="Open Source, pdf compress Online, PDF Merger Online, Open Source PDF Tools, Ghostscript WASM, free pdf tools, compress pdf in browser, merge pdf online, client-side pdf"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PDFActions" />
        <meta
          property="og:title"
          content="PDFActions - Free Open Source PDF Tools Online | Ghostscript WASM"
        />
        <meta
          property="og:description"
          content="100% Free & Open Source PDF Tools running directly in your browser. PDF Compress Online, PDF Merger Online, and more with Ghostscript WASM."
        />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PDFActions - Free Open Source PDF Tools Online | Ghostscript WASM"
        />
        <meta
          name="twitter:description"
          content="Free & Open Source PDF Tools powered by Ghostscript WASM. Private, secure, client-side PDF compression & merging."
        />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#F5F3FF" />
      </Head>
      <div className="min-h-screen bg-clay-bg flex flex-col selection:bg-clay-blue selection:text-white relative overflow-x-hidden">
        <Navbar />
        <LoadingBar ref={loadingRef} color="#60A5FA" height={4} />
        <main className="flex-grow flex flex-col relative z-10">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          toastClassName="clay-card-white font-nunito text-sm text-clay-heading font-semibold"
          autoClose={3500}
        />
      </div>
    </>
  );
}

export default MyApp;
