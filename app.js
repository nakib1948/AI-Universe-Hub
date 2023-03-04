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
                <button onclick="loadDataDetails('${news.id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                 style="background-color:#FEF7F7;border-radius:50%;border:none;width:50px hight:30px">
                <img width="30px" src="./images/icons8-right-arrow-64.png">
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

const loadDataDetails= async id=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res= await fetch(url)
    const data=await res.json()
    console.log(data.data)
    displayDataDetails(data.data)
}
const displayDataDetails= news=>{
    const description=document.getElementById('description-part')
     description.innerText=news.description
     const price=document.getElementById('pricing')
     const price1=document.getElementById('pricing1')
     const price2=document.getElementById('pricing2')


     ///pricing part of modal
    if(news.pricing != null)
    {
        price.innerHTML=`
        <p style="color:green">${news.pricing[0].price}</p>
        <p  style="color:green">${news.pricing[0].plan}</p>
        `
        price1.innerHTML=`
        <p style="color:orange">${news.pricing[1].price}</p>
        <p style="color:orange">${news.pricing[1].plan}</p>
        `
        price2.innerHTML=`
        <p class='text-center' style="color:#EB5757">${news.pricing[2].price}</p>
        <p class='text-center'  style="color:#EB5757">${news.pricing[2].plan}</p>
        `
    }
    else {
        price.innerHTML=` <p style="color:green">Free of <br> Cost/Basic</p>`
        price1.innerHTML=` <p style="color:orange">Free of <br> Cost/Pro</p>`
        price2.innerHTML=` <p style="color:#EB5757">Free of <br> Cost/Enterprice</p>`
    }
    
    
  


     const features=document.getElementById('features')
     const integration=document.getElementById('Integrations')

        


    //  features.innerHTML=`
    //  <h4>Features</h4>
     
    //  <li>${news.features[1].feature_name}</li>
    //  <li>${news.features[2].feature_name}</li>
    //  <li>${news.features[3].feature_name}</li>
    //  `

     for(let data in news.features) {
        let value = news.features[data].feature_name
      
        features.innerHTML += `<li>${value}</li>`
    }
  



     if(news.integrations!=null)
     {
        let listItems = news.integrations.map(function(data){
            return '<li>' + data + '</li>';
          })
    
         integration.innerHTML=listItems.join('');
         integration.innerHTML="<h4>Integrations</h4>" +  integration.innerHTML
     }
     else{
        integration.innerHTML=`<h4>Integrations</h4><p>No data Found</p>`
     }
   
    
     document.getElementById("cardimg").src = news.image_link[0];


     const chatting=document.getElementById('chatting')
     chatting.innerHTML=`
     <h4 class='text-center' >${news.input_output_examples[0].input}</h4>
     <p class='text-center' >${news.input_output_examples[0].output}</p>
     `
    
    
    
    
    
    
     //  const img=document.createElement("img"); 
    //  img.src = `${news.image_link[0]}`; 
    //  const src = document.getElementById("second-card"); 
    //  src.appendChild(img); 
    // const phoneDetails= document.getElementById('phone-details')
    // phoneDetails.innerHTML=`
    // <p>Release Date: ${phone.releaseDate ? phone.releaseDate :'No release date found'}</p>
    // <p>Others: ${phone.mainFeatures ? phone.mainFeatures.storage:'No Storage Information'}</p>
    // `
}



 UniverseHub(6)