import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiKey = '99b23d95a15340ec9d47c0aac5879045';
  private apiUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  // obtener recetas según los ingredientes
  getRecipesByIngredients(ingredients: string[]): Observable<any> {
    const params = new HttpParams()
      .set('ingredients', ingredients.join(','))
      .set('number', '10') // Obtener 10 recetas
      .set('ranking', '1') // Ordenar por popularidad
      .set('ignorePantry', 'true') // Ignorar los ingredientes de la despensa
      .set('apiKey', this.apiKey);

    return this.http.get(`${this.apiUrl}/findByIngredients`, { params }); // Obtener recetas según los ingredientes
  }

  // obtener detalles completos de una receta
  getRecipeInformation(recipeId: number): Observable<any> {
    const params = new HttpParams().set('apiKey', this.apiKey); 
    return this.http.get(`${this.apiUrl}/${recipeId}/information`, { params }); 
  }
}
