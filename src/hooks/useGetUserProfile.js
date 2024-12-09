import { useState, useEffect } from "react";
import { getUserById } from "../connector/UserConnector";

const useGetUserProfile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const userId = localStorage.getItem("user_id");
				if (userId) {
					const user = await getUserById(userId);
					setUser(user);
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchUserProfile();
	}, []);

	return { user, loading };
};

export default useGetUserProfile;
