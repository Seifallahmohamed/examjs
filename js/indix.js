$(document).ready(function () {
    $(".spinner").fadeOut(1000,function(){
        $("#loding").fadeOut(1000,function(){
            $("body").css("overflow","auto")
            $("#loding").remove();
        })
    })
     
 
 let navtab=$(".sidpardetails").outerWidth();
 $(".sid-nav").css("left",-navtab);
 
 $(".open-close-icon " ).click(function () { 
     if($(".sid-nav").css("left")=="0px"){
         $(".sid-nav").animate({left:-navtab},500);
         $(".open-close-icon ").removeClass("fa-x");
         $(".open-close-icon ").addClass("fa-align-justify");
         $(".meal-links ul li").fadeOut(2000);
     }
     else{
         $(".sid-nav").animate({left:"0px"},500);
         $(".open-close-icon ").removeClass("fa-align-justify");
         $(".open-close-icon ").addClass("fa-x");
         $(".meal-links ul li").fadeIn(2000);
     }
 });
 
 $("a").click(function(eventinfo){
 let ahref = $(eventinfo.target).attr('href');
 $(ahref).removeClass("d-none").addClass("d-block").nextAll("section").addClass("d-none");
 $(".sid-nav").css("left",-navtab);
 $(".open-close-icon ").removeClass("fa-x");
 $(".open-close-icon ").addClass("fa-align-justify");
 });
 
 
 $("#nameinput").keyup(function (e) { 
     let n = (/^[a-zA-Z ]/.test(e.target.value))
 if(n==false){ 
     $("#alertname").removeClass("d-none").addClass("d-block")
 }
 else{
     $("#alertname").removeClass("d-block").addClass("d-none")
 }
 });
 
 $("#emailinput").keyup(function (e) { 
     let w = (/@(gmail|yahoo)\.com/.test(e.target.value))
 if(w==false){ 
     $("#alertemaill").removeClass("d-none").addClass("d-block")
 }
 else{
     $("#alertemaill").removeClass("d-block").addClass("d-none")
 }
 });
 
 $("#phoneinput").keyup(function (e) { 
     let p = (/^01[0125][0-9]{8}$/.test(e.target.value))
 if(p==false){ 
     $("#alertphone").removeClass("d-none").addClass("d-block")
 }
 else{
     $("#alertphone").removeClass("d-block").addClass("d-none")
 }
 });
 
 $("#ageinput").keyup(function (e) { 
     let a = (/^([1-7][0-9]|100)$/.test(e.target.value))
 if(a==false){ 
     $("#alertage").removeClass("d-none").addClass("d-block")
 }
 else{
     $("#alertage").removeClass("d-block").addClass("d-none")
 }
 });
 
 $("#passwordinput").keyup(function (e) { 
    let p =e.target.value;
    repas( p);
     let b = (/^[0-9a-zA-Z]{8,}$/.test(e.target.value))
    
 if(b==false){ 
     $("#alertpassword").removeClass("d-none").addClass("d-block")
 }
 else{
     $("#alertpassword").removeClass("d-block").addClass("d-none")
 }
 });
 
function repas(repass){
    $("#repaswordinput").keyup(function (v) { 
        let repas =v.target.value;
     if( repas==repass){ 
         $("#alertrepassword").removeClass("d-block").addClass("d-none")
     }
     else{
         $("#alertrepassword").removeClass("d-none").addClass("d-block")
     }
     });

}

 
 
 async function getmeals(namemeal){
    $("#loding").fadeIn(300)
 let respons  = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${namemeal}`)
 let mealjson = await  respons.json();
 displaymeals(mealjson.meals);
 startevent();
 $("#loding").fadeOut(300)
 }
 getmeals("");
 
 function displaymeals(arr){
     let cartoona = ``;
     for(let i=0;i<arr.length;i++){
         cartoona+=`
         <div data-id="${arr[i].idMeal}" class="col-md-3">
         <div class="imgmeal position-relative overflow-hidden rounded-2">
             <img class="w-100" src="${arr[i].strMealThumb}" alt="">
             <div class="meallayer p-2">
                 <h3>${arr[i].strMeal}</h3>
             </div>
         </div>
     </div>
         `
     }
     document.getElementById("rowData").innerHTML=cartoona;
 }
 
 async function getMealsDetails(id){ 
    $("#loding").fadeIn(300)
 let details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
 let detailsjson =  await details.json();
 displayDetails(detailsjson.meals)
 $("#loding").fadeOut(300)
 }
 
 function startevent(){
     document.querySelectorAll("#rowData .col-md-3").forEach(item=>{
      $(item).click(function(){
         let id=item.dataset.id;
         getMealsDetails(id);
         show();
      });
     });
  }
 
 
 function displayDetails(arrd){
    let cadetails=`
     <div class="col-md-4">
     <img class="w-100 overflow-hidden rounded-3" src="${arrd[0].strMealThumb}" alt="">
     <h3>${arrd[0].strMeal}</h3>
 </div>
 <div class="col-md-8">
     <h2>Instructions</h2>
     <p>${arrd[0].strInstructions}</p>
     <h3>Area :${arrd[0].strArea}</h3>
     <h3>Category :${arrd[0].strCategory}</h3>
     <h3>Recipes :</h3>
     <ul class="uldetails  d-flex g-3 flex-wrap">
         <li class="alert alert-info m-2 p-1">${arrd[0].strMeasure1} ${arrd[0].strIngredient1}</li>
         <li class="alert alert-info m-2 p-1">${arrd[0].strMeasure2} ${arrd[0].strIngredient2}</li>
         <li class="alert alert-info m-2 p-1">${arrd[0].strMeasure3} ${arrd[0].strIngredient3}</li>
         <li class="alert alert-info m-2 p-1">${arrd[0].strMeasure4} ${arrd[0].strIngredient4}</li>
     </ul>
     <h3>Tags :</h3>
     <ul class=" uldetailss d-flex g-3 flex-wrap">
         <li class="alert alert-danger m-2 p-1">${arrd[0].strTags}</li>
     </ul>
     <a href="${arrd[0].strSource}" class="btn btn-success">Source</a>
     <a href="${arrd[0].strYoutube}" class="btn btn-danger">Youtube</a>
 </div>
     `
     document.getElementById("detailss").innerHTML=cadetails;
   }

function show(){
    $("#oben").removeClass("d-block").addClass("d-none")
    $("#detaails").removeClass("d-none").addClass("d-block")
 }
  //////////////////////////////////////////////////////////
  async function getserch(serch){
    $("#loding").fadeIn(1000)
     let searchapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${serch}`);
     let searchjson =await searchapi.json();
     dispserch(searchjson.meals);
     displayDetails(searchjson.meals);
     startserch();
     $("#loding").fadeOut(1000);
      }
    //   getserch();
      async function getserchfirst(serchf){
         let searchfapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${serchf}`);
         let searchfjson = await searchfapi.json();
         dispserch(searchfjson.meals);
         displayDetails(searchfjson.meals);
         startserch();
          }
        //   getserchfirst();
      function dispserch(arrserch){
         let  serchcartoona = ``;

         for(let i=0;i<arrserch.length;i++){
             serchcartoona+=`
             <div data-id="${arrserch[i].idMeal}" class="col-md-3">
             <div class="imgmeal position-relative overflow-hidden rounded-2">
                 <img class="w-100" src="${arrserch[i].strMealThumb}" alt="">
                 <div class="meallayer p-2">
                     <h3>${arrserch[i].strMeal}</h3>
                 </div>
             </div>
         </div>
             `
         }
         document.getElementById("rowserch").innerHTML=serchcartoona;
     }
     function startserch(){
         document.querySelectorAll("#rowserch .col-md-3").forEach(item=>{
          $(item).click(function(){
             let id=item.dataset.id;
             getMealsDetails(id);
             showserch();
          });
         });
      }
    
    function showserch(){
        $("#serch").removeClass("d-block").addClass("d-none")
        $("#detaails").removeClass("d-none").addClass("d-block")
     }
      $("#nameserch").keyup(function (e) {
         let serch = e.target.value;
         getserch(serch);
         getserchfirst( serch);
      });
      $("#nameserchf").keyup(function (e) {
         let serch = e.target.value;
         getserchfirst( serch);
      });
 // //////////////////////////////////////////////////////////
 async function getCatugry(){
 let categoryapi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
 let categorijson =await categoryapi.json();
 displaycatugry(categorijson.categories);
 starteventt();
  }
 
  getCatugry()
  function displaycatugry(arrc){
     let cartonaca=``;
     for(let i=0;i<arrc.length;i++){
         cartonaca+=`
         <div data-categorie=${arrc[i].strCategory} class="col-md-3 ">
         <div class="imgmeal2 position-relative overflow-hidden rounded-2">
             <img class="w-100" src="${arrc[i].strCategoryThumb}" alt="">
             <div class="meallayer2 p-2">
                 <h3>${arrc[i].strCategory}</h3>
                 <p>${arrc[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}}</p>
             </div>
         </div>
     </div>
         `
     }
     document.getElementById("Categorie").innerHTML=cartonaca;
  }
 
          function starteventt(){
             document.querySelectorAll("#Categorie .col-md-3").forEach(item=>{
              $(item).click(function(){
                 let cat =item.dataset.categorie;
                  getmeals(cat);
                 showw();
             
              });
             });
          }

          function showw(){

            $("#Categories").removeClass("d-block").addClass("d-none")
            $("#oben").removeClass("d-none").addClass("d-block")

         }
         ///////////////////////////////////////////////////////////////////////////////////
 
          async function getarea(areaname){
             let areaapi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaname}`);
             let areajson =await areaapi.json();
             displaymeals(areajson.meals);
             displayDetails(areajson.meals);
             startevent();
              }
              async function getnamearea(){
                let areanapi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
                let areanjson =await areanapi.json();
                displayarea(areanjson.meals);
                startarea();
                 }
                 getnamearea();
              function displayarea(arrarea){
                 let areacartona=``;
                 for(let i=0 ;i<arrarea.length;i++){
                     areacartona+=`
                     <div  data-category=${arrarea[i].strArea} class="col-md-3 text-white">
                     <i class="fa-solid fa-house-laptop fa-4x"></i>
                     <h3>${arrarea[i].strArea}</h3>
                  </div>
                     `
                 }
                 document.getElementById("rowarea").innerHTML=areacartona;
              }
              function startarea(){
                 document.querySelectorAll("#rowarea .col-md-3").forEach(item=>{
                  $(item).click(function(){
                     let catareaa =item.dataset.category;
                     getarea(catareaa);
                     sharea();
                  });
                 });
              }
            
              function sharea(){
                $("#Area").removeClass("d-block").addClass("d-none")
                $("#oben").removeClass("d-none").addClass("d-block")
             }
 /////////////////////////////////////////////////////////////////////////////////////////
              async function getigrd(){
                 let ingrapi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
                 let ingrjson =await ingrapi.json();
                 displaying(ingrjson.meals.slice(0, 20));
                 startmeet();
                  }
                  getigrd();
                  async function getmeet(namemeet){
                     let meetapi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${namemeet}`);
                     let meetjson =await meetapi.json();
                     displaymeals(meetjson.meals);
                     displayDetails(meetjson.meals);
                     startevent();
                      }
                 
                  function displaying(arring){
                     let ingcartona=``;
                     for(let i=0 ;i<arring.length;i++){
                         ingcartona+=`
                         <div data-category=${arring[i].strIngredient} class="col-md-3 text-white text-center">
                         <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                         <h3>${arring[i].strIngredient}</h3>
                         <p>${arring[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                      </div>
                         `
                     }
                     document.getElementById("rowingrediens").innerHTML=ingcartona;
                  }
                      function startmeet(){
                         document.querySelectorAll("#rowingrediens .col-md-3").forEach(item=>{
                          $(item).click(function(){
                             let catarea =item.dataset.category;
                             getmeet(catarea);
                             showmeet();
                          });
                         });
                      }
                      function showmeet(){
                         $("#Ingredients").removeClass("d-block").addClass("d-none")
                         $("#oben").removeClass("d-none").addClass("d-block")
                      }
 



});


                    

                


