import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";
const AddcommentsForm = ({ articleName, Onarticleupdated }) => {
    const [name, setname] = useState('');
    const [Commenttext, setCommentText] = useState('');
    const { user } = useUser();


    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            PostedBy: name,
            text: Commenttext,
        }, { headers, });
        const updatearticle = response.data;
        Onarticleupdated(updatearticle);

        setname('');
        setCommentText('');




    }

    return (

        <>
            <div className="add-comment-form">
                <h3>Add A comment</h3>
                {user && <p>You are Posting As {user.email}</p>}
                <label>
                    <textarea
                        value={Commenttext} onChange={e => setCommentText(e.target.value)}
                        rows="4" cols="50" />
                </label>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </>
    );
}


export default AddcommentsForm;