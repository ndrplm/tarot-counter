import { NewGameContext } from "../../../../contexts/NewGameContext";
import { NavigationButtons } from "../../../../components/NavigationButtons";

export const NewGameNavigationButtons = (props) => (
	<NavigationButtons context={NewGameContext} {...props} />
)
