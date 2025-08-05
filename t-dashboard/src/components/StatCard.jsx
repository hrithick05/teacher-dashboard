import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary to-primary-dark text-primary-foreground',
    success: 'bg-gradient-to-br from-success to-success-light text-success-foreground',
    secondary: 'bg-gradient-to-br from-secondary to-accent text-secondary-foreground'
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-white">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">{value.toLocaleString()}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1 dark:text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
