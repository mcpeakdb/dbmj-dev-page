import FakeWindowComponent from "../components/widgets/FakeWindows/FakeWindow.vue";
import FakeWindowDocs from "./docs/FakeWindow.docs.mdx";

export default {
  title: "Components/Widgets/FakeWindows/FakeWindow",
  component: FakeWindowComponent,
  parameters: {
    docs: {
      page: FakeWindowDocs,
    },
  },
};

const Template = (args, { updateArgs }) => ({
  components: { FakeWindowComponent },
  setup() {
    return {
      args,
    };
  },
  template:
    "<fake-window-component v-bind='args' @close='close' @minimize='minimize'/>",
  methods: {
    close() {
      args.program.open = false;
      updateArgs({ ...args });
    },
    minimize() {
      args.program.minimized = true;
      args.program.active = false;
      updateArgs({ ...args });
    },
  },
});

export const Png = Template.bind({});
Png.args = {
  program: {
    id: 0,
    name: "Dancing Baby",
    data: `https://upload.wikimedia.org/wikipedia/en/c/ce/DancingBaby.jpg`,
    type: "jpg",
    open: true,
    minimized: false,
    active: true,
  },
};

export const Html = Template.bind({});
Html.args = {
  program: {
    id: 1,
    name: "https://www.google.com",
    data: `https://www.google.com/search?igu=1 `,
    type: "html",
    open: true,
    minimized: false,
    active: true,
  },
};

export const Txt = Template.bind({});
Txt.args = {
  program: {
    id: 2,
    name: "helloworld.txt",
    data: `Hello World`,
    type: "txt",
    open: true,
    minimized: false,
    active: true,
  },
};
