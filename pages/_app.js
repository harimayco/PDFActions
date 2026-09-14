import { useEffect, useRef } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
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
        <title>PDFActions - Claymorphism PDF Suite</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sculpt, merge, compress, split, and edit your PDF files securely in your browser." />
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
