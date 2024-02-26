import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";

const auth = FIREBASE_AUTH;

const UserAuthentication = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const subscriber = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return subscriber;
	}, []);

	return { user };
};

export default UserAuthentication;
