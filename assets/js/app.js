let cl=console.log;
const showModelbtn=document.getElementById("showModelbtn");
const moviemodel=document.getElementById("moviemodel");
const backdrop=document.getElementById("backdrop");
const closeModel=[...document.querySelectorAll(".closeModel")];
const moviecards=document.getElementById('moviecards')
const movieForm=document.getElementById('movieForm')
const MovieNamecontrol=document.getElementById('MovieName')
const MovieImgUrlcontrol=document.getElementById('MovieImgUrl')
const MovieDescripationcontrol=document.getElementById('MovieDescripation')
const Movieratingcontrol=document.getElementById('Movierating')
const movieaddBtn=document.getElementById('MovieAddBtn');
const movieupdateBtn=document.getElementById('MovieUpdateBtn');




let movieArr=[];
if(localStorage.getItem("movieArr")){
  movieArr=JSON.parse(localStorage.getItem("movieArr"))
}

function showToast(title, icon) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: '#000',
    color: '#fff'
  });
}


const localStorageSet=()=>{
  localStorage.setItem("movieArr", JSON.stringify(movieArr))
 
}

const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}


const Setbadge=(rating)=>{
  if(rating>4){
    return "badge-success";
  }else if(rating>3&&rating<=4){
  return "badge-warning";
  }else{
    return "badge-danger";
  }
}



const createMovieCard=(arr)=>{
 let result="";
  arr.forEach(movie=>{
   result+=`<div class="col-md-3 col-sm-6 mb-4">
                    <div class="card movieCard text-white" id="${movie.MovieId}">
                        <div class="card-heading">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-10"> <h2 class="m-0 ">${movie.MovieName}</h2></div>
                               <div class="col-2 px-1">
                               <h3 class="m-0"><span class="badge ${Setbadge(movie.rating)}">${movie.rating}</span></h3>
                            </div>
                            </div>
                          </div>
                        <div class="card-body py-0">
                          <figure>
                            <img src="${movie.MovieImgUrl}" alt="" title="">
                            <figcaption>
                                <h5>${movie.MovieName}</h5>
                                <p> ${movie.descripation}
                                </p>
                           

                            </figcaption>
                          </figure>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                             <button class="btn btn-sm nfx-sec-btn" onclick="EditMovieObj(this)">edit</button> 
                             <button  type="button" class=" btn btn-sm nfx-pri-btn" onclick="RemoveMovie(this)">remove</button>
                        </div>
                    </div>
                   </div> `
  })
  moviecards.innerHTML=result;
}
createMovieCard(movieArr)


//------editObj-------//

const EditMovieObj=(ele)=>{
  let edit_id=ele.closest(".card").id;
  localStorage.setItem("edit_id", edit_id)
  let editObj=movieArr.find(movie=>movie.MovieId===edit_id);

  OnMovieToggle()
MovieNamecontrol.value=editObj.MovieName;
MovieImgUrlcontrol.value=editObj.MovieImgUrl;
Movieratingcontrol.value=editObj.rating;
MovieDescripationcontrol.value=editObj.descripation;


movieaddBtn.classList.add('d-none');
movieupdateBtn.classList.remove('d-none');




}


