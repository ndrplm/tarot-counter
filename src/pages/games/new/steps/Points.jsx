import { useNavigate } from "react-router-dom";
import { NewGameNavigationButtons } from "../private/NewGameNavigationButtons";

export const Points = () => {
    const navigate = useNavigate()

    return(
      <>
        <div>Points</div>
        <NewGameNavigationButtons hasPrevious hasNext next={() => navigate('/')} />
      </>
    );
}
