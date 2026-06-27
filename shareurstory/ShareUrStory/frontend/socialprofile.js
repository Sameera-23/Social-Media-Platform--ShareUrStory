// ============================
// SHAREURSTORY PROFILE
// ============================


// Elements

const followBtn =
document.querySelector(".follow-btn");

const messageBtn =
document.querySelector(".message-btn");

const storiesContainer =
document.getElementById("storiesContainer");
// ============================
// FOLLOW SYSTEM
// ============================

let followers =
parseInt(
localStorage.getItem(
"followers"
)
) || 850;

let isFollowing =
localStorage.getItem(
"isFollowing"
) === "true";


// Update UI

updateFollowerUI();

function updateFollowerUI(){

    const followerCard =
    document.querySelectorAll(
    ".stat-card h2"
    )[1];

    followerCard.innerText =
    followers;

    if(isFollowing){

        followBtn.innerText =
        "Following";

        followBtn.style.background =
        "#22c55e";

    }
    else{

        followBtn.innerText =
        "Follow";

        followBtn.style.background =
        "#8b5cf6";

    }

}


// Follow Button

followBtn.addEventListener(
"click",
()=>{

    if(!isFollowing){

        followers++;

        isFollowing = true;

        showToast(
        "Following User ✅",
        "success"
        );

    }
    else{

        followers--;

        isFollowing = false;

        showToast(
        "Unfollowed User",
        "error"
        );

    }

    localStorage.setItem(
    "followers",
    followers
    );

    localStorage.setItem(
    "isFollowing",
    isFollowing
    );

    updateFollowerUI();

});


// ============================
// MESSAGE BUTTON
// ============================

messageBtn.addEventListener(
"click",
()=>{

    window.location.href =
    "socialchat.html";

});


// ============================
// LOAD STORIES
// ============================

loadStories();

async function loadStories() {

try {

    const response = await fetch(
        "http://localhost:8080/stories"
    );

    const stories = await response.json();

    storiesContainer.innerHTML = "";

    stories.forEach(story => {

        const storyItem =
        document.createElement("div");

        storyItem.classList.add(
            "story-item"
        );

        storyItem.innerHTML = `
            <h4>${story.title}</h4>
            <p>${story.author}</p>
        `;

        storyItem.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "selectedStory",
                    JSON.stringify(story)
                );

                window.location.href =
                "socialstoryview.html";
            }
        );

        storiesContainer.appendChild(
            storyItem
        );

    });

    updateStoryCount(
        stories.length
    );

} catch(error) {

    console.error(error);
}


}



// ============================
// STORY COUNT
// ============================

function updateStoryCount(
count
){

    const storyCard =
    document.querySelectorAll(
    ".stat-card h2"
    )[0];

    storyCard.innerText =
    count;

}


// ============================
// TOAST
// ============================

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

}


// ============================
// PAGE LOAD
// ============================

window.addEventListener(
"load",
()=>{

    const loggedInUser =
    localStorage.getItem(
    "loggedInUser"
    );

    if(loggedInUser){

        document.querySelector(
        ".user-details h1"
        ).innerText =
        loggedInUser;

    }

    showToast(
    "Profile Loaded 👤",
    "success"
    );

});const logoutBtn =
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