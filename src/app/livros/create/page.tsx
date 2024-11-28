"use client";

import { DbType } from "@/app/database.types";
import { supabase } from "@/app/services/supabaseClient";
import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [livro, setLivro] = useState<DbType>({
    ano: "",
    editora: "",
    escola: "",
    escolas: [],
    id: 0,
    isbn: 0,
    materia: "",
    teste: undefined,
    titulo: "",
    valor: 0,
  });

  const onChange = (e: any) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await supabase.from("livros").upsert([livro]), { onConflict: "id" };
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Registrar Novo Livro</h1>
        </div>
        <form>
          <div className="mb-4">
            <label>Id</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="number"
              name="id"
              value={livro?.id}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Titulo</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="titulo"
              value={livro?.titulo}
              onChange={onChange}              
            />
          </div>
          <div className="mb-4">
            <label>Matéria</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="materia"
              value={livro?.materia}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Escola</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="escola"
              value={livro?.escola}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Editora</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="editora"
              value={livro?.editora}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Ano</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="ano"
              value={livro?.ano}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Valor</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="number"
              name="valor"
              value={livro?.valor}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleCreate}
          >
            Registrar Livro
          </button>
        </form>
      </div>
      <Head>
        <title>Registrar Livro</title>
      </Head>
    </>
  );
}
