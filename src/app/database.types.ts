import { Database } from "./supabase";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DatabaseType {
  public: {
    Tables: {
      livros: {
        Row: {
          // the data expected from .select()
          id: number;
          titulo: string;
          materia: string;
          escolar: string;
          editora: string;
          ano: string;
          valor: number;
        };
        Insert: {
          // the data to be passed to .insert()
          id?: never; // generated columns must not be supplied
          name?: string; // `not null` columns with no default must be supplied
          data?: Json | null; // nullable columns can be omitted
        };
        Update: {
          // the data to be passed to .update()
          id?: never;
          name?: string; // `not null` columns are optional on .update()
          data?: Json | null;
        };
      };
    };
  };
}

// export interface DbType {
//   id: number,
//   titulo: string,
//   materia: string,
//   escola: string,
//   editora: string,
//   ano: string,
//   valor: number,
// }
export interface DbType {
  ano: string;
  editora: string;
  escola: string;
  escolas: Database["public"]["Enums"]["escolas"][];
  id: number;
  isbn: number;
  materia: string;
  teste: Database["public"]["Enums"]["materias"] | undefined;
  titulo: string;
  valor: number;
}

export interface SaveDeliveryType {
  id: number;
  nome: string;
  telefone: number;
  vendedor: string;
  finalizado: boolean;
  livros: [DbType];
}
