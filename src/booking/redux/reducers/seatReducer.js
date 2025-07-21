import data from "../../data.json";

const initialState = {
  danhSachGhe: data,
  gheDangChon: [],
};

const seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHON_GHE": {
      const gheDaTonTai = state.gheDangChon.find(
        (ghe) => ghe.soGhe === action.payload.soGhe
      );
      if (gheDaTonTai) return state;
      return {
        ...state,
        gheDangChon: [...state.gheDangChon, action.payload],
      };
    }
    case "HUY_GHE": {
      return {
        ...state,
        gheDangChon: state.gheDangChon.filter(
          (ghe) => ghe.soGhe !== action.payload.soGhe
        ),
      };
    }
    case "RESET_GHE": {
      const resetList = action.payload;
      const newDanhSachGhe = state.danhSachGhe.map((hang) => ({
        ...hang,
        danhSachGhe: hang.danhSachGhe.map((ghe) =>
          resetList.includes(ghe.soGhe) ? { ...ghe, daDat: false } : ghe
        ),
      }));
      return { ...state, danhSachGhe: newDanhSachGhe };
    }
    case "DAT_VE": {
      const newDanhSachGhe = state.danhSachGhe.map((hang) => {
        return {
          ...hang,
          danhSachGhe: hang.danhSachGhe.map((ghe) => {
            const isSelected = state.gheDangChon.find(
              (g) => g.soGhe === ghe.soGhe
            );
            if (isSelected) return { ...ghe, daDat: true };
            return ghe;
          }),
        };
      });
      return {
        danhSachGhe: newDanhSachGhe,
        gheDangChon: [],
      };
    }
    default:
      return state;
  }
};

export default seatReducer;
