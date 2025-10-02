import type { HostSpaceInfo } from "../types/HostSpaceInfo";

export const selectedPurposeToEnum = (
  purpose: string
): HostSpaceInfo["useCategory"] => {
  switch (purpose) {
    case "모임":
      return "MEETING";
    case "요리":
      return "COOKING";
    case "바리스타":
      return "BARISTA";
    case "플리마켓":
      return "FLEA_MARKET";
    case "촬영":
      return "FILMING";
    case "기타":
      return "ETC";
    default:
      return "ETC";
  }
};
