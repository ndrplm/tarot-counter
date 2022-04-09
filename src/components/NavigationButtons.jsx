import { Button, Stack } from "@mui/material";
import { useContext } from "react";

export const NavigationButtons = ({ hasPrevious, hasNext, previous, next, context }) => {
  const { setCurrentStep, currentStep } = useContext(context);

  const onNextClick = () => {
		next?.() || setCurrentStep(currentStep + 1);
  };

  const onPreviousClick = () => {
		previous?.() || setCurrentStep(currentStep - 1);
  };

  return (
    <Stack direction="row" spacing={2}>
      {hasPrevious && (
        <Button variant="outlined" onClick={onPreviousClick}>
          Retour
        </Button>
      )}

      {hasNext && (
        <Button variant="contained" onClick={onNextClick}>
          Suivant
        </Button>
      )}
    </Stack>
  );
};
