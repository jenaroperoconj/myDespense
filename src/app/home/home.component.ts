import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecipeService } from '../common/services/recipe/recipe.service';
import { FirestoreService } from '../common/services/firestore/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  selectedRecipe: any = null;
  availableIngredients: any[] = [];
  missingIngredients: any[] = [];
  instructions: string[] = [];
  loading: boolean = true;

  constructor(
    private recipeService: RecipeService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.loadIngredientsAndRecipes();
  }

  // Cargar ingredientes desde Firestore y recetas en caché
  private loadIngredientsAndRecipes(): void {
    this.firestoreService.getDocs('productos').subscribe(
      (products) => {
        const ingredients = products.map(product => product.nombre);
        const ingredientsKey = ingredients.join(',');
        const cachedIngredients = localStorage.getItem('cachedIngredients');
        const cachedRecipes = localStorage.getItem('cachedRecipes');

        if (cachedIngredients === ingredientsKey && cachedRecipes) { // Si los ingredientes no han cambiado, usa las recetas almacenadas en caché
          this.useCachedRecipes(cachedRecipes);
        } else {
          this.fetchRecipesFromAPI(ingredients, ingredientsKey);
        }
      },
      (error) => {
        console.error('Error fetching products from Firestore', error);
        this.loading = false;
      }
    );
  }

  //Usar recetas guardadas en el caché local.
  private useCachedRecipes(cachedRecipes: string | null): void {
    if (cachedRecipes) {
      this.recipes = JSON.parse(cachedRecipes);
    }
    this.loading = false;
  }

  //Consultar recetas desde la API y actualizar el caché.
  private fetchRecipesFromAPI(ingredients: string[], ingredientsKey: string): void {
    this.recipeService.getRecipesByIngredients(ingredients).subscribe(
      (data) => {
        this.recipes = data; 
        this.loading = false;
        // Almacenar en caché los ingredientes y las recetas obtenidas
        localStorage.setItem('cachedIngredients', ingredientsKey);
        localStorage.setItem('cachedRecipes', JSON.stringify(data));
      },
      (error) => {
        console.error('Error fetching recipes', error);
        this.loading = false;
      }
    );
  }

  //Seleccionar una receta para ver detalles.
  selectRecipe(recipeId: number): void {
    this.loading = true;
    const cachedRecipeDetails = localStorage.getItem(`recipe_${recipeId}`); 
    const cachedIngredients = localStorage.getItem('cachedIngredients'); 
    // Verificar si los detalles de la receta ya están en el caché y si los ingredientes coinciden
    if (cachedRecipeDetails && cachedIngredients === localStorage.getItem('cachedIngredients')) {
      this.useCachedRecipeDetails(cachedRecipeDetails);
    } else {
      this.fetchRecipeDetailsFromAPI(recipeId);
    }
  }

  //Usar los detalles de la receta almacenados en caché.
  private useCachedRecipeDetails(cachedRecipeDetails: string | null): void {
    if (cachedRecipeDetails) {
      const recipe = JSON.parse(cachedRecipeDetails);
      this.setRecipeDetails(recipe);
    }
    this.loading = false;
  }

  //Consultar detalles de una receta desde la API y actualizar el caché.
  private fetchRecipeDetailsFromAPI(recipeId: number): void {
    this.recipeService.getRecipeInformation(recipeId).subscribe(
      (recipe) => {
        this.setRecipeDetails(recipe);
        localStorage.setItem(`recipe_${recipeId}`, JSON.stringify(recipe)); // Guardar detalles en el caché
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching recipe details', error);
        this.loading = false;
      }
    );
  }

  //Configurar detalles de la receta seleccionada: instrucciones y separación de ingredientes.
  private setRecipeDetails(recipe: any): void {
    this.selectedRecipe = recipe;
    this.instructions = recipe.instructions ? recipe.instructions.split('. ') : [];
    const pantryIngredients = this.extractPantryIngredients();

    // Separar ingredientes disponibles y faltantes
    this.availableIngredients = recipe.extendedIngredients.filter((ingredient: { name: string }) =>
      pantryIngredients.includes(ingredient.name)
    );
    this.missingIngredients = recipe.extendedIngredients.filter((ingredient: { name: string }) =>
      !pantryIngredients.includes(ingredient.name)
    );
  }

  //Extraer los ingredientes disponibles en la despensa.
  private extractPantryIngredients(): string[] {
    return this.recipes
      .map((recipe: { usedIngredients: { name: string }[] }) =>
        recipe.usedIngredients.map((ing: { name: string }) => ing.name)
      )
      .reduce((acc, val) => acc.concat(val), []);
  }
}
