// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Youtube {
    struct User {
        uint256 id;
        string username;
        string channelName;
        string coverImage;
        string profileImage;
        address walletId;
        address[] subscribers;
    }

    struct Video {
        address owner;
        uint256 id;
        string uuid;
        string title;
        string videoUrl;
        string thumbnailUrl;
        string description;
        uint256 views;
        address[] likes;
        address[] dislikes;
        bool isDeleted;
        string username;
        string channelName;
        string profileImage;
    }

    Video[] public videos;
    User[] public users;

    mapping(uint256 => address) private videoToOwner;

    event VideoUploaded(uint256 id);
    event UpdateUser(address walletId);
    event CreateUser(address walletId);

    function getMyProfile() public view returns (User memory) {
        User memory userDetails;

        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].walletId == msg.sender) {
                userDetails = users[i];
            }
        }

        return userDetails;
    }

    function getUserProfile(address userAddress)
        public
        view
        returns (User memory)
    {
        User memory userDetails;

        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].walletId == userAddress) {
                userDetails = users[i];
            }
        }

        return userDetails;
    }

    function uploadVideo(
        string memory uuid,
        string memory title,
        string memory video,
        string memory thumbnail,
        string memory description
    ) public {
        uint256 videoId = videos.length;
        User memory userDetails;
        address[] memory emptyAddress;

        userDetails = getMyProfile();

        videos.push(
            Video(
                msg.sender,
                videoId,
                uuid,
                title,
                video,
                thumbnail,
                description,
                0,
                emptyAddress,
                emptyAddress,
                false,
                userDetails.username,
                userDetails.channelName,
                userDetails.profileImage
            )
        );

        emit VideoUploaded(videoId);
    }

    function createUser(
        string memory username,
        string memory channelName,
        string memory profileImg,
        string memory coverImg
    ) external {
        uint256 userId = users.length;
        address[] memory emptyAddress;

        users.push(
            User(
                userId,
                username,
                channelName,
                coverImg,
                profileImg,
                msg.sender,
                emptyAddress
            )
        );

        emit CreateUser(msg.sender);
    }

    function updateUser(
        string memory username,
        string memory channelName,
        string memory profileImg,
        string memory coverImg,
        address walletId
    ) external {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].walletId == walletId) {
                users[i].username = username;
                users[i].channelName = channelName;
                users[i].profileImage = profileImg;
                users[i].coverImage = coverImg;

                break;
            }
        }

        emit UpdateUser(walletId);
    }

    function isChannelNameExist(string memory channelName)
        public
        view
        returns (bool isExist)
    {
        bool isChannelExist = false;

        for (uint256 i = 0; i < users.length; i++) {
            if (
                keccak256(bytes(users[i].channelName)) ==
                keccak256(bytes(channelName))
            ) {
                isChannelExist = true;
                break;
            }
        }

        return isChannelExist;
    }

    function addSubscribe(uint256 userId) external {
        bool isUserAlreadySubscribed = false;

        for (uint256 i = 0; i < users[userId].subscribers.length; i++) {
            if (users[userId].subscribers[i] == msg.sender) {
                isUserAlreadySubscribed = true;
                break;
            }
        }

        if (!isUserAlreadySubscribed) {
            users[userId].subscribers.push(msg.sender);
        }
    }

    function deleteVideo(string memory uuid) external {
        for (uint256 i = 0; i < videos.length; i++) {
            bool isVideoExist = keccak256(bytes(videos[i].uuid)) ==
                keccak256(bytes(uuid));

            if (isVideoExist) {
                videos[i].isDeleted = true;
                break;
            }
        }
    }

    function getAllVideos() external view returns (Video[] memory) {
        uint256 counter = 0;

        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].isDeleted == false) {
                counter++;
            }
        }

        Video[] memory allVideos = new Video[](counter);

        for (uint256 i = 0; i < counter; i++) {
            if (videos[i].isDeleted == false) {
                allVideos[i] = videos[i];
            }
        }

        return allVideos;
    }

    function getVideoByUuid(string memory uuid)
        external
        view
        returns (Video memory)
    {
        Video memory video;
        for (uint256 i = 0; i < videos.length; i++) {
            if (
                videos[i].isDeleted == false &&
                keccak256(bytes(videos[i].uuid)) == keccak256(bytes(uuid))
            ) {
                video = videos[i];
            }
        }

        return video;
    }

    function updateVideo(
        uint256 videoId,
        string memory title,
        string memory description
    ) external {
        if (videos[videoId].owner == msg.sender) {
            videos[videoId].title = title;
            videos[videoId].description = description;
        }
    }

    function addViews(uint256 id) public returns (bool result) {
        videos[id].views = videos[id].views + 1;

        return true;
    }

    function addLikes(uint256 id) public returns (Video memory result) {
        bool isUserDisLikedTheVideo = false;

        for (uint256 i = 0; i < videos[id].dislikes.length; i++) {
            if (videos[id].dislikes[i] == msg.sender) {
                isUserDisLikedTheVideo = true;
                break;
            }
        }

        bool isUserAllowedToLike = true;

        if (!isUserDisLikedTheVideo) {
            for (uint256 i = 0; i < videos[id].likes.length; i++) {
                if (videos[id].likes[i] == msg.sender) {
                    isUserAllowedToLike = false;
                    break;
                }
            }
        }

        if (isUserAllowedToLike) {
            videos[id].likes.push(msg.sender);
        }

        return videos[id];
    }

    function addDisLikes(uint256 id) public returns (Video memory result) {
        bool isUserLikedTheVideo = false;

        for (uint256 i = 0; i < videos[id].likes.length; i++) {
            if (videos[id].likes[i] == msg.sender) {
                isUserLikedTheVideo = true;
                break;
            }
        }

        bool isUserAllowedToDisLike = true;

        if (!isUserLikedTheVideo) {
            for (uint256 i = 0; i < videos[id].likes.length; i++) {
                if (videos[id].likes[i] == msg.sender) {
                    isUserAllowedToDisLike = false;
                    break;
                }
            }
        }

        if (isUserAllowedToDisLike) {
            videos[id].dislikes.push(msg.sender);
        }

        return videos[id];
    }
}
