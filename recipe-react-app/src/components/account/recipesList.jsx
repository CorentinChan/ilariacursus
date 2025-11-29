  import CardUser from '../cardUser'
 
 
 export default function  RecipesList() {

return ( 
 <div className="videoSection2 container-fluid py-5" id="fav">

  <div className="videoTitle m-3 m-lg-5 justify-content-center">
    <h2 className="bg-danger-subtle text-danger border rounded-pill p-2">
      Your favorites recipes
    </h2>
  </div>

  <div className="videos-container2 m-lg-5 flex-nowrap" id="videos-container">
  
    <div className="cardExt">
      <CardUser img= {'/background2.png'} />
      <form method="post" action="deleteFav">
        <button className="btn text-center rounded-pill bg-danger border-black border m-lg-1" value="" name="deleteFav">
          Delete
        </button>
      </form>
    </div>

  </div>

</div>

)
 }