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
document
        .getElementById("quoteForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Quote requested successfully!");
          // Here, insert your form logic or AJAX call
        });
        const modal = document.getElementById("popup-form");
        const closeBtn = document.querySelector(".close-btn");
      
        // Open modal after given seconds
        [5000, 10000, 20000].forEach(delay => {
          setTimeout(() => {
            modal.style.display = "block";
          }, delay);
        });
      
        // Close button click
        closeBtn.onclick = () => {
          modal.style.display = "none";
        };
      
        // Click outside modal to close
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        };
const openChat = () => {
    const modal = document.getElementById("popup-form");
    modal.style.display = "block";
};
const questions = [
    {
        text: "Find Lowest Price Here.",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=I%20would%20like%20to%20know%20the%20lowest%20price."
    },
    {
        text: "PAN India Delivery.",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=Do%20you%20offer%20PAN%20India%20delivery%3F"
    },
    {
        text: "We Have Customized Options.",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=Do%20you%20offer%20customized%20blinds%20options%3F"
    },
    {
        text: "All Types of Blinds Available.",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=What%20types%20of%20blinds%20are%20available%3F"
    },
    {
        text: "100% Free Return, No Questions Asked ?",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=Can%20you%20explain%20your%20return%20policy%3F"
    },
    {
        text: "Talk to Sales Team.",
        whatsappLink: "https://wa.me/+91<your-phone-number>?text=I%20would%20like%20to%20talk%20to%20the%20sales%20team."
    }
];

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

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});