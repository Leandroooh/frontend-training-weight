export function extractApiError(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as any;
    const data = axiosError.response?.data;

    // Caso 1: backend já retorna uma mensagem limpa
    if (typeof data?.message === "string") {
      return data.message;
    }

    // Caso 2: erro de validação (Zod, etc)
    if (Array.isArray(data?.issues)) {
      return data.issues[0]?.message ?? "Dados inválidos.";
    }

    if (Array.isArray(data?.errors)) {
      return data.errors[0]?.message ?? "Dados inválidos.";
    }

    return "Erro desconhecido retornado pelo servidor.";
  }

  // Erro genérico JS
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}
