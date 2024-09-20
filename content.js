// Function to calculate the years of experience based on job periods
function getTotalYears(experienceList) {
  let totalYears = 0;

  experienceList.forEach((experience) => {
    const startYear = parseInt(experience.startYear);
    const endYear = !isNaN(experience.endYear)
      ? parseInt(experience.endYear)
      : new Date().getFullYear();
    totalYears += endYear - startYear;
  });

  return totalYears;
}

// Function to scrape the profile for the experience section
function scrapeExperience() {
  const experiences = [];

  const experienceElements = document
    .getElementById("experience")
    .nextElementSibling.nextElementSibling.querySelectorAll(
      "ul li .pvs-entity__caption-wrapper"
    );

  experienceElements.forEach((elem) => {
    const dateRange = elem.innerText;
    const [start, end] = dateRange
      .split(/\s*[-–—]\s*/)
      .map((str) => str.trim());

    const startYear = start.split(" ")[1];
    const endYear =
      end && !end.includes("Present | actualidad") ? end.split(" ")[1] : null;

    if (
      !isNaN(Number(startYear)) &&
      !isNaN(Number(endYear)) &&
      startYear &&
      endYear
    )
      experiences.push({ startYear, endYear });
  });

  const totalYears = getTotalYears(experiences);
  return totalYears;
}

// Send data to the background or popup
chrome.runtime.sendMessage({ totalExperience: scrapeExperience() });
