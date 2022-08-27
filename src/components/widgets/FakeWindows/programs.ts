import { FakeProgramData } from "./../../../types/index";

export const programData: FakeProgramData = {
  0: {
    id: 0,
    name: "aboutme.txt",
    title: "About Me",
    open: false,
    minimized: false,
    maximized: false,
    data: `<p><h1>Hello!</h1>My name is Danny McPeak Jr</p>
        <p>I am a Sr. Full Stack Developer at Keeping Current Matters <i>(a link to our website is on the 'desktop')</i></p>`,
    type: "txt",
    active: false,
  },
  1: {
    id: 1,
    name: "dancingbaby.jpg",
    title: "Dancing Baby",
    open: false,
    minimized: false,
    maximized: false,
    data: `https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg`,
    type: "jpg",
    active: false,
  },
  2: {
    id: 2,
    name: "https://www.keepingcurrentmatters.com",
    title: "Keeping Current Matters",
    open: false,
    minimized: false,
    maximized: false,
    data: `https://www.keepingcurrentmatters.com`,
    type: "html",
    active: false,
  },
};
