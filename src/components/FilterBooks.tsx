import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "./ui/table";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/app/services/supabaseClient";
import { DbType } from "@/app/database.types";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { useSelectBooks } from "@/app/contexts/SelectBooksContext";

export function SelectedBooks(books: any) {
  console.log(books);
  return <ul>oi</ul>;
}

export function FilterBooks() {
  const [livros, setLivros] = useState<DbType[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [livrosSelecionados, setLivrosSelecionados] = useState<number[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { items } = useSelectBooks();

  const { addItem, removeItem } = useSelectBooks();

  const pesquisaLivros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = e.target.value;
    setPesquisa(novoValor);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => buscaPesquisaDb(novoValor), 300);
    setDebounceTimeout(timeout);
  };

  const buscaPesquisaDb = async (titulo: string) => {
    const { data, error } = await supabase
      .from("livros")
      .select()
      .or(`titulo.ilike.%${titulo}%`);

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setLivros(data);
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    livro: DbType
  ) => {
    if (checked) {
      addItem({...livro});
      // setLivrosSelecionados((prevSelecionados) => [...prevSelecionados, livroId]
          
      // );
    } else {
      removeItem(livro.id);
      // setLivrosSelecionados((prevSelecionados) =>
      //    prevSelecionados.filter((id) => id !== livroId)
      // );
    }
  };

  function isChecked(livro: DbType): boolean {
    return items.some(item => item.id === livro.id);
  }

  return (
    <div className="p-4">
      <Input
        placeholder="Título do livro"
        value={pesquisa}
        onChange={pesquisaLivros}
      />
      {livros.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Selecionar</TableHead>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Editor</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {livros.map((livro) => (
              <TableRow key={livro.id}>
                <TableCell>
                  <Checkbox
                    id={livro.id.toString()}
                    checked={isChecked(livro)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange( checked, livro)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{livro.id}</TableCell>
                <TableCell>{livro.titulo}</TableCell>
                <TableCell>{livro.editora}</TableCell>
                <TableCell className="text-right">{livro.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Separator className="my-4 bg-cyan-600" />
    </div>
  );
}
