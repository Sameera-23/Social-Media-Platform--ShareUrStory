// ===================================
// SHAREURSTORY DASHBOARD
// ===================================

const storyFeed =
document.getElementById("storyFeed");

const publishBtn =
document.getElementById("publishBtn");

const quickStory =
document.getElementById("quickStory");

const searchInput =
document.getElementById("searchInput");


// ===================================
// INITIALIZE
// ===================================

window.addEventListener("load", () => {

    loadStories();

    initializeCategories();

    showToast(
        "Welcome back to ShareUrStory 🚀",
        "success"
    );

});


// ===================================
// PUBLISH QUICK STORY
// ===================================

publishBtn.addEventListener("click", () => {

    const content =
    quickStory.value.trim();

    if(content === ""){

        showToast(
            "Write something first",
            "error"
        );

        return;
    }

    const story = {

        id: Date.now(),

        title: "Quick Career Insight",

        category: "General",

        content: content,

        author: "Sameera",

        likes: 0,

        createdAt:
        new Date().toLocaleString()

    };

    let stories =
    JSON.parse(
        localStorage.getItem("stories")
    ) || [];

    stories.unshift(story);

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

    addNotification(
        "story",
        "📖",
        "Story Published",
        "Your new story is live"
    );

    quickStory.value = "";

    loadStories();

    showToast(
        "Story Published 🎉",
        "success"
    );

});


// ===================================
// LOAD STORIES
// ===================================

async function loadStories() {

    try {

        const response = await fetch(
            "http://localhost:8080/stories"
        );

        const stories = await response.json();

        storyFeed.innerHTML = "";

        if (stories.length === 0) {

            storyFeed.innerHTML = `
                <div class="story-card">
                    <h3>No Stories Yet</h3>
                    <p>Share your first career story.</p>
                </div>
            `;

            return;
        }

        stories.forEach(story => {
            renderStory(story);
        });

    } catch (error) {

        console.error(error);

        storyFeed.innerHTML = `
            <div class="story-card">
                <h3>Failed to load stories</h3>
            </div>
        `;
    }
}

// ===================================
// RENDER STORY
// ===================================

function renderStory(story){

    const card =
    document.createElement("div");

    card.className =
    "story-card";

    card.innerHTML = `

        <div class="story-header">

            <img
            src="https://i.pravatar.cc/100?img=5">

            <div>

                <h4>
                    ${story.author}
                </h4>

                <small>
                    ${story.createdAt}
                </small>

            </div>

        </div>

        <div class="story-category">

            ${story.category}

        </div>

        <h3>

            ${story.title}

        </h3>

        <p>

            ${story.content}

        </p>

        <div class="story-actions">

            <button
            class="like-btn">

                ❤️ ${story.likes}

            </button>

            <button
            class="view-btn">

                📖 Read

            </button>

            <button
            class="save-btn">

                🔖 Save

            </button>

        </div>

    `;

    // Like

    card.querySelector(
    ".like-btn"
    ).addEventListener(
    "click",
    ()=>{

        story.likes++;

        updateStory(story);

        loadStories();

    });

    // Read Story

    card.querySelector(
    ".view-btn"
    ).addEventListener(
    "click",
    ()=>{

        localStorage.setItem(
            "selectedStory",
            JSON.stringify(story)
        );

        window.location.href =
        "socialstoryview.html";

    });

    // Save Story

    card.querySelector(
    ".save-btn"
    ).addEventListener(
    "click",
    ()=>{

        saveStory(story);

    });

    storyFeed.appendChild(card);

}


// ===================================
// UPDATE STORY
// ===================================

function updateStory(updatedStory){

    let stories =
    JSON.parse(
    localStorage.getItem("stories")
    ) || [];

    stories =
    stories.map(story =>

        story.id ===
        updatedStory.id

        ? updatedStory

        : story

    );

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

}


// ===================================
// SAVE STORY
// ===================================

function saveStory(story){

    let savedStories =
    JSON.parse(
        localStorage.getItem(
        "savedStories"
        )
    ) || [];

    const exists =
    savedStories.some(
    item => item.id === story.id
    );

    if(exists){

        showToast(
            "Already Saved",
            "error"
        );

        return;
    }

    savedStories.push(story);

    localStorage.setItem(
        "savedStories",
        JSON.stringify(savedStories)
    );

    showToast(
        "Story Saved 🔖",
        "success"
    );

}


// ===================================
// SEARCH
// ===================================

searchInput.addEventListener(
"keyup",
function(){

    const keyword =
    this.value.toLowerCase();

    document
    .querySelectorAll(".story-card")
    .forEach(card=>{

        const text =
        card.innerText.toLowerCase();

        card.style.display =
        text.includes(keyword)
        ? "block"
        : "none";

    });

});


// ===================================
// CATEGORY FILTER
// ===================================

function initializeCategories(){

    const categories =
    document.querySelectorAll(
    ".category"
    );

    categories.forEach(category=>{

        category.addEventListener(
        "click",
        ()=>{

            const selected =
            category.innerText
            .toLowerCase();

            document
            .querySelectorAll(
            ".story-card"
            )
            .forEach(card=>{

                const text =
                card.innerText
                .toLowerCase();

                card.style.display =
                text.includes(selected)
                ? "block"
                : "none";

            });

        });

    });

}


// ===================================
// NOTIFICATIONS
// ===================================

function addNotification(
type,
icon,
title,
text
){

    let notifications =
    JSON.parse(
    localStorage.getItem(
    "notifications"
    )
    ) || [];

    notifications.unshift({

        type,
        icon,
        title,
        text,
        time:"Just now"

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(
        notifications
        )
    );

}


// ===================================
// TOAST
// ===================================

function showToast(
message,
type
){

    const toast =
    document.createElement("div");

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