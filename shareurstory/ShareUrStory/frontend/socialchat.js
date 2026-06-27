// ==========================
// SHAREURSTORY CHAT
// ==========================

const messagesArea =
document.getElementById(
"messagesArea"
);

const messageInput =
document.getElementById(
"messageInput"
);

const sendBtn =
document.getElementById(
"sendBtn"
);

const chatName =
document.getElementById(
"chatName"
);

const chatSearch =
document.getElementById(
"chatSearch"
);


// ==========================
// CURRENT CHAT USER
// ==========================

let currentUser =
localStorage.getItem(
"selectedMentor"
) || "Priya Sharma";

chatName.innerText =
currentUser;


// ==========================
// LOAD CHAT HISTORY
// ==========================

window.addEventListener(
"load",
()=>{

    loadMessages();

});


// ==========================
// SEND MESSAGE
// ==========================

sendBtn.addEventListener(
"click",
sendMessage
);

messageInput.addEventListener(
"keypress",
(e)=>{

    if(e.key === "Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const text =
    messageInput.value.trim();

    if(text === "") return;

    const message = {

        sender:"You",

        text:text,

        time:getTime()

    };

    saveMessage(
    message
    );

    renderMessage(
    message,
    "sent"
    );

    messageInput.value = "";

    autoScroll();

    setTimeout(()=>{

        autoReply();

    },1500);

}


// ==========================
// AUTO REPLY
// ==========================

function autoReply(){

    const replies = [

        "That's a great question.",
        "Focus on fundamentals first.",
        "Build projects consistently.",
        "Practice every day.",
        "Try applying for internships."

    ];

    const reply = {

        sender:currentUser,

        text:
        replies[
        Math.floor(
        Math.random() *
        replies.length
        )
        ],

        time:getTime()

    };

    saveMessage(
    reply
    );

    renderMessage(
    reply,
    "received"
    );

    autoScroll();

}


// ==========================
// SAVE MESSAGE
// ==========================

function saveMessage(
message
){

    let messages =
    JSON.parse(
    localStorage.getItem(
    currentUser
    )
    ) || [];

    messages.push(
    message
    );

    localStorage.setItem(
    currentUser,
    JSON.stringify(
    messages
    )
    );

}


// ==========================
// LOAD MESSAGES
// ==========================

function loadMessages(){

    messagesArea.innerHTML = "";

    const messages =
    JSON.parse(
    localStorage.getItem(
    currentUser
    )
    ) || [];

    messages.forEach(message=>{

        renderMessage(

            message,

            message.sender === "You"
            ? "sent"
            : "received"

        );

    });

    autoScroll();

}


// ==========================
// RENDER MESSAGE
// ==========================

function renderMessage(
message,
type
){

    const div =
    document.createElement(
    "div"
    );

    div.classList.add(
    "message"
    );

    div.classList.add(
    type
    );

    div.innerHTML = `

        <p>

            ${message.text}

        </p>

        <small>

            ${message.time}

        </small>

    `;

    messagesArea.appendChild(
    div
    );

}


// ==========================
// TIME
// ==========================

function getTime(){

    const now =
    new Date();

    return now.toLocaleTimeString(
    [],
    {
        hour:"2-digit",
        minute:"2-digit"
    }
    );

}


// ==========================
// AUTO SCROLL
// ==========================

function autoScroll(){

    messagesArea.scrollTop =
    messagesArea.scrollHeight;

}


// ==========================
// CONVERSATION SWITCH
// ==========================

const conversations =
document.querySelectorAll(
".conversation"
);

conversations.forEach(chat=>{

    chat.addEventListener(
    "click",
    ()=>{

        conversations.forEach(item=>{

            item.classList.remove(
            "active"
            );

        });

        chat.classList.add(
        "active"
        );

        currentUser =
        chat.querySelector(
        "h4"
        ).innerText;

        chatName.innerText =
        currentUser;

        loadMessages();

    });

});


// ==========================
// SEARCH CONVERSATIONS
// ==========================

chatSearch.addEventListener(
"keyup",
function(){

    const keyword =
    this.value.toLowerCase();

    document
    .querySelectorAll(
    ".conversation"
    )
    .forEach(chat=>{

        const text =
        chat.innerText
        .toLowerCase();

        chat.style.display =

        text.includes(
        keyword
        )

        ? "flex"

        : "none";

    });

});
const logoutBtn =
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