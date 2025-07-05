export const selectedPurposeToEnum = (purpose: string): string => {
    switch (purpose) {
      case "단체 모임":
        return "MEETING";
      case "요리 연습":
        return "COOKING";
      case "바리스타 실습":
        return "BARISTA";
      case "홈파티":
        return "FLEA_MARKET";
      default:
        return "ETC";
    }
  };