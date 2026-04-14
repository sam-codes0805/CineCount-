const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export const getMovieBrief = async (title, description, releaseDate) => {
  const prompt = `
    Analyze the movie "${title}" released on "${releaseDate}"based on this plot: "${description}".
    Provide exactly three sections:
    1. STORYLINE: A high-impact 4-5 sentence summary of the motive and plot.
    2. GUIDANCE: Age rating and content warnings (violence, language, etc.).
    3. RECOMMENDED FOR: A list of interests or similar movies (e.g., "Those who love high-stakes thrillers and Nolan films").
    Keep it concise and dramatic.
  `;

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error details:", errorData);
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "Failed to load AI Analysis.";
  }
};