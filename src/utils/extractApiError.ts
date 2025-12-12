export function extractApiError(error: unknown): string {
  // Erro vindo do Axios
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    // biome-ignore lint/suspicious/noExplicitAny: Utils
    typeof (error as any).response === "object"
  ) {
    // biome-ignore lint/suspicious/noExplicitAny: Utils
    const axiosError = error as any;
    const data = axiosError.response?.data;

    if (data?.message) {
      return data.message;
    }

    return "Erro desconhecido retornado pelo servidor.";
  }

  // Erro genérico
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}
