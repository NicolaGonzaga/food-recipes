import { API_KEY, API_URL, APP_ID } from "./_constants";

async function fetchAdvancedSearch(mealType = "", diet = "", cuisineType = "") {
  try {
    let url = `${API_URL}?type=public&$app_id=${APP_ID}&app_key=${API_KEY}&`;

    if (mealType) {
      url += `&mealType=${mealType}`;
    }
    if (diet) {
      url += `&diet=${diet}`;
    }
    if (cuisineType) {
      url += `&cuisineType=${cuisineType}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar receitas");
      // INCLUIR UMA MENSAGEM AO USUARIO EM CASO DE ERRO
    }

    const data = await response.json();
    const hits = data.hits;
    sessionStorage.setItem("recipeSearchResults", JSON.stringify(hits));
    return data;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    throw error;
  }
}

export default fetchAdvancedSearch;
