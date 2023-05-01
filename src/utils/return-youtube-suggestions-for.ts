import {APIApplicationCommandOptionChoice} from 'discord-api-types/v10';
import getYouTubeSuggestionsFor from './get-youtube-suggestions-for.js';

const returnYouTubeSuggestionsFor = async (query: string, limit = 10): Promise<APIApplicationCommandOptionChoice[]> => {
  const [youtubeSuggestions] = await Promise.all([
    getYouTubeSuggestionsFor(query),
  ]);

  const totalYouTubeResults = youtubeSuggestions.length;

  // Number of results for each source should be roughly the same.
  const maxYouTubeSuggestions = limit;
  const numOfYouTubeSuggestions = Math.min(maxYouTubeSuggestions, totalYouTubeResults);

  const suggestions: APIApplicationCommandOptionChoice[] = [];

  suggestions.push(
    ...youtubeSuggestions
      .slice(0, numOfYouTubeSuggestions)
      .map(suggestion => ({
        name: `YouTube: ${suggestion}`,
        value: suggestion,
      }),
      ));

  return suggestions;
};

export default returnYouTubeSuggestionsFor;
