import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface IHeaderProps {
  text: string;
  linkText?: string;
  className?: string;
  href?: string;
}

const HeaderCard: React.FC<IHeaderProps> = ({
  text,
  linkText = "See more",
  className = "mb-4",
  href = "#",
}) => {
  return (
    <Card
      className={cn(
        "bg-white p-3 md:p-4 w-full border border-[#C2BAB2]",
        className
      )}
    >
      <CardContent
        className={cn("p-0 flex items-center justify-between gap-3")}
      >
        <p className="text-[#111928] text-lg sm:text-xl md:text-[22px] lg:text-2xl font-bold mb-2">
          {text}
        </p>
        <Button
          className="border-[#351F05] px-3 py-2 font-medium text-[#351F05] text-xs"
          variant={"outline"}
          asChild
        >
          <Link passHref href={href}>
            {linkText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeaderCard;
