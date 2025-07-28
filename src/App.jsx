import { useState } from 'react'
import './App.css'
import { RecipeListPage } from './pages/RecipeListPage'
import { RecipePage } from "@/pages/RecipePage"

function App() {
  const [selectItem, setItem] = useState();
  return (
    <>
      {selectItem ? (<RecipePage items={selectItem} clickFn={setItem}/>) : (<RecipeListPage clickFn={setItem} />)}
    </>
  );
} 

export default App
