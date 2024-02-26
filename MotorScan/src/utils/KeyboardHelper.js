import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

export const useIsKeyboardShown = () => {
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardDidShow", () => {
			setIsShown(true);
		});
		const hideListener = Keyboard.addListener("keyboardDidHide", () => {
			setIsShown(false);
		});

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);

	return isShown;
};
