"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  DataContextType,
  TeamData,
  TeamPlayer,
  TransferPlayer,
  InternationalPlayer,
  RSCIPlayer,
  GameResult,
  RawTeamData,
  RawTransferPortalData,
  RawInternationalData,
  RawRSCIData,
  PlayerStats,
} from "../types/data";

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

// Helper functions for data parsing
const parseTeamPlayer = (rawPlayer: Record<string, any>): TeamPlayer => ({
  player_id: rawPlayer.PLAYER_player_id || "",
  name: rawPlayer.PLAYER || "",
  jersey_number: rawPlayer["#"] || "",
  dxv_rating: rawPlayer.DXVi || rawPlayer.DXV || "",
  dxv_level: rawPlayer["DXV LEVEL"] || "",
  position: rawPlayer.POS || "",
  height: rawPlayer.HT || "",
  weight: rawPlayer.WT || "",
  class: rawPlayer.CL || "",
  age: rawPlayer.AGE || "",
  high_school: rawPlayer["HIGH SCHOOL"] || "",
  rsci_ranking: rawPlayer.RSCI || "",
  hometown: rawPlayer.HOMETOWN || "",
  aau: rawPlayer.AAU || "",
  nationality: rawPlayer.NATIONALITY || "",
  url: rawPlayer.PLAYER_url || "",
});

const parsePlayerStats = (rawStats: Record<string, any>): PlayerStats => ({
  games_played: rawStats.GP || "",
  games_started: rawStats.GS || "",
  minutes: rawStats.MIN || "",
  points: rawStats.PTS || "",
  rebounds: rawStats.REB || "",
  assists: rawStats.AST || "",
  per: rawStats.PER || "",
  steals: rawStats.STL || "",
  blocks: rawStats.BLK || "",
  turnovers: rawStats.TOV || "",
  fg2_made: rawStats["2PM"] || "",
  fg2_attempted: rawStats["2PA"] || "",
  fg2_percentage: rawStats["2P%"] || "",
  fg3_made: rawStats["3PM"] || "",
  fg3_attempted: rawStats["3PA"] || "",
  fg3_percentage: rawStats["3P%"] || "",
  ft_made: rawStats.FTM || "",
  ft_attempted: rawStats.FTA || "",
  ft_percentage: rawStats["FT%"] || "",
  points_per_40: rawStats.P40 || "",
  rebounds_per_40: rawStats.R40 || "",
  assists_per_40: rawStats.A40 || "",
});

const parseGameResult = (rawGame: Record<string, any>): GameResult => ({
  type: rawGame.TYPE || "",
  game_number: rawGame["#"] || "",
  date: rawGame.DATE || "",
  opponent: rawGame.OPPONENT || "",
  opponent_team_id: rawGame.OPPONENT_team_id || "",
  opponent_url: rawGame.OPPONENT_url || "",
  result_or_time: rawGame["RES/TIME"] || "",
  record: rawGame.RECORD || "",
  high_points: rawGame["HIGH POINTS"] || "",
  high_rebounds: rawGame["HIGH REBOUNDS"] || "",
  high_assists: rawGame["HIGH ASSISTS"] || "",
  pdf_url: rawGame.PDF_url || "",
  boxscore_url: rawGame["RES/TIME_url"] || "",
});

const parseTransferPlayer = (
  rawPlayer: Record<string, any>
): TransferPlayer => ({
  player_id: rawPlayer.PLAYER_player_id || "",
  name: rawPlayer.PLAYER || "",
  transfer_status: rawPlayer["TR_STATUS"] || rawPlayer["TR STATUS"] || "",
  dxv_rating: rawPlayer.DXV || "",
  dxv_level: rawPlayer.DXV_LEVEL || rawPlayer["DXV LEVEL"] || "",
  rsci_ranking: rawPlayer.RSCI || "",
  current_team: rawPlayer.TEAM || "",
  team_id: rawPlayer.TEAM_team_id || "",
  class: rawPlayer.CL || "",
  position: rawPlayer.POS || "",
  height: rawPlayer.HT || "",
  weight: rawPlayer.WT || "",
  age: rawPlayer.AGE || "",
  url: rawPlayer.PLAYER_url || "",
  stats: parsePlayerStats(rawPlayer),
});

