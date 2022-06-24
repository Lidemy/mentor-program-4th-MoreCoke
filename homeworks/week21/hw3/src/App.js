import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";

import { mailValid, phoneValid } from "./utils";

function App() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [understanding, setUnderstanding] = useState("");
  const [other, setOther] = useState("");
  const [hasSubmited, setSubmit] = useState(false);

  const mailWarning = useMemo(() => {
    if (!hasSubmited) return "";
    return mailValid(mail) ? "" : "warning";
  }, [mail, hasSubmited]);

  const phoneWarning = useMemo(() => {
    if (!hasSubmited) return "";
    return phoneValid(phone) ? "" : "warning";
  }, [phone, hasSubmited]);

  const nameWarning = useMemo(() => {
    if (!hasSubmited) return "";
    return name !== "" ? "" : "warning";
  }, [name, hasSubmited]);

  const activityWarning = useMemo(() => {
    if (!hasSubmited) return "";
    return activity !== "" ? "" : "warning";
  }, [activity, hasSubmited]);

  const understandingWarning = useMemo(() => {
    if (!hasSubmited) return "";
    return understanding !== "" ? "" : "warning";
  }, [understanding, hasSubmited]);

  const isConfirmed = useMemo(() => {
    return (
      mailValid(mail) &&
      phoneValid(phone) &&
      name !== "" &&
      activity !== "" &&
      understanding !== ""
    );
  }, [mail, phone, name, activity, understanding]);

  const onNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [name]
  );

  const onMailChange = useCallback(
    (e) => {
      setMail(e.target.value);
    },
    [mail]
  );

  const onPhoneChange = useCallback(
    (e) => {
      setPhone(e.target.value);
    },
    [phone]
  );

  const onActivityChange = useCallback(
    (e) => {
      setActivity(e.target.value);
    },
    [activity]
  );

  const onUnstandingChange = useCallback(
    (e) => {
      setUnderstanding(e.target.value);
    },
    [understanding]
  );

  const onOtherChange = useCallback(
    (e) => {
      setOther(e.target.value);
    },
    [other]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      !hasSubmited && setSubmit(true);
      if (isConfirmed) {
        const otherInfo = `${other ? `其他: ${other}` : ""}`;
        const info = `
    暱稱: ${name}
    郵件: ${mail}
    電話: ${phone}
    選擇活動: ${activity}
    如何得知活動: ${understanding}
    ${otherInfo}
    `;
        alert(info);
      } else {
        alert("資料尚未填寫或資料格式錯誤");
      }
    },
    [isConfirmed, name, mail, phone, activity, understanding, other]
  );

  return (
    <div className="debug">
      <form action="" className="postpone" onSubmit={onSubmit}>
        <h1 className="postpone-title">新拖延運動報名表單</h1>
        <div className="postpone-description">
          活動日期：2020/12/10 ~ 2020/12/11
          <br />
          活動地點：台北市大安區新生南路二段1號
        </div>
        <span className="postpone-needed">必填</span>
        <div className={`postpone-group ${nameWarning}`}>
          <label className="postpone-type needed" htmlFor="name">
            暱稱
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="您的回答"
            value={name}
            onChange={onNameChange}
          />
          <p className="message">請填入暱稱</p>
        </div>
        <div className={`postpone-group ${mailWarning}`}>
          <label className="postpone-type needed" htmlFor="mail">
            電子郵件
          </label>
          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="您的電子郵件"
            value={mail}
            onChange={onMailChange}
          />
          <p className="message">請填入正確郵件格式</p>
        </div>
        <div className={`postpone-group ${phoneWarning}`}>
          <label className="postpone-type needed" htmlFor="phone">
            手機號碼
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="您的手機號碼"
            value={phone}
            onChange={onPhoneChange}
          />
          <p className="message">請填入正確號碼格式(十碼)</p>
        </div>
        <div className={`postpone-group ${activityWarning}`}>
          <p className="postpone-type needed">報名類型</p>
          <label htmlFor="bed" className="mb-23">
            <input
              type="radio"
              name="activity"
              id="bed"
              value="躺在床上用想像力實作"
              onChange={onActivityChange}
            />
            躺在床上用想像力實作
          </label>
          <label htmlFor="ground">
            <input
              type="radio"
              name="activity"
              id="ground"
              value="趴在地上滑手機找現成的"
              onChange={onActivityChange}
            />
            趴在地上滑手機找現成的
          </label>
          <p className="message">請選擇報名類型</p>
        </div>
        <div className={`postpone-group ${understandingWarning}`}>
          <label className="postpone-type needed" htmlFor="understanding">
            怎麼知道這個活動的？
          </label>
          <input
            type="text"
            name="understanding"
            id="understanding"
            placeholder="您的回答"
            value={understanding}
            onChange={onUnstandingChange}
          />
          <p className="message">不得留空!</p>
        </div>
        <div className="postpone-group">
          <label className="postpone-type" htmlFor="other">
            其他
          </label>
          <p className="postpone-advise">對活動的一些建議</p>
          <input
            type="text"
            name="other"
            id="other"
            placeholder="您的回答"
            value={other}
            onChange={onOtherChange}
          />
        </div>

        <button className="postpone-btn" type="submit">
          提交
        </button>
        <p className="mt-21">請勿透過表單送出您的密碼。</p>
      </form>
      <footer>© 2020 © Copyright. All rights Reserved.</footer>
    </div>
  );
}

export default App;
