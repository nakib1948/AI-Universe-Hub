const UniverseHub = async(datalimit,srotbydate)=>{
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res =await fetch(url)
    const data=await res.json()
    displayUniverseHub(data.data.tools,datalimit,srotbydate)
} 


/* In this function show all data from api will be show by clicking this see more button */
function seeMoreFunction() {
    const newsContainer= document.getElementById('newsContainer')
    newsContainer.textContent=''
    toggleSpinner(true)
    UniverseHub()
    document.getElementById('btn-show-all').remove()
}

// sort by date
function sortByDate(){
    const newsContainer= document.getElementById('newsContainer')
    newsContainer.textContent=''
    toggleSpinner(true)
    UniverseHub(0,3)
    document.getElementById('btn-show-all').remove()
}

const displayUniverseHub=(data,datalimit,srotbydate)=>{
     if(datalimit)
     data=data.slice(0,6)

     if(srotbydate)
     {
        //console.log(data[0].published_in)
        data.sort(function(a, b) {
            var c = new Date(a.published_in);
            var d = new Date(b.published_in);
            return c-d;
        });
       // data.sort(function(a,b){return a.published_in.getTime() - b.published_in.getTime()});
     }

      data.forEach(news=>{
       // console.log(news)
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
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                 style="background-color:#FEF7F7;border-radius:50%;border:none;width:50px hight:30px">
                <img width="50px" src="./images/icons8-right-arrow-64.png">
                </button>
           </div>
           
         </div>
         
      </div>
      </div>`
     
      newsContainer.appendChild(createDiv)
    })
    toggleSpinner(false)
 }
 
 const toggleSpinner = isLoading=>{
    const loaderSection= document.getElementById('loader')
    if(isLoading)
    {
        loaderSection.classList.remove('d-none')
    }
    else loaderSection.classList.add('d-none')
}


 UniverseHub(6)