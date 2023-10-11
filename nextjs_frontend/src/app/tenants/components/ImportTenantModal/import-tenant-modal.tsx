"use client";

import { useState } from "react";

import Button from "@/components/Button/button";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { serverURL } from "@/config";
import { useRouter } from "next/navigation";
import SnackBar from "@/components/SnackBar/snack-bar";

interface ImportTenantModalProps {
  onClose: () => void;
}

export default function ImportTenantModal({
  onClose
}: ImportTenantModalProps) {
  const router = useRouter();
  const [droppedFiles, setDroppedFiles] = useState<any[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<string>("error");

  function callSnackbar(message: string, type: string = "error") {
    setSnackbarMessage(message);
    setSnackbarType(type);
  };

  function validateCSVHeaders(file: any) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          const headers = result.meta.fields;
          const requiredHeaders = [
            "cpf",
            "nome",
            "valorDivida",
            "mensalidadesAtrasadas"
          ];

          const isValid = requiredHeaders.every((header) =>
            headers.includes(header)
          );

          if (isValid) {
            resolve(true);
          } else {
            reject(
              "Invalid headers in the CSV file. Please make sure the headers are 'cpf', 'nome', 'valorDivida', and 'mensalidadesAtrasadas'."
            );
          }
        },
        error: (error) => {
          reject("Error parsing CSV file.");
        },
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const csvRegex = new RegExp(".csv$");
      const isCSV = acceptedFiles.every((file) => csvRegex.test(file.name));

      if (!isCSV) {
        return callSnackbar(
          "Arquivo inválido. Por favor, selecione apenas arquivos .csv"
        );
      }

      const hasValidHeaders = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            await validateCSVHeaders(file);
            return true;
          } catch (error) {
            console.error(`Erro processando o arquivo ${file.name}: ${error}`);
            return false;
          }
        })
      );

      if (hasValidHeaders.every((isValid) => isValid)) {
        setDroppedFiles(acceptedFiles);
      } else {
        callSnackbar(
          "Arquivo inválido. Por favor, verifique se todos os arquivos possuem as colunas 'cpf', 'nome', 'valorDivida' e 'mensalidadesAtrasadas'."
        );
      }
    },
  });

  async function handleSubmit() {
    const formData = new FormData();
    droppedFiles.forEach((file) => formData.append("files", file));

    const response = await fetch(`${serverURL}/api/tenants/import`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      callSnackbar("Devedores adicionados com sucesso!", "success");
      setDroppedFiles([]);
      router.push("/tenants");
    } else {
      callSnackbar("Erro ao enviar os arquivos.");
    }
  };

  return (
    <div className="fixed z-40 inset-0 items-center justify-center overflow-y-auto">
      <SnackBar message={snackbarMessage} type={snackbarType} />

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-800 opacity-50"
            onClick={onClose}
          />
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white mb-10 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-10">
                <h1 className="text-4xl font-bold leading-10">
                  Importar devedores
                </h1>
                <p className="text-base font-light">
                  Adicione a partir de arquivos CSVs. Os arquivos devem conter
                  as colunas &quot;cpf&quot;, &quot;nome&quot;, &quot;valorDivida&quot; e &quot;mensalidadesAtrasadas&quot;.
                </p>
              </div>

              <div
                {...getRootProps()}
                className="mt-4 p-4 border border-dashed cursor-pointer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  border: "2px dashed #000",
                  height: "200px",
                }}
              >
                <input {...getInputProps()} />
                <p className="text-gray-600">
                  Solte seus arquivos aqui ou clique para selecionar.
                </p>
              </div>

              {droppedFiles.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Arquivos:</h3>
                    <ul>
                      {droppedFiles.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 self-start">
                    <Button onClick={handleSubmit}>Enviar</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
