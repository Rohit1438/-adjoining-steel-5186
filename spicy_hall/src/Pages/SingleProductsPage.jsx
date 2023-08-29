import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Css/SingleProducts.module.css";
import StarRating from "../Components/Stars";
import axios from "axios";
import { styled } from "styled-components";
import Comment from "../Components/Comment";
import line1 from "../Images/Home/line1.png";
import { getSingleProducts, postComment } from "../Redux/products/action";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@chakra-ui/react";
// import { COMMENT_ADD } from "../Redux/products/actionTypes";
import { color,colorScheme, useToast } from '@chakra-ui/react'

const SingleProductsPage = () => {
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [allComments,SetAllComments]=useState([])
  const [change, setChange] = useState(false);
  const Url = "https://spicy-hall.onrender.com/recipes";
  const storedData =  localStorage.getItem("spicy_hall");
  let existingData = storedData ? JSON.parse(storedData) : [];
  const data = useSelector(
    (store) => store.productReducer.singlePageData.recipe
  );

  const commentData = useSelector(
    (store) => store.productReducer.commentData
  );
console.log(commentData,"commentadtareducer")
  //const [imageData, setImage] = React.useState(arrivalData.src1);
  const { id } = useParams();
  const toast = useToast()
 //console.log(id, "params");
  const dispatch = useDispatch();




  // useEffect(() => {
  //   dispatch(getSingleProducts(id));
  // }, []);

// if(data.comment){
//   useEffect(() => {
//     dispatch(getSingleProducts(id));
//     }, [data.comment])
// }

//checking saved recipes from local storage
const [saved, setSaved] = useState(false);
const check = (id) => {
  existingData.forEach((el) => {
    if (el._id === id) {
      setSaved(true);
    }
  });
};



const fetched = () => {
  fetch(`https://spicy-hall.onrender.com/recipes/comment/${id}`,{
  method: "PATCH",
  headers: {
    "Content-type": "application/json",
    Authorization : `Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify({comment: comment})
 })
 .then((res)=> {
  return res.json()
 })
 .then((res)=> {
   console.log(res.data)
  return res.data
 }).catch((err)=> {
  console.log(err)
 })
 }

// useEffect(() => {
//   check(id);
//   console.log("useEffect")
//   dispatch(getSingleProducts(id))

// }, [change]);

// const fetchedComments = () => {
//   axios
//     .get(`${Url}/comment/${id}`)
//     .then((response) => {
//       SetAllComments(response.data.comment.reverse());
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };




useEffect(() => {
  check(id);
  console.log("useEffect")
  dispatch(getSingleProducts(id))
  // fetchedComments();



  setLoading(false);
}, [id,change]);

console.log(allComments,"am the")


//setting comment value for posting
  // const handelChange = (e) => {
  //   setComment({
  //     comment: e.target.value,
  //   });
  // };

  // const handelChange = (e) => {
  //   setComment(e.target.value);
  // };


  // useEffect(()=>{
  //   if(data){
  //     SetAllComments([...data.comment])
  //   }
  //   },[data.comment])
//,allComments

  //posting comment to backend
  const handelCommentPost = (e) => {
   e.preventDefault()
    // console.log()
    const token =
(localStorage.getItem("spicy_hall_token"))||""
  console.log(token)
    // Add the token to the request headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .patch(`${Url}/comment/${id}`, {comment:e.target.comment.value}, { headers }) 
      .then((data) => {
        console.log(comment,"commentdata sending")
        console.log(data, "response");
        // commentData([change,...comment])
        SetAllComments((pre)=>[...data.data.recipe.comment])
        setChange(!change)
      })
      .catch((error) => {
       // console.log(error);
      });
  };


    

  // (data && data?.comment)
  const handelSave =async () => {
   console.log("calling save")
    const isProductDuplicate = existingData.some(
      (product) => product._id === data._id
    );

    // console.log(product._id,data.id)
    if (!isProductDuplicate) {
      existingData.push(data);
      localStorage.setItem("spicy_hall", JSON.stringify(existingData));
      
     setSaved(true)   
     toast({
      title: 'Saved',
        description: 'Product has been added form saved.',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      }) 
    } else {
      existingData = existingData.filter((product) => product.id !== data.id);
      localStorage.setItem("spicy_hall", JSON.stringify(existingData));
      setSaved(false);
      toast({
        title: 'Removed',
        description: 'Product has been removed form saved.',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      }) 
    }
    ;
  };
  if (loading) {
    return <div>Loading...</div>;
  }else {
    return (
      <DIV className={styles.SingleProductPage}>
        {data ? (
          <>
            <div className={styles.SingleProductContainer}>
              <div className={styles.SingleProduct}>
                <div className={styles.SingleImageConatiner}>
                  <img src={data.images && data.images[1]} alt="" />
                </div>
                <div className={styles.SingleDescriptionConatiner}>
                  <h1>{data.name}</h1>
                  <div id="stars">
                    {" "}
                    <StarRating rating={data.rating} />
                  </div>

                  {/* </p> */}

                  <div className="detailsofrecipe">
                    <div style={{}}>
                      <h3>{data.timeRequired}</h3>
                    </div>
                    <div
                      id="category"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ borderRadius: "100%" }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
                        alt=""
                      />
                      <h3>{data.category}</h3>
                    </div>
                  </div>
                  <div className="savebtn">
                    <button onClick={handelSave} id={saved?"remove":"save"}>
                     {saved?"Saved":"Save"} <i className="fa-regular fa-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="aboutsection">
                <div id="ingredients">
                  <p>{data.description}</p>
                  <h3>Ingredients</h3>
                  <p>
                    {data?.ingredients?.split("|").map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </p>
                </div>

                <div id="abouttitle">
                  <h1>Recipe</h1>
                  <img src={line1} alt="" />
                </div>
                <p id="recipe">
                  {data?.directions?.split("|").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </p>
              </div>
            </div>
            <div className={styles.SingleComments}>
              <div className="commentAdd">
<form action="" onSubmit={(e)=>handelCommentPost(e)}>
<input
                  type="text"
                  id="comment"
                  placeholder="Add a comment"
                  // onChange={handelChange}
                />
                <button id="add" >
                  {" "}
                  <i class="fa-regular fa-comment"></i>
                </button>
</form>
              </div>

              <div>
                {/* <h2 id="commentheading" style={{ color: "#171819" }}>
                  Comment Section
                </h2> */}
                {data?.comment ? (
                  <>
                    {/* {data?.comment.reverse().map((el, index) => (
                      <Comment key={index} {...el} />
                    ))} */}


{commentData?.reverse().map((el, index) => (
                      <Comment key={index} {...el} />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <CircularProgress isIndeterminate color="green.300" />
          </>
        )}
      </DIV>
    )
  }





};

export default SingleProductsPage;
const DIV = styled.div`
  color: #e4c590;
  font-size: 18px;
  #stars {
    font-size: 0.7rem;
  }

  .SingleDescriptionConatiner > h1 {
    font-size: 3rem;
  }

  .SingleDescriptionConatiner {
    border: 1px solid red;
    justify-content: center;
    align-items: center;
  }
  img {
    border-radius: 15px;
  }
  .detailsofrecipe {
    margin: 20px;
    /* background-color: #e4c590;
  color: black;
  border: 1px solid #e4c590; */
    display: flex;
    flex-direction: row;
    font-weight: 600;
    justify-content: space-evenly;
  }

  #category {
    height: 35px;
  }
  #category > img {
    height: 100%;
    border-radius: 50px;
  }
  h3 {
    font-size: 1.5rem;
  }
  .commentAdd>form {
    display: grid;
    grid-template-columns: 80% 20%;
    justify-content: space-between;
    padding: 15px;
    position: sticky;
    /* Enable scrolling for comments container */
    overflow-y: auto;
    height: 10vh; /* Adjust the height as needed */
    top: 0;
    bottom: 10;
  }
  .commentAdd >form> input {
    width: 100%;
    padding: 10px;
    color: black;
    font-weight: 800;
  }
  #add {
    background-color: #171819;
    padding: 5px 10px 5px;
    color: #e4c590;

  
  }


  #abouttitle {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #abouttitle > h1 {
    font-size: 2rem;
  }
  #abouttitle > img {
    width: 20%;
    margin: auto;
  }
  .aboutsection {
    width: 90%;
    margin: auto;
    color: #cbcbcb;
  }
  #recipe {
    margin-top: 10px;
    border: 1px solid #f5b55668;
    padding: 20px 50px 0;
    border-radius: 20px;
    text-align: justify
  }
  #ingredients {
    display: grid;
    text-align: justify;
    margin: 20px;
  }

  #ingredients > h3 {
    color: #e4c590;
  }
  #ingredients > p {
    color: #b7b7b7;
  }
  .savebtn > button {
    width: 200px;
    background-color: #e4c590;
    height: 50px;
    font-weight: 800;
    color: #171819;
  }
  .savebtn > button:hover {
    width: 202px;

    color: #353535;
  }
  #remove {
    background-color: #464646;

    color: #e4c590;
  }

  @media (max-width: 1100px) {
    #ingredients > h3 {
      text-align: center;
      margin: 20px;
    }
    p {
      font-size: 18px;
      text-align: justify;
    }
    .aboutsection > p {
      font-size: 18px;
    }
    #commentheading {
      font-size: 30px;
      font-weight: 800;
    }
    .SingleDescriptionConatiner > h1 {
      font-size: 15px;
    }
    .detailsofrecipe {
      font-size: 5px;
      margin-top: 10px;
      justify-content: center;
    }
  }
`;
