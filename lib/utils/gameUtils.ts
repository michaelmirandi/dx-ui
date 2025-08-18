import { GameResult, UpcomingGame, ProcessedGameData } from "../types/data";

export const parseOpponent = (opponent: string): { name: string; isHome: boolean } => {
  if (opponent.startsWith("vs")) {
    return {
      name: opponent.substring(2), // Remove "vs"
      isHome: true,
    };
  } else if (opponent.startsWith("@")) {
    return {
      name: opponent.substring(1), // Remove "@"
      isHome: false,
    };
  }
  return {
    name: opponent,
    isHome: true, // Default to home
  };
};

export const parseGameDate = (dateString: string): Date => {
  // Handle "1/4/2025" format
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};

export const isUpcomingGame = (game: GameResult): boolean => {
  // Check if game has no result or contains "TBD"/"TBA"
  return !game.result_or_time || 
         game.result_or_time.includes("TBD") || 
         game.result_or_time.includes("TBA") ||
         (!game.result_or_time.includes("W") && !game.result_or_time.includes("L"));
};

export const processGameData = (games: GameResult[]): ProcessedGameData => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time for date comparison
  
  const upcoming: UpcomingGame[] = [];
  const recent: GameResult[] = [];
  const completed: GameResult[] = [];

  games.forEach((game, index) => {
    const gameDate = parseGameDate(game.date);
    const { name: cleanOpponent, isHome } = parseOpponent(game.opponent);
    
    if (isUpcomingGame(game) || gameDate >= today) {
      upcoming.push({
        id: `${game.game_number}-${index}`,
        opponent: game.opponent,
        cleanOpponent,
        date: gameDate,
        dateString: game.date,
        isHome,
        location: undefined, // Could be derived from team data
      });
    } else {
      completed.push(game);
      if (completed.length <= 5) {
        recent.push(game);
      }
    }
  });

  // Sort upcoming games by date
  upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Sort recent games by date (most recent first)
  recent.sort((a, b) => parseGameDate(b.date).getTime() - parseGameDate(a.date).getTime());

  return {
    upcoming,
    recent,
    completed,
  };
};

export const getUpcomingGames = (games: GameResult[], limit: number = 5): UpcomingGame[] => {
  const { upcoming } = processGameData(games);
  return upcoming.slice(0, limit);
};

export const formatGameDate = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const formatGameDateLong = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};