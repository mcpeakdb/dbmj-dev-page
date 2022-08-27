export function programTypeImage(type: string): string {
  if (["png", "jpg", "jpeg"].includes(type)) {
    return "jpg";
  } else if (["com", "html"].includes(type)) {
    return "html";
  } else {
    return type;
  }
}

export function getImgUrl(pic: string): string {
  return require("../../../assets/icons/" + pic + "_95.png");
}
