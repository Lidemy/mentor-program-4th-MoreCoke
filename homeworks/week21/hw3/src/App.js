import React, { useState, useCallback, useMemo } from "react";

import { mailValid, phoneValid } from "./utils";
import Input from "./components/Input";
import Radio from "./components/Radio";
import Form from "./components/Form";
import Debug from "./components/Debug";
import Footer from "./components/Footer";
import GlobalStyle from "./globalStyle";

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

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onMailChange = useCallback((e) => {
    setMail(e.target.value);
  }, []);

  const onPhoneChange = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onActivityChange = useCallback((e) => {
    setActivity(e.target.value);
  }, []);

  const onUnstandingChange = useCallback((e) => {
    setUnderstanding(e.target.value);
  }, []);

  const onOtherChange = useCallback((e) => {
    setOther(e.target.value);
  }, []);

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
    [
      isConfirmed,
      name,
      mail,
      phone,
      activity,
      understanding,
      other,
      hasSubmited,
    ]
  );

  return (
    <>
      <GlobalStyle />
      <Debug isDetect={false}>
        <Form onSubmit={onSubmit}>
          <h1 className="postpone-title">新拖延運動報名表單</h1>
          <div className="postpone-description">
            活動日期：2020/12/10 ~ 2020/12/11
            <br />
            活動地點：台北市大安區新生南路二段1號
          </div>
          <span className="postpone-needed">必填</span>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="您的回答"
            value={name}
            onChange={onNameChange}
            label="暱稱"
            required
            status={nameWarning}
            message="請填入暱稱"
          />
          <Input
            type="email"
            name="mail"
            id="mail"
            placeholder="您的電子郵件"
            value={mail}
            onChange={onMailChange}
            label="電子郵件"
            required
            status={mailWarning}
            message="請填入正確郵件格式"
          />
          <Input
            type="number"
            name="phone"
            id="phone"
            placeholder="您的手機號碼"
            value={phone}
            onChange={onPhoneChange}
            label="手機號碼"
            required
            status={phoneWarning}
            message="請填入正確號碼格式(十碼)"
          />
          <Radio.Group
            required
            status={activityWarning}
            title="報名類型"
            message="請選擇報名類型"
          >
            <Radio
              name="activity"
              id="bed"
              value="躺在床上用想像力實作"
              onChange={onActivityChange}
              label="躺在床上用想像力實作"
            />
            <Radio
              name="activity"
              id="ground"
              value="趴在地上滑手機找現成的"
              onChange={onActivityChange}
              label="趴在地上滑手機找現成的"
            />
          </Radio.Group>
          <Input
            type="text"
            name="understanding"
            id="understanding"
            placeholder="您的回答"
            value={understanding}
            onChange={onUnstandingChange}
            label="怎麼知道這個活動的？"
            required
            status={understandingWarning}
            message="不得留空!"
          />
          <Input
            type="text"
            name="other"
            id="other"
            placeholder="您的回答"
            value={other}
            onChange={onOtherChange}
            label="其他"
            subtitle="對活動的一些建議"
          />

          <button className="postpone-btn" type="submit">
            提交
          </button>
          <p className="mt-21">請勿透過表單送出您的密碼。</p>
        </Form>
        <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
      </Debug>
    </>
  );
}

export default App;
