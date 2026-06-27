// ============================
// SHAREURSTORY EDITOR
// ============================

const titleInput =
document.getElementById("storyTitle");

const categoryInput =
document.getElementById("storyCategory");

const tagsInput =
document.getElementById("storyTags");

const contentInput =
document.getElementById("storyContent");

const imageInput =
document.getElementById("storyImage");


// ============================
// CHARACTER COUNTER
// ============================

const counter =
document.createElement("div");

counter.style.textAlign = "right";
counter.style.marginTop = "10px";
counter.style.color = "#94a3b8";

contentInput.parentElement.appendChild(counter);

contentInput.addEventListener("input",()=>{

    counter.innerText =
    `${contentInput.value.length} characters`;

});


// ============================
// IMAGE PREVIEW
// ============================

const preview =
document.createElement("img");

preview.style.width = "100%";
preview.style.maxHeight = "300px";
preview.style.objectFit = "cover";
preview.style.borderRadius = "15px";
preview.style.marginTop = "15px";
preview.style.display = "none";

imageInput.parentElement.appendChild(preview);

imageInput.addEventListener("change",(e)=>{

    const file =
    e.target.files[0];

    if(file){

        const reader =
        new FileReader();

        reader.onload = function(event){

            preview.src =
            event.target.result;

            preview.style.display =
            "block";

        };

        reader.readAsDataURL(file);

    }

});


// ============================
// SAVE DRAFT
// ============================

function saveDraft(){

    const draft = {

        title:
        titleInput.value,

        category:
        categoryInput.value,

        tags:
        tagsInput.value,

        content:
        contentInput.value

    };

    localStorage.setItem(
    "storyDraft",
    JSON.stringify(draft)
    );

    showToast(
    "Draft Saved 💾",
    "success"
    );

}


// ============================
// LOAD DRAFT
// ============================

function loadDraft(){

    const draft =
    JSON.parse(
    localStorage.getItem(
    "storyDraft"
    )
    );

    if(!draft) return;

    titleInput.value =
    draft.title || "";

    categoryInput.value =
    draft.category || "";

    tagsInput.value =
    draft.tags || "";

    contentInput.value =
    draft.content || "";

}

loadDraft();


// ============================
// AUTO SAVE
// ============================

setInterval(()=>{

    if(contentInput.value.trim()
    !== ""){

        saveDraft();

    }

},30000);


// ============================
// PUBLISH STORY
// ============================

async function publishStory() {

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "") {

        showToast(
            "Story title required",
            "error"
        );

        return;
    }

    if (content.length < 50) {

        showToast(
            "Write at least 50 characters",
            "error"
        );

        return;
    }

    const story = {

        title: title,
        content: content,
        author: "Sammu"

    };

    try {

        const response = await fetch(
            "http://localhost:8080/stories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(story)
            }
        );

        const result = await response.text();

        showToast(
            result,
            "success"
        );

        localStorage.removeItem(
            "storyDraft"
        );

        setTimeout(() => {

            window.location.href =
            "socialhome.html";

        }, 1500);

    } catch (error) {

        showToast(
            "Failed to publish story",
            "error"
        );

        console.error(error);
    }
}


// ============================
// TOAST
// ============================

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

}


// ============================
// PAGE ANIMATION
// ============================

window.addEventListener(
"load",
()=>{

    const editor =
    document.querySelector(
    ".editor-card"
    );

    editor.style.opacity = "0";

    editor.style.transform =
    "translateY(30px)";

    setTimeout(()=>{

        editor.style.transition =
        ".8s ease";

        editor.style.opacity =
        "1";

        editor.style.transform =
        "translateY(0)";

    },200);

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