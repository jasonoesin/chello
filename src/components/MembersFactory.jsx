import BoardMember from "./BoardMember";
import Member from "./Member";

const MembersFactory = (props) => {
  if (props.type === "workspace") {
    return <Member isMember={props.isMember} />;
  } else if (props.type === "board") {
    return <BoardMember isMember={props.isMember} />;
  }
};

export default MembersFactory;
