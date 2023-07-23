import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';

const FollowingButton = ({ user, userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingUsers, setFollowing] = useState([]);
  const [userData, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        const userData = response.data;
        setUser(userData);

        const followingResponse = await axios.get(`http://localhost:8080/users/${userData.id}/following`);
        setFollowing(followingResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Check if the logged-in user is following the target user
    const loggedInUserId = user.id;
    const isFollowingUser = followingUsers.some(
      (user) => user.id === loggedInUserId
    );
    setIsFollowing(isFollowingUser);
  }, [followingUsers, user.id]);

  const followUserId=userData.id;
  const followingId=user.id;

  const handleToggleFollowing = async () => {
   
    try {
      if (isFollowing) {
        // Unfollow the user
        await fetch(`http://localhost:8080/users/${userData.id}/followers/${user.id}`, {
          method: "DELETE",
        });
      } else {
        // Follow the user
        await fetch(`http://localhost:8080/users/${userData.id}/follow/${user.id}`, {
          method: "POST",
        });
      }
      // Toggle the state after successful API call
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling following:", error);
    }
  };

  return (
    <Button className='button_dev' variant="outlined" onClick={handleToggleFollowing}>
      {isFollowing ? "Unfollow" : "Following"}
    </Button>
  );
};

export default FollowingButton;
