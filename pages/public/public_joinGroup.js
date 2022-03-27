import { useContext, useEffect, useState } from "react";
import UserObjContext from "../../src/contextAPI/UserObjContext";
import { dbService } from "../../src/fbase";
import classNames from "classnames";
import Footer from "../../src/index/component/Footer";
import Top from "../../src/index/component/Top";
import styles from "../../src/public/css/public_joinGroup.module.css";

const public_joinGroup = () => {
  const [userObj, setUserObj] = useContext(UserObjContext);
  const [wholeGroups, setWholeGroups] = useState([]);
  const [groupFilter, setGroupFilter] = useState("");
  const [mapGroupList, setMapGroupList] = useState([]);

  function requestJoin(e) {
    const memberDocRef = dbService
      .collection(e.target.dataset.group_name)
      .doc("group_data")
      .collection("members")
      .doc(userObj.uid);
    const awaitorDocRef = dbService
      .collection(e.target.dataset.group_name)
      .doc("group_data")
      .collection("awaitors")
      .doc(userObj.uid);

    memberDocRef.get().then((doc) => {
      if (doc.exists) {
        alert("이미 가입한 그룹입니다. :D");
      } else {
        awaitorDocRef.set({
          name: userObj.name,
          displayName: userObj.displayName,
          photoURL: userObj.photoURL,
          introduce: userObj.introduce,
          uid: userObj.uid,
        });
      }
    });
  }

  const groupSmallCard = mapGroupList.map((el, index) => (
    <div className={styles.card} key={index}>
      <h1 className={styles.group_name}>{el.group_name}</h1>
      <h2 className={styles.group_introduce}>{el.group_introduce}</h2>
      <div onClick={requestJoin} data-group_name={el.group_name}>
        가입 신청
      </div>
    </div>
  ));

  function traceInputChange(e) {
    setGroupFilter(e.target.value);
  }

  useEffect(() => {
    dbService
      .collection("whole_groups")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setWholeGroups((wholeGroups) => [
            ...wholeGroups,
            {
              group_name: doc.data().group_name,
              group_introduce: doc.data().group_introduce,
            },
          ]);
        });
      });
  }, []);

  useEffect(() => {
    if (groupFilter) {
      setMapGroupList(
        wholeGroups.filter((el) => el.group_name.includes(groupFilter))
      );
    } else {
      setMapGroupList([]);
    }
  }, [groupFilter]);

  return (
    <>
      <Top />
      <div className={styles.joinGroup}>
        <div
          className={classNames({
            ["container"]: true,
            [styles.container__public_joinGroup]: true,
          })}
        >
          <input
            type="text"
            onChange={traceInputChange}
            value={groupFilter}
            placeholder="원하는 그룹명을 입력하세요."
          />
          <div>{groupSmallCard}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default public_joinGroup;
