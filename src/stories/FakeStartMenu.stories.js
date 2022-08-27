import FakeStartMenuComponent from "../components/widgets/FakeWindows/FakeStartMenu.vue";
import FakeStartMenuDocs from "./docs/FakeStartMenu.docs.mdx";

export default {
  title: "Components/Widgets/Fake Windows/Fake Start Menu",
  component: FakeStartMenuComponent,
  parameters: {
    docs: {
      page: FakeStartMenuDocs,
    },
  },
};

const Template = (args, { updateArgs }) => ({
  components: { FakeStartMenuComponent },
  setup() {
    return {
      args,
    };
  },
  template:
    "<div style='height:200px'><div style='height:164px'></div><fake-start-menu-component v-bind='args' @changeActive='changeActive'/></div>",
  methods: {
    changeActive(id) {
      args.programs[id].minimized = !args.programs[id].minimized;
      args.programs[id].active = !args.programs[id].active;
      updateArgs({ ...args });
    },
  },
});

export const FakeStartMenu = Template.bind({});
FakeStartMenu.args = {
  programs: {
    0: {
      id: 0,
      name: "my file",
      open: true,
      active: true,
      minimized: false,
      type: "png",
    },
    1: {
      id: 1,
      name: "another file",
      open: true,
      active: false,
      minimized: true,
      type: "html",
    },
    2: {
      id: 2,
      name: "last file",
      open: false,
      active: false,
      minimized: false,
      type: "txt",
    },
  },
};
