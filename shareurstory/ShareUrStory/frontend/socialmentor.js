// ============================
// SHAREURSTORY MENTORS
// ============================


// Search Mentors

const searchInput =
document.getElementById(
"mentorSearch"
);

if(searchInput){

    searchInput.addEventListener(
    "keyup",
    function(){

        const searchValue =
        this.value.toLowerCase();

        const mentorCards =
        document.querySelectorAll(
        ".mentor-card"
        );

        mentorCards.forEach(card=>{

            const text =
            card.innerText.toLowerCase();

            if(
                text.includes(
                searchValue
                )
            ){

                card.style.display =
                "block";

            }
            else{

                card.style.display =
                "none";

            }

        });

    });

}


// ============================
// FOLLOW MENTORS
// ============================

const followButtons =
document.querySelectorAll(
".follow-btn"
);

followButtons.forEach(button=>{

    let following = false;

    button.addEventListener(
    "click",
    ()=>{

        const mentorName =
        button.parentElement
        .querySelector("h3")
        .innerText;

        if(!following){

            following = true;

            button.innerText =
            "Following";

            button.style.background =
            "#22c55e";

            saveMentor(
            mentorName
            );

            showToast(
            `Following ${mentorName}`,
            "success"
            );

        }
        else{

            following = false;

            button.innerText =
            "Follow";

            button.style.background =
            "#8b5cf6";

            removeMentor(
            mentorName
            );

            showToast(
            `Unfollowed ${mentorName}`,
            "error"
            );

        }

    });

});


// ============================
// SAVE FOLLOWED MENTORS
// ============================

function saveMentor(
mentorName
){

    let mentors =
    JSON.parse(
    localStorage.getItem(
    "followedMentors"
    )
    ) || [];

    if(
        !mentors.includes(
        mentorName
        )
    ){

        mentors.push(
        mentorName
        );

    }

    localStorage.setItem(
    "followedMentors",
    JSON.stringify(
    mentors
    )
    );

}


// ============================
// REMOVE FOLLOWED MENTOR
// ============================

function removeMentor(
mentorName
){

    let mentors =
    JSON.parse(
    localStorage.getItem(
    "followedMentors"
    )
    ) || [];

    mentors =
    mentors.filter(
    mentor =>
    mentor !== mentorName
    );

    localStorage.setItem(
    "followedMentors",
    JSON.stringify(
    mentors
    )
    );

}


// ============================
// CHAT BUTTON
// ============================

const chatButtons =
document.querySelectorAll(
".chat-btn"
);

chatButtons.forEach(button=>{

    button.addEventListener(
    "click",
    ()=>{

        const mentorName =
        button.parentElement
        .querySelector("h3")
        .innerText;

        localStorage.setItem(
        "selectedMentor",
        mentorName
        );

        showToast(
        `Opening chat with ${mentorName}`,
        "success"
        );

        setTimeout(()=>{

            window.location.href =
            "socialchat.html";

        },1000);

    });

});


// ============================
// LOAD FOLLOWED MENTORS
// ============================

window.addEventListener(
"load",
()=>{

    const mentors =
    JSON.parse(
    localStorage.getItem(
    "followedMentors"
    )
    ) || [];

    document
    .querySelectorAll(
    ".mentor-card"
    )
    .forEach(card=>{

        const mentorName =
        card.querySelector(
        "h3"
        ).innerText;

        const button =
        card.querySelector(
        ".follow-btn"
        );

        if(
            mentors.includes(
            mentorName
            )
        ){

            button.innerText =
            "Following";

            button.style.background =
            "#22c55e";

        }

    });

    showToast(
    "Mentors Loaded 👨‍🏫",
    "success"
    );

});


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