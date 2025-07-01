import { Briefcase, Calendar, MapPin, Globe, Users } from "lucide-react";

interface CompanyInfoCardProps {
  ceo: string | null;
  foundationDate: string | null;
  location: string | null;
  website: string | null;
  fullTimeEmployees: string | number | null;
}

export default function CompanyInfoCard({
  ceo,
  foundationDate,
  location,
  website,
  fullTimeEmployees,
}: CompanyInfoCardProps) {
  // Format foundation date to a readable format (e.g., Feb 20, 2023)
  const formattedDate = foundationDate
    ? new Date(foundationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  // Clean location
  const cleanLocation =
    location && location.toLowerCase() !== "null" ? location : "N/A";

  // Format website
  const cleanWebsite = website && website.toLowerCase() !== "null"
    ? website.replace(/^https?:\/\//, "")
    : null;

  const websiteLink = cleanWebsite ? `https://${cleanWebsite}` : null;

  // Format employee number
  const formattedEmployees =
    fullTimeEmployees && Number(fullTimeEmployees) > 0
      ? Number(fullTimeEmployees).toLocaleString()
      : "N/A";

  const rows = [
    {
      icon: <Briefcase className="h-4 w-4 text-gray-500" />,
      label: "Executive Director",
      value: ceo || "N/A",
    },
    {
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      label: "IPO Date",
      value: formattedDate,
    },
    {
      icon: <MapPin className="h-4 w-4 text-gray-500" />,
      label: "Site",
      value: cleanLocation,
    },
    {
      icon: <Globe className="h-4 w-4 text-gray-500" />,
      label: "Website",
      value: cleanWebsite || "N/A",
      link: websiteLink,
    },
    {
      icon: <Users className="h-4 w-4 text-gray-500" />,
      label: "Employees",
      value: formattedEmployees,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-sm p-0 mb-6">
      <div className="h-full flex flex-col justify-around">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-6 py-3 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center gap-2 text-gray-600">
              {row.icon}
              <span className="text-sm">{row.label}</span>
            </div>
            {row.link ? (
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline truncate max-w-[150px] text-right"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-sm text-gray-800 max-w-[150px] text-right truncate">
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
