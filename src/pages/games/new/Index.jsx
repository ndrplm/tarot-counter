import { Stack, Typography } from "@mui/material";
import { Players } from "./steps/Players";
import { Contract } from "./steps/Contract";
import { Points } from "./steps/Points";
import { NewGameContext } from "../../../contexts/NewGameContext";

import { useState } from "react";

const STEPS = [Players, Contract, Points];

export const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const CurrentStep = STEPS[currentStep];

  return (
		<NewGameContext.Provider value={{currentStep, setCurrentStep}}>
			<Stack>
				<Typography variant="h5" component="h1">
					Nouvelle partie
				</Typography>
				<CurrentStep />
			</Stack>
		</NewGameContext.Provider>
  );
};
