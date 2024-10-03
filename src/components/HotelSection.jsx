import { MapPin } from "lucide-react";

const HotelSection = ({ title, hotelKey, distanceKey, packages, activeTooltip, setActiveTooltip }) => (
    <>
      <tr>
        <td className="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
          <div className="font-medium">{title}</div>
        </td>
        {packages.map((pkg) => (
          <td
            key={pkg.type}
            className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 transition-all duration-300 hover:bg-gray-50 relative cursor-default"
            onMouseEnter={() => setActiveTooltip(`${hotelKey}-${pkg.type}`)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="space-y-2">
              <div className="font-medium text-gray-800 flex items-center gap-2">
                {pkg[hotelKey]}
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                <MapPin className="w-3 h-3" />
                {pkg[distanceKey]} from Haram
              </span>
            </div>
            {activeTooltip === `${hotelKey}-${pkg.type}` && (
              <div className="absolute z-20 bg-black text-white text-sm rounded-md py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                Or Similar
              </div>
            )}
          </td>
        ))}
      </tr>
    </>
  );

  export default HotelSection;