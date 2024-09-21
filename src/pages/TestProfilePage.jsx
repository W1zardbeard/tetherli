//test page which displays the users username based on the url

export default function TestProfilePage(){

    //get username from url
    const url = window.location.href;
    const username = url.split("/").pop();
    console.log(username);

    return(
        <div>
            <h1>{username}</h1>
        </div>
    )
}

