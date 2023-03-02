const UniverseHub = async(datalimit)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res =await fetch(url)
    const data=await res.json()
    displayUniverseHub(data.data.tools,datalimit)
} 

function myFunction() {
    UniverseHub()
}

const displayUniverseHub=(data,datalimit)=>{
  
     if(datalimit)
     data=data.slice(0,6)
      data.forEach(news=>{
        console.log(news)
      const createDiv=document.createElement('div')
    
    
      createDiv.classList.add('col')
      createDiv.innerHTML=`
      <div class="card h-100 p-4 rounded">
      <img src="${news.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Features</h5>
         <small>${`1. ${news.features[0]}`}</small> <br>
         <small>${`2. ${news.features[1]}`}</small> <br>
         <small>${news.features.length>2 ? `3. ${news.features[2]}`:''}</small> <br>
         <small>${news.features.length>3 ? `4. ${news.features[3]}`:''}</small>
         <hr class="mt-3 mb-3">
         <div>
           <h4>${news.name}</h4>
           <div class="d-flex justify-content-between">
                <small> <img width='15px' class='mr-1' src="./images/calendar-blank-icon.svg">
                ${news.published_in}</small>
                <button style="background-color:#FEF7F7;border-radius:50%;border:none;width:50px hight:30px">
                <img width="50px" src="./images/icons8-right-arrow-64.png">
                </button>
           </div>
           
         </div>
         
      </div>
      </div>`
     
      newsContainer.appendChild(createDiv)
    })

 }
 

 UniverseHub(6)