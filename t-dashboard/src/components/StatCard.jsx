import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon, trend, className = '' }) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-2 transform hover:scale-105 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value.toLocaleString()}</div>
        {trend && (
          <p className="text-xs text-white/80 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
