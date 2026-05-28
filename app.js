const menuContainer = document.getElementById("menu-container");

const langSwitcher = document.getElementById("lang-switcher");
const menuSwitcher = document.getElementById("menu-switcher");

let currentLang = "it";
let currentMenu = "piano";

async function loadMenu() {

  const response = await fetch(
    `data/${currentMenu}.${currentLang}.json`
  );

  const data = await response.json();

  renderMenu(data);

}

function renderMenu(data){

  menuContainer.innerHTML = "";

  data.categories.forEach(category => {

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    categoryDiv.innerHTML = `
    
      <div class="category-header">
        <span>${category.name}</span>
        <span class="arrow">▼</span>
      </div>

      <div class="category-items">

        ${category.items.map(item => `
        
          <div class="item">

            <span class="item-name">
              ${item.name}
            </span>

            <span class="item-price">
              € ${item.price}
            </span>

          </div>

        `).join("")}

      </div>

    `;

    const header = categoryDiv.querySelector(".category-header");

    header.addEventListener("click", () => {

    document.querySelectorAll(".category").forEach(cat => {

    if(cat !== categoryDiv){
      cat.classList.remove("active");
    }

  });

  categoryDiv.classList.toggle("active");

});

    menuContainer.appendChild(categoryDiv);

  });

}

langSwitcher.addEventListener("change", (e)=>{
  currentLang = e.target.value;
  loadMenu();
});

menuSwitcher.addEventListener("change", (e)=>{
  currentMenu = e.target.value;
  loadMenu();
});

loadMenu();