const parseInternationalPlayer = (
  rawPlayer: Record<string, any>
): InternationalPlayer => ({
  player_id: rawPlayer.PLAYER_player_id || "",
  name: rawPlayer.PLAYER || "",
  class: rawPlayer.CLASS || "",
  ncaa_level: rawPlayer.NCAA || "",
  ncaa_interest: rawPlayer.NCAA_INTEREST || "",
  english_level: rawPlayer.ENGLISH || "",
  video_clips: rawPlayer.VC || "",
  age: rawPlayer.AGE || "",
  height: rawPlayer.HT || "",
  weight: rawPlayer.WT || "",
  position: rawPlayer.POS || "",
  nationality: rawPlayer.NATIONALITY || "",
  high_school: rawPlayer.HIGH_SCHOOL || "",
  hs_state: rawPlayer.HS_ST || "",
  url: rawPlayer.PLAYER_url || "",
});

const parseRSCIPlayer = (rawPlayer: Record<string, any>): RSCIPlayer => ({
  player_id: rawPlayer.PLAYER_player_id || "",
  name: rawPlayer.PLAYER || "",
  rank: parseInt(rawPlayer["#"] || "0"),
  rsci_rank: rawPlayer.RSCI || "",
  height: rawPlayer.HT || "",
  weight: rawPlayer.WT || "",
  position: rawPlayer.POS || "",
  age: rawPlayer.AGE || "",
  league: rawPlayer.LEAGUE || "",
  team: rawPlayer.TEAM || "",
  team_id: rawPlayer.TEAM_team_id || "",
  url: rawPlayer.PLAYER_url || "",
  stats: parsePlayerStats(rawPlayer),
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [team, setTeam] = useState<TeamData | null>(null);
  const [transferPortal, setTransferPortal] = useState<{
    available: TransferPlayer[];
    committed: TransferPlayer[];
  }>({ available: [], committed: [] });
  const [international, setInternational] = useState<InternationalPlayer[]>([]);
  const [rsci, setRSCI] = useState<RSCIPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all JSON files in parallel
      const [
        teamResponse,
        availableResponse,
        committedResponse,
        internationalResponse,
        rsciResponse,
      ] = await Promise.all([
        fetch("/dashboard/team.json"),
        fetch("/dashboard/transfer_portal_available_players.json"),
        fetch("/dashboard/transfer_portal_already_committed.json"),
        fetch("/dashboard/international.json"),
        fetch("/dashboard/rsci.json"),
      ]);

      if (
        !teamResponse.ok ||
        !availableResponse.ok ||
        !committedResponse.ok ||
        !internationalResponse.ok ||
        !rsciResponse.ok
      ) {
        throw new Error("Failed to fetch one or more data files");
      }

      const [
        teamData,
        availableData,
        committedData,
        internationalData,
        rsciData,
      ] = await Promise.all([
        teamResponse.json() as Promise<RawTeamData>,
        availableResponse.json() as Promise<RawTransferPortalData>,
        committedResponse.json() as Promise<RawTransferPortalData>,
        internationalResponse.json() as Promise<RawInternationalData>,
        rsciResponse.json() as Promise<RawRSCIData>,
      ]);

      // Parse team data
      const rosterTable = teamData.tables.find((t) => t.table_index === 0);
      const statsTable = teamData.tables.find((t) => t.table_index === 2);
      const scheduleTable = teamData.tables.find((t) => t.table_index === 3);

      if (rosterTable && statsTable && scheduleTable) {
        const roster = rosterTable.data.map(parseTeamPlayer);
        const stats = statsTable.data.map((rawStats) => {
          const basePlayer = parseTeamPlayer(rawStats);
          return {
            ...basePlayer,
            stats: parsePlayerStats(rawStats),
          };
        });
        const schedule = scheduleTable.data.map(parseGameResult);

        setTeam({
          name: "St. Bonaventure", // Could be extracted from filename
          filename: teamData.filename,
          roster,
          stats,
          schedule,
        });
      }

      // Parse transfer portal data
      setTransferPortal({
        available: availableData.data.map(parseTransferPlayer),
        committed: committedData.data.map(parseTransferPlayer),
      });

      // Parse international data
      const internationalTable = internationalData.tables[0];
      if (internationalTable) {
        setInternational(internationalTable.data.map(parseInternationalPlayer));
      }

      // Parse RSCI data
      const rsciTable = rsciData.tables[0];
      if (rsciTable) {
        setRSCI(rsciTable.data.map(parseRSCIPlayer));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while loading data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const value: DataContextType = {
    team,
    transferPortal,
    international,
    rsci,
    loading,
    error,
    refreshData: loadData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
