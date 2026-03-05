export const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://netagram.net/graphql';

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  let authToken = token;
  if (!authToken && typeof window !== 'undefined') {
    authToken = localStorage.getItem('admin_token') || undefined;
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(
      json.errors[0]?.message || 'An error occurred during the GraphQL request',
    );
  }

  return json.data;
}

export async function graphqlUploadRequest<T>(
  query: string,
  variables: Record<string, any> = {},
  fileMapping: Record<string, File>,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'apollo-require-preflight': 'true',
  };

  let authToken = token;
  if (!authToken && typeof window !== 'undefined') {
    authToken = localStorage.getItem('admin_token') || undefined;
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const formData = new FormData();

  // 1. operations
  formData.append(
    'operations',
    JSON.stringify({
      query,
      variables,
    }),
  );

  // 2. map
  const map: Record<string, string[]> = {};
  let i = 0;
  for (const varName of Object.keys(fileMapping)) {
    // Backend expects image inside the 'input' object (e.g. variables.input.image)
    map[i.toString()] = [`variables.input.${varName}`];
    i++;
  }
  formData.append('map', JSON.stringify(map));

  // 3. attachments
  i = 0;
  for (const file of Object.values(fileMapping)) {
    formData.append(i.toString(), file);
    i++;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: formData,
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(
      json.errors[0]?.message ||
        'An error occurred during the GraphQL upload request',
    );
  }

  return json.data;
}
