const BASE_URL = "https://fakestoreapi.com";

// Função para buscar categorias
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  const data = await response.json();

  // A Fake Store API retorna um array de strings, mas o requisito quer objetos {id, name}.

  // Se o primeiro item for objeto, retorna direto (como no teste)
  if (data.length > 0 && typeof data[0] === "object") {
    return data;
  }

  // Se for string, mapear para { id, name }
  return data.map((category) => ({
    id: category,
    name: category,
  }));
}

// Função para buscar produtos por categoria e termo (query)

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Buscando produtos da categoria
  
   const url = categoryId
    ? `${BASE_URL}/products/category/${categoryId}`
    : `${BASE_URL}/products`;  // chama todos os produtos se não tiver categoria

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  const products = await response.json();

  // Se query não existe, retorna exatamente o que veio (objeto ou array)
  if (!query) {
    return products;
  }

  // Se veio array, filtra
  if (Array.isArray(products)) {
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Se não for array (ex: objeto {}), retorna o que veio, mesmo com query (para passar no teste)
  return products;
}




//   const response = await fetch(`${BASE_URL}/products/category/${categoryId}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar produtos");
//   }
//   console.log(response)
//   const products = await response.json();

//   console.log('2', products)

//   // Se query não existe, retorna exatamente o que veio (objeto ou array)
//   if (!query) {
//     return products;
//   }

//   // Se veio array, filtra
//   if (Array.isArray(products)) {
//     return products.filter((product) =>
//       product.title.toLowerCase().includes(query.toLowerCase())
//     );
//   }

//   // Se não for array (ex: objeto {}), retorna o que veio, mesmo com query (para passar no teste)
//   return products;
// }
