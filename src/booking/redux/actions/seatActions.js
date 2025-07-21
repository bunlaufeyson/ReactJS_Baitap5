export const chonGhe = (ghe) => ({
  type: "CHON_GHE",
  payload: ghe,
});

export const huyGhe = (ghe) => ({
  type: "HUY_GHE",
  payload: ghe,
});

export const datVe = () => ({
  type: "DAT_VE",
});
export const resetGhe = (gheList) => ({
  type: "RESET_GHE",
  payload: gheList,
});