//-----updateObj-----//
const UpdateMovieObj=()=>{
 let update_id= localStorage.getItem("edit_id");
 localStorage.removeItem("edit_id");

 let updateObj={
  MovieName: MovieNamecontrol.value,
    MovieImgUrl:MovieImgUrlcontrol.value ,
    rating:  Movieratingcontrol.value,
    descripation:  MovieDescripationcontrol.value, 
    MovieId: update_id 
 }

 
 let getindex=movieArr.findIndex(movie=>movie.MovieId===update_id);

 movieArr[getindex]=updateObj;

 localStorageSet()

 let card=document.getElementById(update_id);

 card.innerHTML=`<div class="card-heading">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-10"> <h2 class="m-0 ">${updateObj.MovieName}</h2></div>
                               <div class="col-2 px-1">
                               <h3 class="m-0"><span class="badge ${Setbadge(updateObj.rating)}">${updateObj.rating}</span></h3>
                            </div>
                            </div>
                            
                        </div>
                        <div class="card-body py-0">
                          <figure>
                            <img src="${ updateObj.MovieImgUrl}" alt="" title="">
                            <figcaption>
                                <h5>${updateObj.MovieName}</h5>
                                <p> ${updateObj.descripation}
                                </p>
                           

                            </figcaption>
                          </figure>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                             <button class="btn btn-sm nfx-sec-btn" onclick="EditMovieObj(this)">edit</button> 
                             <button  type="button" class=" btn btn-sm nfx-pri-btn" onclick="RemoveMovie(this)">remove</button>
                        </div>
                    </div>`
movieaddBtn.classList.remove('d-none');
movieupdateBtn.classList.add('d-none');
movieForm.reset();

OnMovieToggle()

 showToast(`${updateObj.MovieName} updated successfuly`, "success")  

}




//----------remove---------//
const RemoveMovie=(ele)=>{
  Swal.fire({
  title: "Are you sure?",
  text: "You want to be delete this movie",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#E50914",
  cancelButtonColor: "#212529",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let remove_id=ele.closest(".card").id;
   cl(remove_id)
   let getindex=movieArr.findIndex(movie=>movie.MovieId===remove_id);
  movieArr.splice(getindex, 1);
  localStorageSet();

ele.closest(".col-md-3").remove();

 showToast(`${remove_id} removed successfuly`, "success")  

   
  }
});
   
}  


const OnMovieToggle=()=>{
moviemodel.classList.toggle('active')
backdrop.classList.toggle('active')

movieForm.reset();                          
  movieaddBtn.classList.remove('d-none');
  movieupdateBtn.classList.add('d-none');
}


const OnMovieSubmit=(eve)=>{
  eve.preventDefault();
  //cl("click")

  //createnewMovieObj
  let createMovieObj={
     MovieName: MovieNamecontrol.value,
    MovieImgUrl:MovieImgUrlcontrol.value ,
    rating:  Movieratingcontrol.value,
    descripation:  MovieDescripationcontrol.value, 
    MovieId: uuid()
  }
  cl(createMovieObj)
   movieForm.reset();

   movieArr.unshift(createMovieObj)

   localStorageSet()

   let div=document.createElement('div');
   div.className="col-md-3 col-sm-6 mb-4 ";

   div.innerHTML=`<div class="card movieCard text-white" id="${createMovieObj.MovieId}">
                        <div class="card-heading">
                           <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-10"> <h2 class="m-0 ">${createMovieObj.MovieName}</h2></div>
                               <div class="col-2 px-1">
                               <h3 class="m-0"><span class="badge ${Setbadge(createMovieObj.rating)}">${createMovieObj.rating}</span></h3>
                            </div>
                            </div>
                            
                        </div>
                        <div class="card-body py-0">
                          <figure>
                            <img src="${createMovieObj.MovieImgUrl}" alt="" title="">
                            <figcaption>
                                <h5>${createMovieObj.MovieName}</h5>
                                <p> ${createMovieObj.descripation}
                                </p>
                           

                            </figcaption>
                          </figure>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                             <button class="btn btn-sm nfx-sec-btn"  onclick="EditMovieObj(this)">edit</button> 
                             <button  type="button" class=" btn btn-sm nfx-pri-btn" onclick="RemoveMovie(this)">remove</button>
                        </div>
                    </div>`
  moviecards.prepend(div)  

  showToast(`${createMovieObj.MovieName} added successfuly`, "success")  

 OnMovieToggle()

}


showModelbtn.addEventListener("click", OnMovieToggle)
closeModel.forEach(ele=>{
 ele.addEventListener("click", OnMovieToggle)})
 movieForm.addEventListener("submit", OnMovieSubmit)
 movieupdateBtn.addEventListener('click', UpdateMovieObj)