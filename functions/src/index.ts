import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

const SPOONACULAR_API_KEY = "99b23d95a15340ec9d47c0aac5879045";
const SPOONACULAR_BASE_URL =
  "https://api.spoonacular.com/recipes/findByIngredients";

// Función para buscar recetas basadas en los productos de Firestore
export const getRecipesFromFirestoreProducts = onRequest(
  async (request, response) => {
    try {
      const productosSnapshot = await admin
        .firestore()
        .collection("productos")
        .get();

      // Extrae los nombres de los productos como ingredientes
      const ingredientes = productosSnapshot.docs
        .map((doc) => doc.data().nombre)
        .filter((nombre) => !!nombre);

      if (ingredientes.length === 0) {
        response.status(400).send(
          "No hay ingredientes disponibles en Firestore."
        );
        return;
      }

      // Haz la solicitud a Spoonacular con los ingredientes de Firestore
      const apiResponse = await axios.get(SPOONACULAR_BASE_URL, {
        params: {
          ingredients: ingredientes.join(","),
          number: 5, // Número de recetas a devolver
          apiKey: SPOONACULAR_API_KEY,
        },
      });

      // Devuelve las recetas obtenidas
      response.json(apiResponse.data);
    } catch (error) {
      logger.error(
        "Error al obtener recetas basadas en Firestore:", error
      );
      response.status(500).send("Error al obtener recetas.");
    }
  }
);
