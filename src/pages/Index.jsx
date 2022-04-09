import { GAMES } from "../mocks";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const MAX_DISPLAYED_GAMES = 3;

export const Index = () => {
  const displayed_games = GAMES.slice(0, MAX_DISPLAYED_GAMES);

  return (
    <Container>
      <Stack spacing={6}>
        <Typography variant="h5" component="h1">
          Compteur de points
        </Typography>

        <Stack spacing={2}>
          {displayed_games.map((game) => (
            <Button
              variant="outlined"
              key={game.id}
              component={Link}
              to={`/games/${game.id}`}
            >
              Partie du {game.date}
            </Button>
          ))}

          <Button variant="contained" component={Link} to="/games/new">
            Nouvelle partie
          </Button>
          {GAMES.length > MAX_DISPLAYED_GAMES && (
            <Button component={Link} to="/games">
              Voir plus de parties
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
