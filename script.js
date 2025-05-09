function redirectToWhatsapp() {
  const phoneNumber = '+918920898168';
  const message = encodeURIComponent("Hi, I'm interested in learning more about your automation system.");

  // Open WhatsApp in a new tab with a pre-filled message
  window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
}

function redirectToEmail() {
  // Replace 'YOUR_EMAIL_ADDRESS' with your actual email address
  const email = 'mailto:hello@feelsafemarkone.com';

  // Open email client in a new tab
  window.open(email);
}
function startCountdownTimer() {
    // Predefined scheduled times (hours and minutes)
    const scheduledTimes = [
        { hour: 5, minute: 0 },   // 5:00 AM
        { hour: 10, minute: 0 },  // 10:00 AM
        { hour: 15, minute: 0 },  // 3:00 PM
        { hour: 20, minute: 0 },  // 8:00 PM
        { hour: 0, minute: 0 }    // 12:00 AM
    ];

    // Get the current time
    const currentTime = new Date();

    // Function to get the next scheduled time
    function getNextScheduledTime() {
        let nextTime = null;

        // Check each scheduled time
        for (let i = 0; i < scheduledTimes.length; i++) {
            let scheduled = scheduledTimes[i];
            let scheduledDate = new Date(currentTime);
            scheduledDate.setHours(scheduled.hour, scheduled.minute, 0, 0); // Set the time to the scheduled hour and minute

            // If the scheduled time has already passed today, move to the next scheduled time
            if (scheduledDate <= currentTime) {
                continue; // Skip this one, it's already passed
            }

            // If we find a valid future scheduled time, use it
            nextTime = scheduledDate;
            break;
        }

        // If no future scheduled time, use the first one on the next day (i.e., 5 AM)
        if (!nextTime) {
            let nextScheduled = scheduledTimes[0];
            nextTime = new Date(currentTime);
            nextTime.setDate(currentTime.getDate() + 1); // Move to the next day
            nextTime.setHours(nextScheduled.hour, nextScheduled.minute, 0, 0); // Set time to next 5 AM
        }

        return nextTime;
    }

    // Function to format the time difference as HH:MM:SS
    function formatTimeDifference(diffInMs) {
        let seconds = Math.floor(diffInMs / 1000);
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    // Helper function to pad single digits with a leading zero
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    // Function to update the timer
    function updateTimer() {
        const nextScheduledTime = getNextScheduledTime();
        const currentTime = new Date();
        const timeDifference = nextScheduledTime - currentTime; // Difference in milliseconds

        if (timeDifference > 0) {
            const formattedTime = formatTimeDifference(timeDifference);
            document.getElementById('timer').textContent = formattedTime;
        }
    }

    // Update the timer every second
    setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();
}
startCountdownTimer();

function formModalTimer() {
  const modal = document.getElementById("popup-form");
  const closeBtn = document.querySelector(".close-btn");

  let openCount = 0;
  const baseDelay = 8000; // Delay increment in ms
  const initialDelay = 5000; // First delay in ms

  // Show modal after a specific delay
  function scheduleModal(delay) {
    setTimeout(() => {
      modal.style.display = "block";
      openCount++;
    }, delay);
  }

  // First show after 5 seconds
  scheduleModal(initialDelay);

  // Close handler
  function handleClose() {
    modal.style.display = "none";

    // Schedule next modal with increasing delay
    if (openCount < 5) {
      const nextDelay = baseDelay * openCount;
      scheduleModal(nextDelay);
    }
  }

  // Button click close
  closeBtn.onclick = handleClose;

  // Click outside modal to close
  window.onclick = (event) => {
    if (event.target === modal) {
      handleClose();
    }
  };
}
window.onload = formModalTimer;

const openChat = () => {
    const modal = document.getElementById("popup-form");
    modal.style.display = "block";
};

const questions = [
  {
    text: "Lead Capture & Automated Follow-Up",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent('I want more customers.')}`,
  },
  {
    text: "Online Appointment Scheduling",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent('I want to keep my clients longer.')}`,
  },
  {
    text: "Reputation & Review Management",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent('I want to scale my business.')}`,
  },
  {
    text: "Re-Engagement Campaigns",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent('I want to improve my sales performance.')}`,
  },
  {
    text: "Real-Time Customer Tracking",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent('I want to increase customer engagement.')}`,
  },
];;
  

let selectedQuestion = null;

function handleQuestionClick(index) {
    selectedQuestion = index;
    window.open(questions[index].whatsappLink, '_blank');
}

function handleDismiss() {
    document.getElementById('chatContainer').style.display = 'none';
}

document.getElementById('closeButton').addEventListener('click', handleDismiss);


let lastScrollTop = 0;
const ctaBar = document.getElementById('bottom-cta');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    ctaBar.classList.add('show');
  } else {
    // Scrolling up
    ctaBar.classList.remove('show');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

// aman
function changeColor () {
    var ctaButton = document.getElementById("cta-button");
    setInterval(() => {
      ctaButton.classList.toggle("blue-bg");
    },1000)
}
changeColor();


// open video modal
function openVideoModal(videoUrl) {

  const embedUrl = `https://www.youtube.com/embed/${videoUrl}`;

  // Set the iframe source to the embed URL
  document.getElementById('video-frame').src = embedUrl;

  // Show the modal
  document.getElementById('video-modal').style.display = 'flex';
}

function closeVideoModal() {
  document.getElementById('video-modal').style.display = 'none';
  document.getElementById('video-frame').src = '';
}