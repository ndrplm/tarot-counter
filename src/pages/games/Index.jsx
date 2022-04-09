import { GAMES } from "../../mocks";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export const Index = () => (
  <Stack spacing={2}>
    {GAMES.map((game) => (
      <Button
        variant="outlined"
        key={game.id}
        component={Link}
        to={`/games/${game.id}`}
      >
        Partie du {game.date}
      </Button>
    ))}
  </Stack>
);
