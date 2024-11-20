import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-cyan-600 px-4 py-2">
      <NavigationMenu >
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Nova Encomenda
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/livros/create" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Registrar novo Livro
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
