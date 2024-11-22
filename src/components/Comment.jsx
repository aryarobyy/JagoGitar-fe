import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

const Comment = ({ commentId, commentData }) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{commentData.user.username}
						</Text>
					</Flex>
					<Text>{commentData.text}</Text>
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);
};

Comment.propTypes = {
	commentId: PropTypes.string.isRequired,
	commentData: PropTypes.shape({
	  user: PropTypes.shape({
		username: PropTypes.string.isRequired,
	  }).isRequired,
	  text: PropTypes.string.isRequired,
	}).isRequired,
  };

export default Comment;
