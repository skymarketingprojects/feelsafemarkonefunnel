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
// window.onload = formModalTimer;

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
    ctaBar.classList.add("show");
  } else {
    ctaBar.classList.remove("show");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

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
  document.getElementById("video-frame").src = embedUrl;
  document.getElementById("video-modal").style.display = "flex";
}

function closeVideoModal() {
  document.getElementById("video-modal").style.display = "none";
  document.getElementById("video-frame").src = "";
}

const getCountry = async () => {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    return data.country; // Return only the country code
  } catch (error) {
    console.log(error);
    return "US"; // Default to "US" in case of failure
  }
};

const indianPlans = {
  plan1: {
    heading: "Trusted by 400+ buyers ",
    planName: "Smart Automation (Unlimited Benefits )",
    oneTimePayment: 8000,
    onGoingMaintenance: 0,
    features: [
      "✅ Lead Generating Website",
      "✅ Google Reviews Booster",
      "✅ WhatsApp Integration",
      "✅ Basic Chatbot Integration",
      "✅ Words that convince more people",
      "✅ Appointment Booking link",
      "✅ Offer Popup",
      "✅ Offer GIF",
      "✅ Brand USP Highlighter",
      "✅ Thankyou Message and Mail",
    ],
    pdfPath: "./plans/Automation1.pdf",
    buyNowLink: `Hi, I'm interested in learning more about your Smart Automation plan.  How can I get started?`,
  },
  plan2: {
    heading: "Used by 130+ Indian clinics",
    planName: "Growth Automation Pack",
    oneTimePayment: 12500,
    onGoingMaintenance: 5000,
    features: [
      "✅ Smart Website with Lead Forms (1 Page)",
      "✅ Boost Google Reviews 2X Faster",
      "✅ Automated Email + SMS Follow-Up (Single Campaign)",
      "✅ Online Appointment Calendar + Reminders",
      "✅ WhatsApp Auto-Reply + Chatbot",
      "✅ Google Review Request Automation",
      "📊 Basic Lead Tracking Dashboard",
      "📊 Monthly Report & 1 Support Call",
      "🎯 Cut manual work by 80% and get better quality clients on auto-pilot",
    ],
    pdfPath: "./plans/Automation2.pdf",
    buyNowLink: `Hi, I'm interested in learning more about your Growth Automation Pack plan. How can I get started?`,
  },
  plan3: {
    heading: "₹2L /month revenue saved via automation",
    planName: "360 Marketing and Sales Automation",
    oneTimePayment: 24999,
    onGoingMaintenance: 9999,
    features: [
      "✅ Everything in Growth +",
      "✅ Multiple service pages/websites",
      "✅ Sales Pipeline with Lead Scoring",
      "✅ Staff performance dashboard",
      "✅ Lead reactivation flows",
      "✅ AI chatbot for website + WhatsApp",
      "✅ Multi-channel Nurture: Email, WhatsApp, SMS",
      "✅ Custom Offers & Promotions Automation",
      "📊 Bi-weekly Performance Reports",
      "🎯 Dedicated Automation Specialist",
      "🔥 Built for high-volume & high-quality client",
    ],
    pdfPath: "./plans/Automation3.pdf",
    buyNowLink: `Hi, I'm interested in learning more about your 360 Marketing and Sales Automation plan. How can I get started?`,
  },
};

//us plans
const usPlans = {
  plan1: {
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
  },
  plan2: {
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
  },
  plan3: {
    heading: "Save more money than ever",
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
  },
};

function renderPlan(plan, elementId, country) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const currencySymbol = country === "US" ? "$" : "₹";
  container.innerHTML = `
    <h3>${plan.heading}</h3>
    <div class="pricing-header">
      <h4>${plan.planName}</h4>
      <p>One-time payment: <strong>${currencySymbol}${
    plan.oneTimePayment
  }</strong></p>
      <p><strong>On-Going Maintenance:</strong> ${currencySymbol}${
    plan.onGoingMaintenance
  } / month</p>
      <span class="badge">✅ No Hidden Charges ✅</span>
    </div>
    <ul class="features">
      ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
    <div class="btn-row">
      <button class="watch-demo-btn" onclick="downloadPDF('${
        plan.pdfPath
      }')">⬇ Download Detail</button>
      <button onclick="redirectToWhatsapp(\`${
        plan.buyNowLink
      }\`)" class="buy-now-btn">✅ Buy Now ✅</button>
    </div>
  `;
}

async function initializePlans() {
  const country = await getCountry();
  const selectedPlans = country === "IN" ? indianPlans : usPlans;

  renderPlan(selectedPlans.plan1, "pricing-box1", country);
  renderPlan(selectedPlans.plan2, "pricing-box2", country);
  renderPlan(selectedPlans.plan3, "pricing-box3", country);
}

initializePlans();

// download pdf
function downloadPDF(pdfPath) {
  const link = document.createElement("a");
  link.href = pdfPath;
  link.download = pdfPath.split("/").pop(); // Extracts filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
