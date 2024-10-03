import { useState } from 'react';
import { X } from 'lucide-react';
import { Logo } from "../assets/images"

const navigation = {
    solutions: [
        { name: 'Home', href: '/' },
        { name: 'Umrah Packages', href: '/packages' },
        { name: 'Customize Package', href: '/customize-package' },
    ],
    services: [
        { name: 'Economy Umrah Package', href: '/packages/economy' },
        { name: 'Premium Umrah Package', href: '/packages/premium' },
        { name: 'Family Package', href: '/packages/family' },
        { name: 'Group Package', href: '/packages/group' }
    ],
    social: [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/riyazuljannahtourandtravels/',
            target:"_blank",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'WhatsApp',
            href: 'https://wa.me/919179664894',
            target:"_blank",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.44 4.552A10.413 10.413 0 0012.044 1.5C6.281 1.5 1.59 6.188 1.588 11.952a10.424 10.424 0 001.395 5.24L1.5 22.5l5.42-1.424a10.459 10.459 0 004.995 1.273h.004c5.762 0 10.454-4.688 10.456-10.452a10.392 10.392 0 00-2.935-7.345zm-7.396 16.056h-.003a8.677 8.677 0 01-4.42-1.21l-.317-.188-3.29.863.878-3.207-.206-.329a8.647 8.647 0 01-1.329-4.585c0-4.79 3.898-8.685 8.69-8.685a8.628 8.628 0 016.13 2.544 8.627 8.627 0 012.535 6.144c-.002 4.79-3.9 8.686-8.688 8.686zm4.75-6.505c-.262-.131-1.55-.763-1.79-.851-.24-.087-.415-.131-.59.132-.174.262-.677.85-.83 1.025-.153.176-.306.197-.568.066-.262-.132-1.107-.408-2.108-1.3-.78-.695-1.305-1.553-1.458-1.815-.153-.262-.016-.404.115-.534.118-.118.262-.307.394-.46.13-.154.174-.264.262-.439.087-.175.043-.328-.022-.46-.065-.131-.59-1.422-.809-1.947-.213-.51-.43-.441-.59-.449-.153-.007-.328-.01-.503-.01-.175 0-.46.066-.7.328-.24.263-.917.897-.917 2.188 0 1.291.94 2.538 1.071 2.713.132.176 1.856 2.836 4.497 3.977.628.271 1.118.433 1.5.555.63.201 1.204.172 1.657.104.506-.075 1.55-.633 1.769-1.245.218-.612.218-1.137.153-1.246-.066-.109-.24-.175-.503-.306z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
}

const Footer = () => {
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceClick = (service) => {
        // Prevent default navigation
        event.preventDefault();
        setSelectedService(service);
    };

    const handleCloseBanner = () => {
        setSelectedService(null);
    };

    return (
        <>
            <footer aria-labelledby="footer-heading" className="bg-lime-400">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:py-20">
                    <div className="xl:grid xl:grid-cols-2 xl:gap-8">
                        {/* section one */}
                        <div className="space-y-8 max-w-lg">
                            <img
                                alt="Company name"
                                src={Logo}
                                className="h-10 w-auto"
                            />
                            <p className="text-sm leading-6 text-lime-800">
                                Your trusted travel partner since 2014. Led by an Islamic scholar who speaks Arabic and English. We have helped 1000+ happy travelers plan their holy journeys. 10 years of making your sacred trips comfortable and worry-free.
                            </p>
                            <div className="space-y-3">
                                <p className="text-sm leading-6 text-lime-800 hover:text-white transition-colors duration-300 cursor-default">
                                    <span className="font-bold text-lime-800">Write to us:</span> Riyazuljannahtour@gmail.com
                                </p>
                                <p className="text-sm leading-6 text-lime-800 hover:text-white transition-colors duration-300 cursor-default">
                                    <span className="font-bold text-lime-800">Call us:</span> +91 9179664894
                                </p>
                            </div>

                            <div className="flex space-x-6">
                                {navigation.social.map((item) => (
                                    <a key={item.name} href={item.href} target={item.target} className="text-lime-800 hover:text-white transition-colors duration-300">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon aria-hidden="true" className="h-6 w-6" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* section two */}
                        <div className="mt-16 xl:mt-0 grid grid-cols-1">
                            <div className="md:grid md:grid-cols-2">
                                <div>
                                    <h3 className="text-base font-bold leading-6 text-lime-800">Quick Links</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-lime-800 hover:text-white transition-colors duration-300">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-base font-bold leading-6 text-lime-800">Services</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {navigation.services.map((item) => (
                                            <li key={item.name}>
                                                <a 
                                                    href={item.href} 
                                                    onClick={(event) => handleServiceClick(item)} 
                                                    className="text-sm leading-6 text-lime-800 hover:text-white transition-colors duration-300"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Service Banner */}
            {selectedService && (
                <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50">
                    <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-lime-600 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                        <p className="text-sm leading-6 text-white">
                            <strong className="font-semibold">{selectedService.name}</strong>
                            <span className="ml-2">Detailed information about this package will be available soon.</span>
                        </p>
                        <button 
                            type="button" 
                            onClick={handleCloseBanner} 
                            className="-m-1.5 flex-none p-1.5"
                        >
                            <span className="sr-only">Dismiss</span>
                            <X aria-hidden="true" className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer