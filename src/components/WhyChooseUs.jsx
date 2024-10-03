import { useState } from 'react';
import { HeartIcon, UsersIcon, MapIcon, ShieldIcon, ChevronRightIcon } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: UsersIcon,
      title: 'Trusted Guidance',
      description: 'Each group is led by an experienced aalim, fluent in Arabic and English, with over 10 years of experience. They provide spiritual guidance and support throughout the journey.',
    },
    {
      icon: MapIcon,
      title: 'Well-Planned Journeys',
      description: 'From flights to accommodations, everything is planned to save you time and give you peace of mind.',
    },
    {
      icon: ShieldIcon,
      title: 'Safe and Easy Travel',
      description: 'Your safety and comfort are our top priorities. We provide trusted services so you can travel with peace of mind.',
    },
  ];

  return (
    <section className="py-0 pt-12 lg:py-32 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-lime-600 mb-4 tracking-tight">
            Why Choose Our Packages?
          </h2>
          <p className="text-xl text-lime-500 max-w-2xl mx-auto">
            Go on a journey led by trusted guides, carefully planned for your comfort and spiritual peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 items-stretch">
          <div className="bg-white/80 backdrop-blur-sm border border-lime-500 rounded-3xl mb-8 md:mb-0 flex flex-col justify-between">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-lime-200 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-lime-100 rounded-full p-4">
                    <HeartIcon className="h-12 w-12 text-lime-600" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-lime-900 text-center mb-4">98%</h3>
              <p className="text-xl font-medium text-lime-700 text-center mb-6">Customer Satisfaction</p>
              <p className="text-lime-800 text-center">
                Our team works hard to make your journey peaceful and memorable. We take care of everything so you can focus on your worship.
              </p>
            </div>
            <div className="p-6 bg-lime-300 hover:bg-lime-400 text-lime-700 hover:text-lime-950 transition-colors duration-300 rounded-b-3xl cursor-default">
              <p className="font-semibold text-center">Trusted by Thousands</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-lime-500 rounded-3xl col-span-2">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-lime-900 mb-6">What Sets Us Apart</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden ${activeFeature === index ? 'bg-lime-50' : 'bg-white'}`}
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 hover:bg-lime-100 transition-colors duration-300"
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex items-center">
                        <feature.icon className="h-6 w-6 mr-3 text-lime-600" />
                        <span className="font-semibold text-lime-900">{feature.title}</span>
                      </div>
                      <ChevronRightIcon
                        className={`h-5 w-5 transition-transform ${
                          activeFeature === index ? 'rotate-90 text-lime-600' : 'text-lime-400'
                        }`}
                      />
                    </button>
                    {activeFeature === index && (
                      <div className="px-4 pb-4 text-lime-700">
                        {feature.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
