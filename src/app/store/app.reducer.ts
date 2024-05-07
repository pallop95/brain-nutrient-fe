import { ActionReducerMap } from "@ngrx/store";

// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBook from '../book/store/book.reducer';
// import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
  // shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  book: fromBook.State;
  // recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  // shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer,
  // recipes: fromRecipes.recipeReducer
};
