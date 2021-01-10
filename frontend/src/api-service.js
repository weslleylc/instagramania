const HOST = "http://localhost:8000"

export class API {


    static getPosts(token, page_id){
        return fetch(`${HOST}/api/posts/?page=${page_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }).then( resp => resp.json())
    }


    static deletePost(token, id){
        return fetch(`${HOST}/api/posts/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        })
    }

    static createPost(token, body){
        return fetch(`${HOST}/api/posts/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }


    static getComments(token, id){
        return fetch(`${HOST}/api/comments/${id}/from_post`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }).then( resp => resp.json())
    }


    static loginUser(body){
        return fetch(`${HOST}/auth/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static registerUser(body){
        return fetch(`${HOST}/api/users/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }
}