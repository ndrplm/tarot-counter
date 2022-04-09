import { Input, InputLabel, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NewGameNavigationButtons } from "../private/NewGameNavigationButtons";

export const Players = () => {
  const navigate = useNavigate()
  return (
    <Stack spacing={8}>
      <Typography variant="h6" component="h1">
        Ajouter des joueurs
      </Typography>
      <Stack>
        <InputLabel>Joueur</InputLabel>
        <Input />
      </Stack>
      <NewGameNavigationButtons hasPrevious hasNext previous={() => navigate("/")} />
    </Stack>
  );
};
