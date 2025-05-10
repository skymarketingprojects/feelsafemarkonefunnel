function redirectToWhatsapp(msg) {
  const phoneNumber = "+918920898168";
  const text = msg
    ? msg
    : "Hi, I'm interested in learning more about your automation system.";
  const message = encodeURIComponent(text);

  // Open WhatsApp in a new tab with a pre-filled message
  window.open("https://wa.me/" + phoneNumber + "?text=" + message, "_blank");
}

function redirectToEmail() {
  // Replace 'YOUR_EMAIL_ADDRESS' with your actual email address
  const email = "mailto:hello@feelsafemarkone.com";

  // Open email client in a new tab
  window.open(email);
}
function startCountdownTimer() {
  // Predefined scheduled times (hours and minutes)
  const scheduledTimes = [
    { hour: 5, minute: 0 }, // 5:00 AM
    { hour: 10, minute: 0 }, // 10:00 AM
    { hour: 15, minute: 0 }, // 3:00 PM
    { hour: 20, minute: 0 }, // 8:00 PM
    { hour: 0, minute: 0 }, // 12:00 AM
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
    return num < 10 ? "0" + num : num;
  }

  // Function to update the timer
  function updateTimer() {
    const nextScheduledTime = getNextScheduledTime();
    const currentTime = new Date();
    const timeDifference = nextScheduledTime - currentTime; // Difference in milliseconds

    if (timeDifference > 0) {
      const formattedTime = formatTimeDifference(timeDifference);
      document.getElementById("timer").textContent = formattedTime;
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
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent(
      "I want more customers."
    )}`,
  },
  {
    text: "Online Appointment Scheduling",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent(
      "I want to keep my clients longer."
    )}`,
  },
  {
    text: "Reputation & Review Management",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent(
      "I want to scale my business."
    )}`,
  },
  {
    text: "Re-Engagement Campaigns",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent(
      "I want to improve my sales performance."
    )}`,
  },
  {
    text: "Real-Time Customer Tracking",
    whatsappLink: `https://wa.me/+918920898168?text=${encodeURIComponent(
      "I want to increase customer engagement."
    )}`,
  },
];

let selectedQuestion = null;

function handleQuestionClick(index) {
  selectedQuestion = index;
  window.open(questions[index].whatsappLink, "_blank");
}

function handleDismiss() {
  document.getElementById("chatContainer").style.display = "none";
}

document.getElementById("closeButton").addEventListener("click", handleDismiss);

