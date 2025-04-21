"use client";

import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

const MobileNav = () => {
  const paths = useNavigation();
  return (
    <Card className="fixed bottom-4 w[calc(100vw-32px)] flex items-center w-full h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">{
            paths.map((path,id)=> {
              return <li key={id} className="relative">
                <Link href={path.href}>
                <Tooltip>
                    <TooltipTrigger>
                        <Button side="icon" variant={path.active ? "default" : "outline"}>{path.icon}</Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{path.name}</p></TooltipContent>
                </Tooltip>
                </Link></li>  
            })}
            <li > <p>p</p></li>
            </ul>
      </nav>
      
    </Card>
  );
};

export default MobileNav;
