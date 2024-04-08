import { useEffect, useState } from "react";
import { fetchDataRecipes } from "../../data/_dataRecipe";
import NutritionalFacts from "../../components/_nutrionalFacts";

function Recipe() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split("/");
  const recipeId = urlParts[urlParts.length - 1];

  const [loading, setLoading] = useState(true);
  const [recipeData, setRecipeData] = useState(null);

  const storedRecipe =
    JSON.parse(sessionStorage.getItem("recipeData"))?.recipe || {};
  const {
    label,
    calories,
    cuisineType,
    dietLabel,
    dishType,
    ingredientLines,
    ingredients,
    mealType,
    image,
  } = storedRecipe;
  
  const yieldValue = storedRecipe["yield"];

  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const data = await fetchDataRecipes(recipeId);
        setRecipeData(data);
        setLoading(false);
      } catch (error) {
        // INCLUIR MSG DE ERRO
        console.error("Erro ao buscar dados da receita:", error);
        setLoading(false);
      }
    }

    fetchRecipeData();
  }, [recipeId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!recipeData) {
    return <div>Erro ao carregar a receita.</div>;
  }

  return (
    <>
      <h1>{label}</h1>
      <div className="recipe-header">
        <img
          src={image}
          alt="imagem da receita"
        />
        <NutritionalFacts />
      </div>
      <div>{calories}</div>
      <div>{cuisineType}</div>
      <div>{dietLabel}</div>
      <div>{dishType}</div>
      <div>{mealType}</div>
      <div>{yieldValue}</div>
      <div>
        {ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </div>
      <div>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </div>
    </>
  );
}

export default Recipe;
