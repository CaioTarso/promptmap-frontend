export function handleApiErrors(error) {
  if (!error.response) {
    return ['Erro de conexão com o servidor.'];
  }

  const { status, data } = error.response;

  if (status === 401) {
    return ['Credencial inválida.'];
  }

  if (status === 422 && data?.errors) {
    const emailErrors = data.errors?.email ?? [];
    const emailTaken = emailErrors.some((msg) =>
      msg.toLowerCase().includes('taken') || msg.toLowerCase().includes('already')
    );

    if (emailTaken) {
      return ['Credencial já existente.'];
    }

    return Object.values(data.errors).flat();
  }

  if (data?.message) {
    return ['Credencial inválida.'];
  }

  return ['Erro inesperado. Tente novamente.'];
}