let lastScrollTop = 0;
const ctaBar = document.getElementById("bottom-cta");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    ctaBar.classList.add("show");
  } else {
    // Scrolling up
    ctaBar.classList.remove("show");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// aman
function changeColor() {
  var ctaButton = document.getElementById("cta-button");
  setInterval(() => {
    ctaButton.classList.toggle("blue-bg");
  }, 1000);
}
changeColor();

// open video modal
function openVideoModal(videoUrl) {
  const embedUrl = `https://www.youtube.com/embed/${videoUrl}`;

  // Set the iframe source to the embed URL
  document.getElementById("video-frame").src = embedUrl;

  // Show the modal
  document.getElementById("video-modal").style.display = "flex";
}

function closeVideoModal() {
  document.getElementById("video-modal").style.display = "none";
  document.getElementById("video-frame").src = "";
}

// api for getting the country
const getCountry = async () => {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
let country;
(async () => {
  country = await getCountry();
})();

const indianPlan1 = {
  heading: "👉Get Set Automate👈",
  planName: "Starter Automation Pack",
  oneTimePayment: 8000,
  onGoingMaintenance: 0,
  features: [
    "✅ Lead Generating Website",
    "✅Google Review Request ",
    "✅ WhatsApp Integration",
    "✅ Basic Chat Bot Integration",
    "✅ Sales Optimize Copywriting",
    "✅ Appointment Booking link",
    "✅ Auto Popup Lead Gen Form",
    "✅ Offer Image",
    "✅ News Headline Row",
    "✅ Thankyou Message and Mail",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};
const indianPlan2 = {
  heading: "Most Selling (400+ buyer)",
  planName: "Growth Automation Pack",
  oneTimePayment: 23999,
  onGoingMaintenance: 5000,
  features: [
    "✅ Smart Website with Lead Forms (1 Page)",

    "✅ Automated Email + SMS Follow-Up (Single Campaign)",

    "✅ Online Appointment Calendar + Reminders",

    "✅ WhatsApp Auto-Reply + Chatbot",

    "✅ Google Review Request Automation",

    "✅ Basic Lead Tracking Dashboard",

    "📊 Monthly Report & 1 Support Call",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};
const indianPlan3 = {
  heading: "Save more money then Ever",
  planName: "360 Marketing and Sales Automation",
  oneTimePayment: 44999,
  onGoingMaintenance: 10000,
  features: [
    "✅ Everything in Starter +",

    "✅ Multi-Service Funnel (up to 3 services)",

    "✅ CRM Pipeline with Lead Scoring",

    "✅ Re-engagement Campaign (Inactive Patients)",

    "✅ Conversion-Optimized Website (3 Pages)",

    "✅ Multi-channel Nurture: Email, WhatsApp, SMS",

    "✅ Custom Offers & Promotions Automation",

    "📊 Bi-weekly Performance Reports",

    "🎯 Dedicated Automation Specialist",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};
//us plans
const usPlan1 = {
  heading: "👉Get Set Automate👈",
  planName: "Starter Clinic Pack",
  oneTimePayment: 799,
  onGoingMaintenance: 499,
  features: [
    "✅ Smart Website with Lead Forms (1 Page)",
    "✅ Automated Email + SMS Follow-Up (Single Campaign)",
    "✅ Online Appointment Calendar + Reminders",
    "✅ WhatsApp Auto-Reply + Chatbot",
    "✅ Google Review Request Automation",
    "✅ Basic Lead Tracking Dashboard",
    "📊 Monthly Report & 1 Support Call",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};

const usPlan2 = {
  heading: "Most Selling (400+ buyer)",
  planName: "Growth Clinic Pack",
  oneTimePayment: 1299,
  onGoingMaintenance: 899,
  features: [
    "✅ Everything in Starter +",
    "✅ Multi-Service Funnel (up to 3 services)",
    "✅ CRM Pipeline with Lead Scoring",
    "✅ Re-engagement Campaign (Inactive Patients)",
    "✅ Conversion-Optimized Website (3 Pages)",
    "✅ Multi-channel Nurture: Email, WhatsApp, SMS",
    "✅ Custom Offers & Promotions Automation",
    "📊 Bi-weekly Performance Reports",
    "🎯 Dedicated Automation Specialist",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};

const usPlan3 = {
  heading: "Save more money then Ever",
  planName: "Elite Clinic Pro Pack",
  oneTimePayment: 1999,
  onGoingMaintenance: 1499,
  features: [
    "✅ Everything in Growth +",
    "✅ Unlimited Service Funnels",
    "✅ AI Chatbot for Pre-Consult Intake",
    "✅ Patient Journey Mapping + SOP Automation",
    "✅ Online Payments + Auto-Invoicing (via Stripe)",
    "✅ Staff Activity Dashboard + Role-Based Access",
    "✅ Advanced Re-Activation & Upsell Flows",
    "📊 Weekly Report + Monthly Growth Strategy Call",
    "🎯 Priority Support + Custom Onboarding",
  ],
  demoVideoLink: "",
  buyNowLink: "",
};
country = { country: "US" };
const plan1 = country.country === "IN" ? indianPlan1 : usPlan1;
const plan2 = country.country === "IN" ? indianPlan2 : usPlan2;
const plan3 = country.country === "IN" ? indianPlan3 : usPlan3;

function renderPlan(plan, elementId) {
  const container = document.getElementById(elementId);
  console.log("this is container:", container);
  if (!container) return;

  container.innerHTML = `
      <h3>${plan.heading}</h3>
      <div class="pricing-header">
        <h4>${plan.planName}</h4>
        <p>One-time payment: <strong>${country.country === "US" ? "$" : "₹"}${
    plan.oneTimePayment
  }</strong></p>
        <p><strong>On-Going Maintenance:</strong> ${
          country.country === "US" ? "$" : "₹"
        }${plan.onGoingMaintenance} / month</p>
        <span class="badge">✅ No Hidden Charges ✅</span>
      </div>
      <ul class="features">
        ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
      <div class="btn-row">
        <button class="watch-demo-btn" onclick="openVideoModal('${
          plan.demoVideoLink
        }')">⬇ Watch Demo</button>
        <button onclick="redirectToWhatsapp('${
          plan.buyNowLink
        }')" class="buy-now-btn">✅ Buy Now✅</button>
      </div>
    `;
}
console.log("this is plan1:", plan1);
renderPlan(plan1, "pricing-box1");
renderPlan(plan2, "pricing-box2");
renderPlan(plan3, "pricing-box3");
