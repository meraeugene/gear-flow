import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

type BreadcrumbItemProps = {
  title: string;
  href: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItemProps[];
};

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return [
            <BreadcrumbItem key={`item-${item.href}`}>
              <BreadcrumbLink
                href={item.href}
                className={isLast ? "font-bold text-gray-900" : ""}
              >
                {item.title}
              </BreadcrumbLink>{" "}
            </BreadcrumbItem>,
            !isLast && (
              <BreadcrumbSeparator key={`sep-${item.href}`}>
                <Slash />
              </BreadcrumbSeparator>
            ),
          ];
        })}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
};

export default BreadcrumbNav;
