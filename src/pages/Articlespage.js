import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import articles from "./article-content";
import Notfoundpage from "./NotFoundpage";
import Commentlist from "../components/CommentsList";
import AddcommentsForm from "../components/AddcommentForm";
import useUser from "../hooks/useUser";
// import CreateAccountPage from "./CreateAccountPage";
const Articlepage = ()=>{

    const [articleInfo, setrticleInfo] = useState({upvotes:0,comments :[],canUpvote:false});
    const {canUpvote} = articleInfo;
    const {articleId}=useParams();

    const {user,isLoading} = useUser();
    // const {userEmail} = CreateAccountPage();

    useEffect(()=>{
        const loadarticleinfo = async()=>{
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken :token}:{};
            const response = await axios.get(`/api/articles/${articleId}`,{headers});
            const NewArticleInfo = response.data;
            setrticleInfo(NewArticleInfo);
        }
        if(!isLoading){
            loadarticleinfo();
        }

    },[isLoading,user]);



    const article = articles.find(article =>article.name===articleId);

    const addupvote = async ()=>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken :token}:{};
        const response = await axios.put(`/api/articles/${articleId}/upvote`,null,{headers});
        const updatearticle = response.data;
        setrticleInfo(updatearticle);

    }



    if(!article){
        return <Notfoundpage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user 
            ?<button onClick={addupvote}>{canUpvote ? 'Upvote':'Already Upvoted'}</button>
            :<button>login to upvote</button>}
        <br></br>
        <p>this articles has {articleInfo.upvotes} upvote(s)</p>
        </div>

        {article.content.map((paragraph, i) =>(
            <p key={i}>{paragraph}</p>
            )
            )}
            {
                user 
                ?<AddcommentsForm articleName={articleId} Onarticleupdated={updatearticle=>setrticleInfo(updatearticle)} />
                
                :<button>login in to add a comment</button>}
            <Commentlist comments={articleInfo.comments}/>
        </>
    );
}

export default Articlepage;