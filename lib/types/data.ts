// Player interfaces
export interface Player {
  player_id: string;
  name: string;
  height: string;
  weight: string;
  position: string;
  age: string;
  nationality?: string;
  url?: string;
}

export interface PlayerStats {
  games_played?: number;
  games_started?: number;
  minutes?: number;
  points?: number;
  rebounds?: number;
  assists?: number;
  per?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fg2_made?: number;
  fg2_attempted?: number;
  fg2_percentage?: number;
  fg3_made?: number;
  fg3_attempted?: number;
  fg3_percentage?: number;
  ft_made?: number;
  ft_attempted?: number;
  ft_percentage?: number;
  points_per_40?: number;
  rebounds_per_40?: number;
  assists_per_40?: number;
}

// Team roster data (from team.json - Table 1)
export interface TeamPlayer extends Player {
  jersey_number: string;
  dxv_rating: string;
  dxv_level: string;
  class: string;
  high_school?: string;
  rsci_ranking?: string;
  hometown?: string;
  aau?: string;
  stats?: PlayerStats;
}

// Transfer portal players
export interface TransferPlayer extends Player {
  transfer_status: string;
  dxv_rating: string;
  dxv_level: string;
  rsci_ranking?: string;
  current_team: string;
  team_id?: string;
  class: string;
  stats: PlayerStats;
}

// International players
export interface InternationalPlayer extends Player {
  class: string;
  ncaa_level: string;
  ncaa_interest: string;
  english_level: string;
  video_clips?: string;
  high_school?: string;
  hs_state?: string;
}

// RSCI Rankings
export interface RSCIPlayer extends Player {
  rank: number;
  rsci_rank: string;
  stats?: PlayerStats;
  league?: string;
  team?: string;
  team_id?: string;
}

// Schedule/Games data (from team.json - Table 4)
export interface GameResult {
  type: string; // "Regular", "Playoff Rd of 32", etc.
  game_number: string;
  date: string; // "1/4/2025" format
  opponent: string; // "@Fordham", "vsLa Salle"
  opponent_team_id: string;
  opponent_url?: string;
  result_or_time?: string; // "W 70-56" for completed, time for upcoming
  record?: string; // "(1-0)"
  high_points?: string;
  high_rebounds?: string;
  high_assists?: string;
  pdf_url?: string;
  boxscore_url?: string;
}

// Team data structure
export interface TeamData {
  name: string;
  filename: string;
  roster: TeamPlayer[];
  stats: TeamPlayer[]; // Player stats from Table 3
  schedule: GameResult[]; // Games from Table 4
}

// Raw JSON structure interfaces (for parsing)
export interface RawTableData {
  table_index: number;
  table_name: string;
  headers: string[];
  data: Record<string, any>[];
  row_count?: number;
  unique_player_ids?: number;
  unique_team_ids?: number;
}

export interface RawTeamData {
  filename: string;
  total_tables_found: number;
  tables_selected: number;
  target_indexes: number[];
  tables: RawTableData[];
}

export interface RawTransferPortalData {
  table_name: string;
  headers: string[];
  row_count: number;
  data: Record<string, any>[];
}

export interface RawInternationalData {
  filename: string;
  tables_found: number;
  tables_with_data: number;
  tables: RawTableData[];
}

export interface RawRSCIData {
  filename: string;
  tables_found: number;
  tables_with_data: number;
  tables: RawTableData[];
}

// Main data context interface
export interface DataContextType {
  team: TeamData | null;
  transferPortal: {
    available: TransferPlayer[];
    committed: TransferPlayer[];
  };
  international: InternationalPlayer[];
  rsci: RSCIPlayer[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

// Helper types for filtering/processing
export interface UpcomingGame {
  id: string;
  opponent: string;
  cleanOpponent: string; // Parsed team name without "vs"/"@"
  date: Date;
  dateString: string;
  isHome: boolean;
  location?: string;
}

export interface ProcessedGameData {
  upcoming: UpcomingGame[];
  recent: GameResult[];
  completed: GameResult[];
}