import { Typography } from "@uigovpe/components";

interface PageInfoProps {
  title: string;
  descriptions?: string[];
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const PageInfo = ({
  title,
  descriptions = [],
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: PageInfoProps) => {
  return (
    <section className={`flex flex-col gap-0.5 ${className}`}>
      <Typography variant="h1" className={`text-2xl font-bold weight-700 ${titleClassName}`}>
        {title}
      </Typography>
      {descriptions.map((description, index) => (
        <Typography key={index} variant="p" className={`text-sm ${descriptionClassName}`}>
          {description}
        </Typography>
      ))}
    </section>
  );
};
