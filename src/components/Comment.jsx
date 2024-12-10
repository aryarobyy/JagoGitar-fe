import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Flex, Text, Divider } from "@chakra-ui/react";

const Comment = ({ comment, postAuthor, lastReply }) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar 
                    src={comment.userPP} 
                    size={"sm"} 
                    name={comment.username} 
                />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {comment.username}
                        </Text>
                    </Flex>
                    <Text>{comment.text}</Text>
                </Flex>
            </Flex>
            {lastReply ? null : <Divider />}
        </>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        userPP: PropTypes.string,
        username: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    postAuthor: PropTypes.object,
    lastReply: PropTypes.bool.isRequired,
};

export default Comment;