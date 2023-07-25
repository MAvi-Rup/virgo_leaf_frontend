import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,UilApps,
    UilSignOutAlt,
    UilUserNurse,UilClipboardNotes,UilCreditCard,UilUserPlus,UilFileAlt
  } from "@iconscout/react-unicons";
export const cardsDataFT = [
    {
      title: "Farmers",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      
      png: UilUserNurse,
      series: [
        {
          name: "Farmers",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      value:[31, 40, 28, 51, 42, 109, 100].reduce((a, b) => a + b, 0).toLocaleString(),
    },
    {
      title: "TP",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      
      png: UilClipboardNotes,
      series: [
        {
          name: "TP",
          data: [10, 15, 5, 20,8, 5, 7],
        },
      ],
      value: [10, 15, 5, 20,8, 5, 7].reduce((a, b) => a + b, 0).toLocaleString(),
    },
    {
      title: "Loan Sanction",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      
      png: UilCreditCard,
      series: [
        {
          name: "Loan Sanction",
          data: [10000, 2500, 1000, 7000, 1200, 1550, 2000],
        },
      ],
      value: `$ ${[10000, 2500, 1000, 7000, 1200, 1550, 2000].reduce((a, b) => a + b, 0).toLocaleString()}`
    },
  ];