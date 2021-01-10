import React, { useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import PostsLists from "./components/PostsLists/PostsLists";
import NavBar from "./components/NavBar/NavBar";
import './App.scss';
import {API} from "./api-service";
import CreateInstagramPost from "./components/CreateIntagramPost/CreateInstagramPost";
import Wrapper from "./components/Wrapper/Wrapper"


function App() {
    const [posts, setPosts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['mr-token'])
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [create, setCreate] = useState(false);


    async function fetchData() {
        const data = await API.getPosts(cookies['mr-token'], page)
        setPosts(data.data);
        setMaxPage(data.meta.last_page);
    }

    useEffect(() =>{
        fetchData();
    },[, page])

    useEffect(() => {
        if (!cookies['mr-token']) window.location.href = '/';
        if (cookies['mr-token'] === 'undefined') logoutUser();
    }, [cookies])


    const createPost = (quantity, link) =>{
        async function fetchDataComments() {
            const post = await API.createPost(cookies['mr-token'], {"number_comments": quantity, "link": link})
            fetchData();
            // setPosts([...posts, post])
            setCreate(false)
        }
        fetchDataComments();
    }

    const deletePost = (id) => {
        async function deletePostById() {
            return await API.deletePost(cookies['mr-token'], id)
        }
        deletePostById().then(() => setPosts(posts.filter(post => post.id !== id)));
    }


    const logoutUser = () => {
        removeCookie(['mr-token'], {path: "/"});
    }

    return (
        <div>
            <NavBar logOut={logoutUser} setCreate={setCreate} />
            <Wrapper>
                {create?
                    <CreateInstagramPost createPost={createPost}/>:
                    <div>
                        <PostsLists  posts={posts} cookies={cookies} deletePost={deletePost}
                                     page={page} setPage={setPage} maxPage={maxPage}/>
                    </div>
                }
            </Wrapper>
        </div>


    );
}

export default App;
