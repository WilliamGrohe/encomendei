"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


import { supabase } from "./services/supabaseClient";
import { DbType } from "./database.types";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [livros, setLivros] = useState<DbType[]>([]);
  const [pesquisa, setPesquisa] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const pesquisaLivros = (e: any) => {
    const novoValor = e.target.value;
    setPesquisa(novoValor); // Atualiza o estado com o novo valor do input

    // Limpa o timeout anterior se houver
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Cria um novo timeout
    const timeout = setTimeout(() => {
      buscaPesquisaDb(novoValor); // Chama a função de busca após o delay
    }, 1000); // 300ms de delay (você pode ajustar esse valor)

    setDebounceTimeout(timeout); // Armazena o timeout para referência

    console.log(livros)
  }

  async function buscaPesquisaDb(titulo: string) {
    const { data, error } = await supabase
      .from("livros")
      .select()
      .textSearch("titulo", titulo)

    if(error){
      console.error("Error fetching data:", error.message);
    } else {
      setLivros(data)
    }
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Card>
          <CardHeader>
            <CardTitle>Formulário de encomenda e vale</CardTitle>
            <CardDescription>Encomendas, vales e orçamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input placeholder="Nome:" type="text" />
              <Input placeholder="Telefone:" type="tel" />
              <Input 
              placeholder="Título do livro" 
              value={pesquisa}
              onChange={pesquisaLivros}
              />
              <span>{pesquisa}</span>
              <button onClick={buscaPesquisaDb}>Pesquisar</button>
            </div>
            <div className="">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {livros.map((livro) => (
                    <TableRow key={livro.id}>
                      <TableCell className="font-medium">{livro.id}</TableCell>
                      <TableCell>{livro.titulo}</TableCell>
                      <TableCell>{livro.editora}</TableCell>
                      <TableCell className="text-right">
                        {livro.valor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <p>Finalizar Encomenda</p>
            <p>Emitir Orçamento</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
