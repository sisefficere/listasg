import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@components/ui/button";
import { ChartBarStacked } from "lucide-react";

export default async function Admin() {
  return (
    <div className="container w-full flex flex-col items-center gap-10">
      <h2 className="tipo-titulo2">Gestão</h2>
      <div className="flex justify-center gap-10">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="cursor-pointer w-full max-w-[150px]"
        >
          <Link href="/admin/anunciantes">
            <BriefcaseBusiness /> Anunciantes
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="cursor-pointer w-full max-w-[150px]"
        >
          <Link href="/admin/taxonomia">
            <ChartBarStacked /> Categorias
          </Link>
        </Button>
      </div>
    </div>
  );
}
