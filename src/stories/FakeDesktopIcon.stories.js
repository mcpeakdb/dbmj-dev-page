import FakeDesktopIconComponent from "../components/widgets/FakeWindows/FakeDesktopIcon.vue";
import FakeDesktopIconDocs from "./docs/FakeDesktopIcon.docs.mdx";

export default {
  title: "Components/Widgets/FakeWindows/FakeDesktopIcon",
  component: FakeDesktopIconComponent,
  parameters: {
    docs: {
      page: FakeDesktopIconDocs,
    },
  },
};

const Template = (args, { updateArgs }) => ({
  components: { FakeDesktopIconComponent },
  setup() {
    return {
      args,
    };
  },
  template: "<fake-desktop-icon-component v-bind='args' @open='open'/>",
  methods: {
    open() {
      args.program.open = true;
      args.program.active = true;
      updateArgs({ ...args });
    },
  },
});

export const Png = Template.bind({});
Png.args = {
  program: {
    id: 0,
    title: "My Image",
    type: "png",
    open: false,
    active: false,
  },
};

export const Html = Template.bind({});
Html.args = {
  program: {
    id: 1,
    title: "My Website",
    type: "com",
    open: false,
    active: false,
  },
};

export const Txt = Template.bind({});
Txt.args = {
  program: {
    id: 2,
    title: "My Text File",
    type: "txt",
    open: false,
    active: false,
  },
};
