import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import {
	Card,
	Interaction,
	InteractionText,
	InteractionWrapper,
	PostImg,
	PostText,
	PostTime,
	UserImg,
	UserInfo,
	UserInfoText,
	UserName,
} from "../styles/TimelineStyles";

const PostCard = ({ item }) => {
	const starIcon = item.liked ? "star" : "staro";
	const starIconColor = item.liked ? "#2e64e5" : "#333";
	return (
		<Card>
			<UserInfo>
				<UserInfoText>
					<UserName>{item.postTime}</UserName>
				</UserInfoText>
			</UserInfo>
			<PostText>{item.post}</PostText>
			<PostImg source={{ uri: item?.postImg }} />
			<InteractionWrapper>
				<Interaction active>
					<AntDesign name={starIcon} size={22} color={starIconColor} />
					<InteractionText active={item.liked}>Star</InteractionText>
				</Interaction>
			</InteractionWrapper>
		</Card>
	);
};

export default PostCard;
