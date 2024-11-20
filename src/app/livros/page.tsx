"use client";

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


import { supabase } from "../services/supabaseClient";
import { DbType } from "../database.types";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [livros, setLivros] = useState<DbType[]>([]);

  const getLivros = async () => {
    const { data, error } = await supabase.from("livros").select("*");
    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setLivros(data);
      console.log("entrou getlivros")
    }
  };

  useEffect(() => {
    getLivros();
  }, []);

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
