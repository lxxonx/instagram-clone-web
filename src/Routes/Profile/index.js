import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Loader from "../../Components/Loader";
import Posted from "./Posted";
import ProfileHeader from "./ProfileHeader";
import ProfileNav from "./ProfileNav";
import { Posts, Wrapper } from "./ProfileStyles";
import Saved from "./Saved";

export const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      avatar
      fullname
      bio
      isSelf
      numberOfFollowers
      numberOfFollowings
      numberOfPosts
      amIFollowing
    }
  }
`;

function Profile() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const [limit, setLimit] = useState(21);
  const [location, setLocation] = useState(`home`);
  const { data, loading } = useQuery(PROFILE, {
    variables: { username },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    switch (pathname) {
      case `/${username}/tagged`:
        setLocation("tagged");
        break;
      case `/${username}/channel`:
        setLocation("channel");
        break;
      case `/${username}/saved`:
        setLocation("saved");
        break;
      default:
        setLocation("home");
        break;
    }
    return () => {};
  }, [username, pathname, loading, data]);

  //render
  if (loading || !data) {
    return <Loader />;
  } else {
    const { seeProfile } = data;
    return (
      <>
        <Helmet>
          <title>
            {seeProfile.fullname
              ? `${seeProfile.fullname}(@${username})`
              : `@${username}`}
          </title>
        </Helmet>
        <Wrapper>
          {
            <>
              <ProfileHeader
                username={username}
                avatar={seeProfile.avatar}
                fullname={seeProfile.fullname}
                bio={seeProfile.bio}
                isSelf={seeProfile.isSelf}
                numberOfFollowers={seeProfile.numberOfFollowers}
                numberOfFollowings={seeProfile.numberOfFollowings}
                numberOfPosts={seeProfile.numberOfPosts}
                followTrue={seeProfile.amIFollowing}
              />
              <ProfileNav
                username={username}
                setLocation={setLocation}
                location={location}
                isSelf={seeProfile.isSelf}
              />

              <Posts>
                {location === "home" && <Posted username={username} />}
                {location === "channel" && <div>channel</div>}
                {location === "saved" && seeProfile.isSelf && (
                  <Saved username={username} />
                )}
                {location === "tagged" && <div>tagged</div>}
              </Posts>
              {/* todo infinite scroll */}
            </>
          }
        </Wrapper>
        <Footer />
      </>
    );
  }
}
export default Profile;
