// ============================
// SHAREURSTORY NOTIFICATIONS
// ============================

const notificationList =
document.getElementById(
"notificationList"
);

const clearButton =
document.getElementById(
"clearNotifications"
);


// ============================
// DEFAULT NOTIFICATIONS
// ============================

window.addEventListener(
"load",
()=>{

    loadNotifications();

});


// ============================
// LOAD NOTIFICATIONS
// ============================

function loadNotifications(){

    let notifications =
    JSON.parse(
    localStorage.getItem(
    "notifications"
    )
    );

    if(!notifications){

        notifications = [

            {
                type:"like",
                icon:"❤️",
                title:"Rahul liked your story",
                text:"How I Got My First Internship",
                time:"5 min ago"
            },

            {
                type:"comment",
                icon:"💬",
                title:"Priya commented",
                text:"Very inspiring journey!",
                time:"20 min ago"
            },

            {
                type:"follow",
                icon:"👤",
                title:"Arjun started following you",
                text:"New follower added",
                time:"1 hour ago"
            }

        ];

        localStorage.setItem(
        "notifications",
        JSON.stringify(
        notifications
        )
        );

    }

    renderNotifications(
    notifications
    );

}


// ============================
// RENDER NOTIFICATIONS
// ============================

function renderNotifications(
notifications
){

    notificationList.innerHTML =
    "";

    notifications.forEach(
    notification=>{

        const card =
        document.createElement(
        "div"
        );

        card.className =
        `notification-card ${notification.type}`;

        card.innerHTML = `

            <div class="notification-icon">

                ${notification.icon}

            </div>

            <div class="notification-content">

                <h4>
                    ${notification.title}
                </h4>

                <p>
                    ${notification.text}
                </p>

                <span>
                    ${notification.time}
                </span>

            </div>

        `;

        card.addEventListener(
        "click",
        ()=>{

            card.style.opacity =
            ".6";

            showToast(
            "Marked as Read",
            "success"
            );

        });

        notificationList.appendChild(
        card
        );

    });

}


// ============================
// CLEAR ALL
// ============================

clearButton.addEventListener(
"click",
()=>{

    if(
    confirm(
    "Clear all notifications?"
    )
    ){

        localStorage.removeItem(
        "notifications"
        );

        notificationList.innerHTML =
        "";

        showToast(
        "Notifications Cleared",
        "error"
        );

    }

});


// ============================
// ADD NOTIFICATION
// ============================

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

    renderNotifications(
    notifications
    );

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
// DEMO NOTIFICATION
// ============================

// Example:

// addNotification(
// "chat",
// "📩",
// "New Message",
// "Priya sent a message"
// );const logoutBtn =
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