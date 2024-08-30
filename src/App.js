import React, { useState } from "react";
import ReactLoading from "react-loading";
import party from "party-js";
import "./App.css";

function padToFour(number) {
  if (number <= 999) {
    number = ("00" + number).slice(-3);
  }
  return number;
}

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [name, setNameValue] = useState("");
  const [phone, setPhoneValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [birthday, setBDValue] = useState("2000-01-01");
  const [identityNo, setIdentityNoValue] = useState("");
  const [gender, setGenderValue] = useState(true);
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (!isChecked) alert("請同意上述條款和條件");
    else setPage(2);
  };

  const handleButtonClick2 = async (event) => {
    event.preventDefault();

    if (!(name && phone && email && birthday)) {
      alert("請填寫所有欄位");
      return;
    }
    try {
      const url = "https://metadata.moaifamily.io/client"; // Replace with your actual URL
      const dataToSend = {
        name,
        phone,
        email,
        birthday,
        idNo: identityNo,
        gender,
      };
      const options = {
        method: "POST", // Specify method
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
          // Include any other headers required by the API
        },
        body: JSON.stringify(dataToSend), // Convert JS object to JSON string
      };

      setLoading(true);
      const response = await fetch(url, options);
      setLoading(false);
      party.confetti(document.body, { count: party.variation.range(80, 90) });
      if (!response.ok) {
        alert("錯誤發生請聯繫工作人員");
      }
      const data = await response.json();

      console.log(data);
      setId(padToFour(data.id));
      setNumber(padToFour(data.number));
      setPage(3);
    } catch (error) {
      console.error("Posting data failed:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {page === 1 && (
          <div>
            <p>免責聲明與同意書</p>
            <div className="neux-editor">
              <p className="editor-element">
                平台名稱
                心動收容(下稱「本平台」)致力於為用戶提供高質量男女媒合服務。為確保服務的質量和用戶的知情權，特此提供以下免責聲明及同意書。請仔細閱讀並確認同意以下條款：
              </p>
              <p className="editor-element">&nbsp;</p>
              <p className="editor-element">一、資料收集與使用</p>
              <p className="editor-element">
                1.個人資料的收集，本平台將您提供的個人資料，包括但不限於姓名、年齡、
                性別、聯繫方式、興趣愛好等。
              </p>
              <p className="editor-element">
                2.資料的使用，您的個人資料僅用於本平台內部的男女媒合服務，不會向第三方披露，除非經您明確同意或法律要求
              </p>
              <p className="editor-element">
                3.您的資料將提供給其他來本平台消費的客戶，以便他們有機會抽取您的資料進行配對
              </p>
              <br />
              <p className="editor-element">二、免責條款</p>

              <p className="editor-element">
                1.資料安全，本平台將盡力保護您的個人資料安全，但不對因不可抗力或第三方惡意行為導致的資料洩漏負責
              </p>
              <p className="editor-element">
                2.配對結果，本平台不對男女配對的結果及後續發展負任何責任。配對成功與否以及後續關西的發展完全取決於雙方的互動和意願
              </p>
              <p className="editor-element">
                3.客戶責任，您需對自己提供的資料的真實性和完整性負責，並同意對因提供虛假或不完整資料可能引發的後果承擔責任
              </p>
              <p className="editor-element">
                <br />
              </p>
              <p className="editor-element">三、同意證明</p>
              <p className="editor-element">
                於下方點選勾選，並點選同意按鈕及代表您確認已閱讀並理解上述免責聲明，並同意本平台按上述條款使用您的個人資料
              </p>
              <p className="editor-element"></p>
              <div>
                <form>
                  <div>
                    <label>
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        required
                      />
                      我同意上述條款和條件
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-sky-500 hover:bg-sky-70 py-1 px-3 rounded-full"
                      type="submit"
                      onClick={handleButtonClick}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="py-5">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide mb-2">姓名</label>
                  <input
                    className="text-black appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setNameValue(event.target.value);
                    }}
                    required
                  />
                  {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> */}
                </div>
                <div className="w-full  px-3">
                  <label className="block tracking-wid mb-2">電話</label>
                  <input
                    className="text-black appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    value={phone}
                    onChange={(event) => {
                      setPhoneValue(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block tracking-wide mb-2">Email</label>
                  <input
                    className="text-black appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={email}
                    onChange={(event) => {
                      setEmailValue(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block tracking-wid mb-2">生日</label>
                  <input
                    className="text-black appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="date"
                    onChange={(event) => {
                      setBDValue(event.target.value);
                    }}
                    value={birthday}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block tracking-wid mb-2">身分證</label>
                  <input
                    className="text-black appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    onChange={(event) => {
                      setIdentityNoValue(event.target.value);
                    }}
                    value={identityNo}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block tracking-wid mb-2">性別</label>
                  <label>
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={gender}
                      onChange={() => {
                        setGenderValue(true);
                      }}
                    />
                    男
                  </label>
                  <label>
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={!gender}
                      onChange={() => {
                        setGenderValue(false);
                      }}
                    />
                    女
                  </label>
                </div>
              </div>
              <div>
                <button
                  className="bg-sky-500 hover:bg-sky-70 py-1 px-3 rounded-full"
                  type="submit"
                  onClick={handleButtonClick2}
                >
                  {!loading ? (
                    <p>送出</p>
                  ) : (
                    <ReactLoading type="spin" color="#FFFFFF" />
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {page === 3 && (
          <div>
            <div className="container">
              <img className="img-logo" src="/logo2.png" alt="logo" />
            </div>
            <div className="font-bold text-3xl">
              <p>您的編號為 {number}</p>
            </div>
            <div className="container">
              <img className="img-qrcode" src="/qrcode.png" alt="qrcode" />
            </div>
            <div className="font-bold text-3xl">
              <p>請掃名QR Code加入官方Line</p>
            </div>
          </div>
        )}
      </header>


    </div>
  );
}

export default App;
