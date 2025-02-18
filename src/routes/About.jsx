import React from "react";

const About = () => {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-[calc(100%-2rem)] lg:w-[calc(100%-5rem)] h-fit m-auto flex flex-col gap-5 pt-12 max-w-[60rem]">
        <div className="w-full h-42 md:h-[15rem] bg-white rounded-lg drop-shadow-lg relative overflow-hidden border-2 border-black">
          <img
            src="/assets/images/about/about_img.jpg"
            alt=""
            className="object-cover md:absolute md:top-[-14rem]"
          />
        </div>
        <h1 className="font-bold text-3xl">關於網站</h1>
        <div className="flex gap-4">
          <p className="text-md">
            隨著 108
            課綱的實施，服務學習成為學生學習歷程中的重要一環。然而，目前多數的服務學習機會仍由學校與合作單位進行媒合，學生的選擇範圍較為有限。若學生希望自行尋找與學校無合作的機構參與志工服務，往往需要花費大量時間在網路上搜尋適合的機構與職位，且資訊分散，導致尋找過程較為困難。
            <br />
            <br />
            <b>「服務學習整合平台」</b>
            正是為了解決這個問題而誕生。我們的目標是打造一個資源豐富、資訊透明的服務學習平台，讓學生能夠更輕鬆地找到符合自身興趣與需求的志工機會。我們整合來自各類機構、組織與社福單位的志工資訊，讓學生能夠快速篩選、比對，並直接申請參與，提升服務學習的便利性。
            <br />
            <br />
            透過本平台，學生可以依據自己的興趣、未來職涯規劃，或是希望培養的能力，找到適合的服務機會。我們不僅提供詳細的志工需求說明，還有機構評價與過往志工的心得分享，幫助學生更全面地了解各項服務機會。此外，我們也鼓勵機構與組織主動發布招募資訊，擴展服務的觸及面，讓更多有心投入志工服務的人找到合適的機會。
            <br />
            <br />
            我們相信，服務學習不僅是學習歷程的一部分，更是培養社會責任感與實踐能力的重要途徑。透過「服務學習整合平台」，我們希望讓每一位學生都能更輕鬆地找到理想的志工機會，累積寶貴的經驗，並在服務的過程中學習與成長。
            無論你是想要嘗試新的領域、累積志工時數，還是希望透過服務回饋社會，我們的平台都能幫助你找到最適合的機會。現在就加入我們，一起探索更多可能性，讓服務學習成為你人生旅程中重要的一環！
          </p>
          <div className="hidden md:block md:h-[20rem] md:w-[80rem] rounded-lg relative overflow-hidden shadow-lg border-2 border-black">
            <img
              src="/assets/images/about/about_plant.jpg"
              alt=""
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
