import { Check } from "lucide-react";

type ColorScheme = {
  bg: string;        // Background color
  text: string;      // Text color
  hoverBg: string;   // Hover background color
};

const colorSchemes: Record<string, ColorScheme> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hoverBg: "group-hover:bg-blue-100"
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    hoverBg: "group-hover:bg-green-100"
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hoverBg: "group-hover:bg-amber-100"
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hoverBg: "group-hover:bg-purple-100"
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    hoverBg: "group-hover:bg-red-100"
  }
};

const NamedSectionResult = ({
  title,
  list,
  icon,
  color = "blue",
  className = "",
}: {
  title: string;
  list: string[];
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}) => {
  // Get color scheme or fallback to blue
  const colorScheme = colorSchemes[color] || colorSchemes.blue;
  
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition duration-300 hover:shadow-md ${className}`}>
      <h3 className="text-TextPrimary text-lg font-semibold mb-4 flex items-center gap-2.5">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorScheme.bg} ${colorScheme.text}`}>
          {icon}
        </div>
        {title}
      </h3>
      <ul className="space-y-3 text-gray-700 pl-1">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-3 group">
            <span className={`inline-flex items-center justify-center rounded-full ${colorScheme.bg} p-1.5 ${colorScheme.text} mt-0.5 ${colorScheme.hoverBg} transition-colors`}>
              <Check size={12} />
            </span>
            <span className="text-sm leading-relaxed text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NamedSectionResult;
