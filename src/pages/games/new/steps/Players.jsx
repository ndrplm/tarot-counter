import { Input, InputLabel, Stack, Typography } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { NewGameNavigationButtons } from "../private/NewGameNavigationButtons";

export const Players = () => {
  const navigate = useNavigate()
  const initialValues = {
    players: []
  }
  return (
    <Stack spacing={8}>
      <Typography variant="h6" component="h1">
        Ajouter des joueurs
      </Typography>
      <Formik initialValues={initialValues}>
        {({values}) => (
          <Form>
            {console.log(values)}
            <Stack>
              <InputLabel>Joueur</InputLabel>
              <FieldArray name="players">
                {() => (
                  <Field/>
                )}
              </FieldArray>
            </Stack>
          </Form>
        )}
      </Formik>
      <NewGameNavigationButtons hasPrevious hasNext previous={() => navigate("/")} />
    </Stack>
  );
};
