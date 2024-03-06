import { useEffect, useState } from "react";
import fetchRandomRecipes from "../data/randomRecipes";
import CardRecipe from "./cardRecipe";

function FeaturedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        //Verifica se ja tem randomRecipes na sessionStorage. Se nao encontrar, chama o fetchRandomRecipes e salva os items para poder usar
        const storageItems = sessionStorage.getItem("randomRecipes");
        if (!storageItems) {
          console.log("chamou o fetch para buscar outras");
          const fetchedRecipes = await fetchRandomRecipes();
          setRecipes(fetchedRecipes);
        } else {
          setRecipes(JSON.parse(storageItems));
          console.log("pegou as que ja tinha");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  const shuffleRecipes = (array) => {
    //embaralha os objetos do array. Vamos usar so os tres primeiros depois de embaralhados
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <section className="featured-recipes-section">
      <h2>Receitas em destaque</h2>
      <div className="btn-container">
        <button className="view-more-btn">View more</button>
      </div>
      <div className="top-recipes">
        {shuffleRecipes(recipes)
          .slice(0, 3)
          .map((recipe, index) => (
            <CardRecipe
              key={index}
              id={recipe.recipe.uri}
              {...recipe.recipe}
            />
          ))}
      </div>
    </section>
  );
}

export default FeaturedRecipes;
