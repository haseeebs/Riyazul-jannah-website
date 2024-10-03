import { CheckCircle, XCircle } from "lucide-react";

const inclusions = [
  { name: "Round-trip Flights", included: true, description: "Economy class flights to and from Jeddah." },
  { name: "Accommodation", included: true, description: "4-star hotel accommodation near Haram." },
  { name: "Meals", included: false, description: "Daily meals are not included." },
  { name: "Transportation", included: true, description: "Air-conditioned buses for local travel." },
  { name: "Visa Processing", included: true, description: "Umrah visa and support included." },
  { name: "Travel Insurance", included: false, description: "Not included but can be added on request." },
];

const PackageInclusions = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {inclusions.map((item, index) => (
      <div
        key={index}
        className="relative flex items-start p-4 border border-gray-300 rounded-lg shadow-sm 
        hover:shadow-lg hover:border-gray-400 transition-all duration-300"
      >
        <div className="flex-shrink-0">
          {item.included ? (
            <CheckCircle className="h-6 w-6 text-lime-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
        <div className="ml-4">
          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
          <p className="mt-1 text-xs text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default PackageInclusions;