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

import Header from "@/components/Header";
import { FilterBooks, SelectedBooks } from "@/components/FilterBooks";
import { useSelectBooks } from "./contexts/SelectBooksContext";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "./services/supabaseClient";
import { useState } from "react";
import { SaveDeliveryType } from "./database.types";

export default function Home() {
  const { items, removeItem } = useSelectBooks();
  const [ dadosContato, setDadosContato ] = useState<SaveDeliveryType>()

  const salvarEncomenda = async () => {
    console.log(dadosContato)
    const saveData = {"nome": dadosContato?.nome, "telefone": dadosContato?.telefone, "vendedor": dadosContato?.vendedor, 
      "livros": [...items]}
    try {
      await supabase.from("encomendas").upsert([saveData]), {onConflict: 'id'};
      console.log(saveData)
    } catch (error) {
      console.error(error.message);
    }
  };

  const onChange = (e: any) => {
    setDadosContato({ ...dadosContato!, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="w-full">
        <FilterBooks />
      </div>
      <div className="flex">
        <Card>
          <CardHeader>
            <CardTitle>Formulário de encomenda e vale</CardTitle>
            <CardDescription>Encomendas, vales e orçamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input placeholder="Nome:" name="nome" type="text" onChange={onChange}/>
              <Input placeholder="Telefone:" name="telefone" type="tel" onChange={onChange}/>
              <Input placeholder="Nome:" name="vendedor" type="text" onChange={onChange}/>
            </div>
            <div className="mt-7">
              <h1 className="font-bold">Livros Selecionados:</h1>
              <div>
                <h1>Itens Selecionados</h1>
                {items.length === 0 ? (
                  <p>Nenhum item selecionado.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Selecionar</TableHead>
                        <TableHead className="w-[100px]">Código</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Editora</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <button onClick={() => removeItem(item.id)}>
                              <Trash2 size={18} />
                            </button>
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          <TableCell>{item.titulo}</TableCell>
                          <TableCell>{item.editora}</TableCell>
                          <TableCell className="text-right">
                            {item.valor}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter className="text-end">
                      <TableRow className="">
                        {/* <p>Soma total: <span className="font-bold text-red-800">R$ </span></p> */}
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            <Button
              className="bg-green-700 hover:bg-green-800"
              onClick={salvarEncomenda}
            >
              Finalizar Encomenda
            </Button>
            <Button className="bg-cyan-700 hover:bg-cyan-800">
              Emitir Orçamento
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
