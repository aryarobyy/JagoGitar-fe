// import { useState } from "react";
// import userAtom from "../atoms/userAtom";
// import { useRecoilValue } from "recoil";
// import { getFollow, deleteFollow, createFollow } from "../libs/Methods";

// const follow = (user,my_id,setFollowing) => {
//   if (!my_id) {
//     console.log("Error", "Please login to follow", "error");
//     return;
//   }
//   getFollow({ user_id: my_id,following: user._id })
//   .then(data => {
//     if(data.status == 204){
//       createFollow({ user_id: my_id,following: user._id }).then((datas) => {
//         if(datas.status == 201){
//           console.log("Success", `Followed ${user.name}`, "success");
//           setFollowing(true)
//         }else{
//           console.log("Error");
//         }
//       })
//     }else{
//       deleteFollow({_id:data.data[0]._id}).then((datas) => {
//         if(datas.status == 200){
//           console.log("Success", `Unfollow ${user.name}`, "success");
//           setFollowing(false)
//         }else{
//           console.log("Error");
//         }
//       })
//     }
//   })
// };

// export default follow;
