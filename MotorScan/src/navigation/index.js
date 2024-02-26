import React from "react";

import UserAuthentication from "../auth/UserAuthentication";
import AuthStack from "./AuthStack";
import UserTabs from "./UserTabs";

const Navigation = () => {
	const { user } = UserAuthentication();

	return user ? <UserTabs /> : <AuthStack />;
};

export default Navigation;
