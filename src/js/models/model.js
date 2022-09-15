import { API_URL, KEY, RES_PER_PAGE } from "../config";
import { getJSON, sendJSON } from "../helpers";

export const state = {
    recipe : {},
    search : {
        query : "",
        results : [],
        resultPerPage : RES_PER_PAGE,
        page : 1
    },
    bookmark : []
}

const createRecipeObject = (recipe) =>{
    console.log(recipe);
    
    return {
      id : recipe.id,
      cookingTime : recipe.cooking_time,
      imageUrl : recipe.image_url,
      ingredients : recipe.ingredients,
      publisher : recipe.publisher,
      servings : recipe.servings,
      sourceUrl : recipe.source_url,
      title : recipe.title,
      ...(recipe.key  && {key : recipe.key}) //Si el data.key no existe se activa el cortocircuito y queda en nada, en cambio si existe, se crea un miniobjeto con key y su valor y como resultado final se destructura
    }
}


export const loadRecipe = async(id)=>{
    try {
        const data = await getJSON(`${API_URL}${id}?key=${KEY}`)
        let recipe = data.data.recipe;
        state.recipe = createRecipeObject(recipe);

        if(state.bookmark.some(b => b.id === state.recipe.id)) state.recipe.bookmarked = true
        else state.recipe.bookmarked = false
    } catch (error) {
        throw error
    }

}


export const searchRecipes = async(query) =>{
    try{
        const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.page =1;
        state.search.query = query;
        state.search.results = data.data.recipes.map(recipe =>{
            return {
                id : recipe.id,
                imageUrl : recipe.image_url,
                publisher : recipe.publisher,
                title : recipe.title,
                ...(recipe.key  && {key : recipe.key}) //Si el data.key no existe se activa el cortocircuito y queda en nada, en cambio si existe, se crea un miniobjeto con key y su valor y como resultado final se destructura
            }
        });

    }catch(err){
        throw err;
    }
    //https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
}

export const getSearchResultsPage = (page = state.search.page) =>{
    state.search.page=page;
    const start = (page - 1) * state.search.resultPerPage; //0
    const end =  state.search.resultPerPage * page //10
    return state.search.results.slice(start,end) //Envia una copia desde la posicion start a end -1 ya que el ultimo no lo considera
}


export const updateServing = (newServing) =>{
    state.recipe.ingredients.forEach(ing => {
        //form =  (oldQy * newServing) / oldServing
        ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    });
    state.recipe.servings = newServing;
}


const persistBookmark = () =>{
    localStorage.setItem("bookmark", JSON.stringify(state.bookmark));
}

export const addBookmark = (recipe) => {
    state.bookmark.push(recipe);
    if(recipe.id === state.recipe.id){ //Si la receta marcada es igual a la receta que se está mostrando
        state.recipe.bookmarked = true;
    }
    persistBookmark();

}

export const removeBookmark = (id) =>{
    const index = state.bookmark.findIndex(b => b.id === id);
    state.bookmark.splice(index,1);
    if(state.recipe.id === id) state.recipe.bookmarked = false;
    persistBookmark();
}

export const uploadRecipe = async(newRecipe) => {
    // Recorrer y obtener las recetas no vacias
    // Obtener en un nuevo array las nuevas recetas
    try{
        const ingredient = Object.entries(newRecipe).filter(ing => ing[0].startsWith("ingredient") && ing[1] !== "")
                            .map(ing =>{
                                console.log(ing);
                                const ingArr = ing[1].trim().replaceAll(" ", "").split(",")
                                if(ingArr.length !== 3) throw new Error("Bad format for the ingredients")
                                const [quantity,unit,description] = ingArr;
                                return {
                                    quantity : (quantity) ? Number(quantity) : null,
                                    unit,
                                    description
                                }
                            });
        const recipe = {          
            cooking_time : newRecipe.cookingTime,
            image_url : newRecipe.imageUrl,
            ingredients : ingredient,
            publisher : newRecipe.publisher,
            servings : newRecipe.servings,
            source_url : newRecipe.sourceUrl,
            title : newRecipe.title
        }

        const resp = await sendJSON(`${API_URL}?key=${KEY}`,recipe)
        state.recipe = createRecipeObject(resp.data.recipe);
        addBookmark(state.recipe)
        console.log(state.recipe);
    }catch(err){
        throw err;
    }
}

const init = () =>{
    const storage = localStorage.getItem("bookmark");
    console.log(storage);
    if(storage) state.bookmark = JSON.parse(storage);
}

init();