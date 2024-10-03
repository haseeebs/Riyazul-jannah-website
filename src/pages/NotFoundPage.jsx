import { Link } from "react-router-dom"
import { useState } from "react";
import packageServices from "../services/packageService";

const NotFoundPage = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <>
            <main className="relative isolate min-h-screen">
            {!isImageLoaded && (
                        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient-x"></div>
                    )}
                    <img
                        className={`w-full h-full object-cover bg-center transition-opacity duration-700 ${
                            isImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        src={packageServices.getFilePreview('67532310001c18214f1d')}
                        onLoad={() => setIsImageLoaded(true)}
                        alt="Umrah Journey"
                    />
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-white">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
                    <p className="mt-4 text-base text-white/70 sm:mt-6">Sorry, we couldn’t find the page you’re looking for.</p>
                    <p className="text-2xl font-semibold text-gray-700"> ہم معذرت خواہ ہیں، آپ جس صفحے کی تلاش کر رہے ہیں وہ موجود نہیں ہے۔</p>
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/" className="text-sm font-semibold leading-7 text-white">
                            <span aria-hidden="true">&larr;</span> Back to home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}


export default NotFoundPage