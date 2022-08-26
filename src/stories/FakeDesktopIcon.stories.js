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

export const FakeDesktopIcon = Template.bind({});
FakeDesktopIcon.args = {
  program: {
    title: "file.png",
    type: "png",
    open: false,
    active: false,
  },
};
