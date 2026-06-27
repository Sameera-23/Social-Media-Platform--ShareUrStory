// ==========================
// SHAREURSTORY VIEW PAGE
// ==========================


// Load Latest Story

window.addEventListener("load", () => {

    loadStory();

});


// Load Story

function loadStory() {

    const story =
    JSON.parse(
        localStorage.getItem("selectedStory")
    );

    if(!story){
        alert("No story selected");
        return;
    }

    document.getElementById("storyTitle").innerText =
    story.title;

    document.getElementById("storyContent").innerText =
    story.content;

    document.querySelector(".author-card h3").innerText =
    story.author;
}



// ==========================
// LIKE STORY
// ==========================

const likeBtn =
document.getElementById(
"likeBtn"
);

const likeCount =
document.getElementById(
"likeCount"
);

let likes = 0;

if(likeBtn){

    likeBtn.addEventListener(
    "click",
    ()=>{

        likes++;

        likeCount.innerText =
        likes;

        showToast(
        "Story Liked ❤️",
        "success"
        );

    });

}


// ==========================
// SAVE STORY
// ==========================

const saveBtn =
document.getElementById(
"saveBtn"
);

if(saveBtn){

    saveBtn.addEventListener(
    "click",
    ()=>{

        saveBtn.innerHTML =
        "✅ Saved";

        showToast(
        "Story Saved",
        "success"
        );

    });

}


// ==========================
// FOLLOW AUTHOR
// ==========================

const followBtn =
document.querySelector(
".follow-btn"
);

if(followBtn){

    let following = false;

    followBtn.addEventListener(
    "click",
    ()=>{

        following =
        !following;

        if(following){

            followBtn.innerText =
            "Following";

            showToast(
            "Author Followed",
            "success"
            );

        }
        else{

            followBtn.innerText =
            "Follow";

            showToast(
            "Unfollowed",
            "error"
            );

        }

    });

}

// ==========================
// COMMENTS
// ==========================

const commentBtn =
document.getElementById("commentBtn");

const commentInput =
document.getElementById("commentInput");

const commentsContainer =
document.getElementById("commentsContainer");

loadComments();

async function loadComments() {

    const story =
    JSON.parse(
        localStorage.getItem("selectedStory")
    );

    if(!story) return;

    try{

        const response =
        await fetch(
            "http://localhost:8080/comments/" + story.id
        );

        const comments =
        await response.json();

        commentsContainer.innerHTML = "";

        comments.forEach(comment=>{

            const div =
            document.createElement("div");

            div.className = "comment";

            div.innerHTML = `
                <img src="https://i.pravatar.cc/100?img=25">

                <div>
                    <h4>${comment.userName}</h4>
                    <p>${comment.comment}</p>
                </div>
            `;

            commentsContainer.appendChild(div);

        });

    }catch(error){

        console.error(error);

    }

}

commentBtn.addEventListener(
"click",
async ()=>{

    const text =
    commentInput.value.trim();

    if(text === ""){

        showToast(
            "Write a comment",
            "error"
        );

        return;

    }

    const story =
    JSON.parse(
        localStorage.getItem("selectedStory")
    );

    const comment = {

        storyId: story.id,

        userName:
        localStorage.getItem("loggedInUser"),

        comment: text

    };

    const response =
    await fetch(
        "http://localhost:8080/comments",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(comment)

        }
    );

    const result =
    await response.text();

    showToast(
        result,
        "success"
    );

    commentInput.value = "";

    loadComments();

});


// ==========================
// SHARE STORY
// ==========================

const shareBtn =
document.getElementById(
"shareBtn"
);

if(shareBtn){

    shareBtn.addEventListener(
    "click",
    ()=>{

        navigator.clipboard.writeText(
        window.location.href
        );

        showToast(
        "Link Copied 🔗",
        "success"
        );

    });

}


// ==========================
// TOAST
// ==========================

function showToast(
message,
type
){

    const toast =
    document.createElement(
    "div"
    );

    toast.className =
    "toast";

    toast.innerText =
    message;

    toast.style.background =
    type === "success"
    ? "#22c55e"
    : "#ef4444";

    document.body.appendChild(
    toast
    );

    setTimeout(()=>{

        toast.classList.add(
        "show"
        );

    },100);

    setTimeout(()=>{

        toast.remove();

    },3000);

}const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
    "click",
    ()=>{

        localStorage.removeItem(
        "loggedInUser"
        );

        alert(
        "Logged Out Successfully"
        );

        window.location.href =
        "socialindex.html";

    });

}