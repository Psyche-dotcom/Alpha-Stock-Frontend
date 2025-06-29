import { Briefcase, Calendar, MapPin, Globe, Users } from "lucide-react";

interface CompanyInfoCardProps {
  ceo: string;
  foundationDate: string;
  location: string;
  website: string;
  fullTimeEmployees: string | number;
}

export default function CompanyInfoCard({
  ceo,
  foundationDate,
  location,
  website,
  fullTimeEmployees,
}: CompanyInfoCardProps) {
  const rows = [
    {
      icon: <Briefcase className="h-4 w-4 text-gray-500" />,
      label: "Executive Director",
      value: ceo,
    },
    {
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      label: "Foundation",
      value: foundationDate,
    },
    {
      icon: <MapPin className="h-4 w-4 text-gray-500" />,
      label: "Site",
      value: location,
    },
    {
      icon: <Globe className="h-4 w-4 text-gray-500" />,
      label: "Website",
      value: website.replace(/^https?:\/\//, ""),
      link: `https://${website.replace(/^https?:\/\//, "")}`,
    },
    {
      icon: <Users className="h-4 w-4 text-gray-500" />,
      label: "Employees",
      value: Number(fullTimeEmployees).toLocaleString(),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-sm p-0 mb-6">
      <div className="h-full flex flex-col justify-around">
        {rows.map((row, index) => (
          <div key={index} className="flex justify-between items-center px-6 py-3 border-b border-gray-200 last:border-b-0">
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
