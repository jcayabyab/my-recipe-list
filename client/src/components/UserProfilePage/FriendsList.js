import React from "react";
import { Box, Tooltip, useTheme, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ColoredAvatar from "../../utils/ColoredAvatar";

const FriendsList = ({ friends, history }) => {
  const { palette } = useTheme();

  return (
    <React.Fragment>
      <Typography variant="h5" style={{ margin: "15px 0px 3px" }}>
        Friends:
      </Typography>
      <Box display="flex" alignItems="center" marginBottom="15px">
        {friends.map(friend => (
          <Tooltip
            title={friend.firstName + " " + friend.lastName}
            key={friend.userName}
          >
            <ColoredAvatar
              src={friend.profilePictureUrl}
              alt={friend.userName}
              onClick={() => history.push("/user/" + friend.userName)}
              color={palette.secondary.main}
              style={{
                margin: "0px 3px",
                width: "50px",
                height: "50px",
                fontSize: "25px"
              }}
            >
              {friend.firstName[0]}
            </ColoredAvatar>
          </Tooltip>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default withRouter(FriendsList);
