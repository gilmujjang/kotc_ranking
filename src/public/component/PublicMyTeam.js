import { memo, useState, useEffect, useContext } from "react";
import { dbService } from "../../fbase";
import { Dimmer, Loader, Image, Segment, Icon } from "semantic-ui-react";
import classNames from "classnames";
import styles from "../css/PublicMyTeam.module.css";
import UserObjContext from "../../contextAPI/UserObjContext";
import Link from "next/link";

const MyTeam = () => {
  const [init, setInit] = useState(false);
  const [userObj] = useContext(UserObjContext);
  const [myTeamInfo, setMyTeamInfo] = useState([]);
  const src = "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";

  useEffect(async () => {
    const querySnapshot = await dbService
      .collection("whole_users")
      .doc(userObj.uid)
      .collection("joined_group")
      .get();
    if (querySnapshot.docs.length === 0) {
      // 여기에 KOTC 카드
      let singleInfoObj = { joined_date: 20000000 };
      dbService
        .collection("KOTC")
        .doc("group_information")
        .get()
        .then((small_doc) => {
          (singleInfoObj.group_name = small_doc.data().group_name),
            (singleInfoObj.group_introduce = small_doc.data().group_introduce),
            (singleInfoObj.number_of_member =
              small_doc.data().number_of_member),
            (singleInfoObj.created_date = small_doc.data().created_date);
        })
        .then(() => {
          setMyTeamInfo([singleInfoObj]);
        });
    }

    querySnapshot.forEach((doc) => {
      let singleInfoObj = {};
      dbService
        .collection(doc.data().group_name)
        .doc("group_information")
        .get()
        .then((small_doc) => {
          (singleInfoObj.group_name = small_doc.data().group_name),
            (singleInfoObj.group_introduce = small_doc.data().group_introduce),
            (singleInfoObj.number_of_member =
              small_doc.data().number_of_member),
            (singleInfoObj.created_date = small_doc.data().created_date);
        })
        .then(() => {
          dbService
            .collection(doc.data().group_name)
            .doc("group_data")
            .collection("admins")
            .doc(userObj.uid)
            .get()
            .then((small_doc) => {
              if (small_doc.exists) {
                singleInfoObj.isAdmin = true;
              }
            });
        })
        .then(() => {
          dbService
            .collection(doc.data().group_name)
            .doc("group_data")
            .collection("members")
            .doc(userObj.uid)
            .get()
            .then((small_doc) => {
              singleInfoObj.joined_date = Number(
                small_doc.data().joindate.slice(0, 8)
              );
            });
        });
      setMyTeamInfo((myTeamInfo) => [...myTeamInfo, singleInfoObj]);
    });
  }, []);

  setTimeout(() => {
    setInit(true);
  }, 1500);

  return (
    <>
      {init ? (
        <div className={styles.myTeam}>
          <div
            className={classNames({
              ["container"]: true,
              [styles.container__myTeam]: true,
            })}
          >
            <h1>가입한 그룹</h1>
            <div className={styles.teams}>
              {myTeamInfo.map((el, index) => (
                <div className={styles.team_card} key={index}>
                  <div className={styles.team_image}>
                    <img src={src} alt="team profile" />
                    {el.isAdmin === true ? (
                      <Link href={`/admin/${el.group_name}`}>
                        <a>
                          <Icon
                            fitted
                            className={styles.setting}
                            name="setting"
                            size="large"
                          />
                        </a>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Link href={`/public/${el.group_name}`}>
                    <a>
                      <h1 className={styles.team_name}>{el.group_name}</h1>
                    </a>
                  </Link>
                  <h2 className={styles.team_introduce}>
                    {el.group_introduce}
                  </h2>
                  <ul className={styles.team_info}>
                    <li className={styles.created_date}>
                      <span className={styles.info_name}>그룹 생성일</span>
                      <span className={styles.info_content}>
                        {el.created_date}
                      </span>
                    </li>
                    <li className={styles.joined_date}>
                      <span className={styles.info_name}>그룹 가입일</span>
                      <span className={styles.info_content}>
                        {el.joined_date}
                      </span>
                    </li>
                    <li className={styles.member_number}>
                      <span className={styles.info_name}>그룹 멤버 수</span>
                      <span className={styles.info_content}>
                        {el.number_of_member}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Segment className="loading">
          <Dimmer active>
            <Loader size="huge">Loading</Loader>
          </Dimmer>

          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      )}
    </>
  );
};

export default memo(MyTeam);
