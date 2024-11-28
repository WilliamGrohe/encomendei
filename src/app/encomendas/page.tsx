"use client";

import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { SaveDeliveryType } from "../database.types";

import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState<SaveDeliveryType[]>([]);

  const getDeliveries = async () => {
    const { data, error } = await supabase.from("encomendas").select("*");
    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setEncomendas(data);
      console.log("entrou getlivros");
      console.log(data);
      console.log(encomendas[0]);
      
    }
  };

  useEffect(() => {
    getDeliveries();
  }, []);

  return (
    <>
      <Header />
      <div className="">
        <h1 className="font-bold text-2xl p-4">Encomendas Em Aberto:</h1>
        {encomendas.map((encomenda) => {
          return (
            <Card className="border-gray-800 mx-4 my-4" key={encomenda.id}>
              <CardHeader>
                <CardTitle>Cliente: {encomenda.nome}</CardTitle>
                <CardDescription>Data da encomenda:</CardDescription>
              </CardHeader>
              <CardContent>
                <h3>{encomenda.nome}</h3>
                <h3>{encomenda.telefone}</h3>
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
                    {encomenda.livros.map((livro) => {
                      return (
                        <TableRow key={livro.id}>
                          <TableCell className="font-medium">
                            {livro.id}
                          </TableCell>
                          <TableCell>{livro.titulo}</TableCell>
                          <TableCell>{livro.editora}</TableCell>
                          <TableCell className="text-right">
                            {livro.valor}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
