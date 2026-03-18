const TRELLO_BASE_URL = "https://api.trello.com/1";

const getEnv = () => {
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  const listId = process.env.TRELLO_LIST_ID;
  return { key, token, listId };
};

const buildDesc = ({ videoLink, category, thumbnail, assignmentId }) => {
  const lines = [];
  if (assignmentId) lines.push(`Assignment ID: ${assignmentId}`);
  if (category) lines.push(`Category: ${category}`);
  if (videoLink) lines.push(`Video: ${videoLink}`);
  if (thumbnail) lines.push(`Thumbnail: ${thumbnail}`);
  return lines.join("\n");
};

export const createTrelloCard = async ({ title, videoLink, category, thumbnail, assignmentId }) => {
  const { key, token, listId } = getEnv();
  if (!key || !token || !listId) {
    console.warn("Trello not configured (missing TRELLO_KEY, TRELLO_TOKEN, or TRELLO_LIST_ID). Skipping card creation.");
    return null;
  }
  if (typeof fetch !== "function") {
    throw new Error("Fetch API is not available. Please use Node.js 18+ or add a fetch polyfill.");
  }

  const params = new URLSearchParams({
    key,
    token,
    idList: listId,
    name: title,
    desc: buildDesc({ videoLink, category, thumbnail, assignmentId }),
  });

  const url = `${TRELLO_BASE_URL}/cards?${params.toString()}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Trello API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      url: data.url,
      shortUrl: data.shortUrl,
      name: data.name,
    };
  } finally {
    clearTimeout(timeout);
  }
};
