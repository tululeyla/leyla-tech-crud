import { fetchEngineers } from "./api.js";
import { renderCard} from "./ui.js";

const form = document.querySelector("form");
const input = document.querySelector("#engineerName");
const engineerList = document.getElementById("engineer-list");
const submitBtn = form.querySelector("button[type='submit']"); // Grab the submit button


form.addEventListener("submit",async (e)=>{
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Submiting...";
  const engineerName = input.value.trim();
  try{
 const engineer = await fetchEngineers(engineerName);
  renderCard(engineer);
  form.reset();
  }
  catch(error){
    console.error("Error fetching engineers:", error);
  }
  finally{
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";
  }
 

  
})



