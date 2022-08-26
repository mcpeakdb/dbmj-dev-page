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

const Template = (args) => ({
  components: { FakeDesktopIconComponent },
  setup() {
    return {
      args,
    };
  },
  template: "<fake-desktop-icon-component v-bind='args' />",
});

export const FakeDesktopIcon = Template.bind({});
FakeDesktopIcon.args = {
  program: {
    title: "file.png",
    type: "png",
  },
};
