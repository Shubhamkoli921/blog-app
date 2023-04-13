import Articlelist from "../components/ArticleList";
import articles from "./article-content";
const Articlelistpage = ()=>{

    return (
        <>
        <h1>This is The Articlelistpage !</h1>
        <Articlelist articles={articles}/>
        </>
    );
}

export default Articlelistpage;