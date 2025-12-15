"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Route } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";

export default function BreadcrumbShadcn() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);

  return (
    <nav className="flex items-center gap-x-2 w-full">
      {pathname != "/" && (
        <Item variant="muted" className="w-full" size="sm">
          <ItemMedia variant="icon">
            <Route />
          </ItemMedia>
          <ItemContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pathParts.map((part, index, arr) => {
                  const href = "/" + pathParts.slice(0, index + 1).join("/");
                  return (
                    <>
                      <BreadcrumbItem>
                      {index != arr.length - 1 ? (
                          <BreadcrumbLink href={href}>{part}</BreadcrumbLink>
                        
                      ):(
                        <span>{part}</span>
                      )}
                      </BreadcrumbItem>
                      {index != arr.length - 1 && <BreadcrumbSeparator />}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </ItemContent>
        </Item>
      )}
    </nav>
  );
}
